import { useEffect, useState } from "react";
// import { products } from "../assets/assets"
import { createContext } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '৳';
    const delivery_fee = 40;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [token, setToken] = useState('')
    const [products, setProducts] = useState([]);


    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId]) {

                cartData[itemId] += 1;

            } else {
                cartData[itemId] = 1;
            }

        }
        else {
            cartData[itemId] = {};
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(response.data.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const productId in cartItems) {
            try {
                if (cartItems[productId] > 0) {
                    totalCount += cartItems[productId];
                }
            } catch (error) {
                console.error("Error calculating cart count:", error);
            }
        }

        return totalCount;
    };
    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])



    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(response.data.message)
            }
        }
    }

    const getUserCart = async (token) => {
        try {
        const response =  await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
          if (response.data.success) {
            setCartItems(response.data.cartData);
          }
        } catch (error) {
          console.log(error);
          toast.error(response.data.message)
        }
      }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    }, [])



    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider