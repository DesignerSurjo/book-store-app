import express from 'express'
import { placeOrder, placeOrderStripe, allOrders,userOrders,updateStatus, verifyStripe, deleteOrder  } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

//Admin feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.delete('/delete-order',adminAuth, deleteOrder);
//Payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

//User feature
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;