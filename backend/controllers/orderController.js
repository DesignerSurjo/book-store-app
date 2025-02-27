import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from 'stripe'

const currency = 'bdt'
const deliverCharge = 40

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;


        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            time: new Date().toLocaleTimeString(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()


        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address, discount } = req.body;
        const { origin } = req.headers;

        // Ensure the values are at least 1
        const minAmount = Math.max(amount, 1); // Ensure total amount is at least 1
        const minDiscount = discount > 0 ? Math.max(discount, 0) : 1; // Set discount to 1 if no discount
        const minDeliverCharge = Math.max(deliverCharge, 1); // Ensure delivery charge is at least 1


        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "STRIPE",
            payment: false,
            date: Date.now(),
            time: new Date().toLocaleTimeString(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.max(Math.round(item.price * 100, 1)) // Ensure price is at least 1 cent
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: Math.max(minDeliverCharge * 100, 1) // Ensure delivery charge is at least 1 cent
            },
            quantity: 1
        });

        // If a discount exists, apply it
        const coupon = discount > 0 ? await stripe.coupons.create({
            amount_off: Math.max(Math.round(minDiscount * 100, 1)), // Ensure discount is at least 1 cent
            currency: currency,
        }) : null;

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
            discounts: coupon ? [{ coupon: coupon.id }] : [], // Apply coupon only if it's created
        });
        
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const verifyStripe = async (req, res) => {
    const { userId, orderId, success } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;  // Receive the order ID to be deleted

        // Find and delete the order by its ID
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, deleteOrder }