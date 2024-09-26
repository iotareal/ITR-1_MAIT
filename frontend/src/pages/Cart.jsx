import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [Cart, setCart] = useState();
    const [Total, setTotal] = useState(0);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookhaven-swm2.onrender.com/api/v1/get-cart", { headers });
            console.log(response);
            setCart(response.data.data);
        }
        fetch();
    }, [Cart])

    const placeOrder = async () => {
        try {
            const response = await axios.post("https://bookhaven-swm2.onrender.com/api/v1/place-order", {order: Cart}, { headers });
            alert(response.data.message);
            navigate("/profile");

        } catch(error) {
            console.log(error);
        }
    }
    const deleteItem = async (bookid) => {
        const response = await axios.put(`https://bookhaven-swm2.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, { headers });
        alert(response.data.message);
        
    }

    useEffect(() => {
        if (Cart && Cart.length > 0) {
            let total = 0;
            Cart.map((items) => {
                total += items.price;
            })
            setTotal(total);
        }
    }, [Cart])

    return (
        <>
            {Cart && Cart.length === 0 && (
                <div className="h-screen">
                    <div className='h-[100%] flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-semibold'>Empty Cart</h1>
                    </div>
                </div>
            )}

            {Cart && Cart.length > 0 && (
                <div className="flex flex-col items-center mt-4 gap-4 p-4 min-h-screen">
                    <h1 className='text-3xl font-semibold'>Your cart</h1>
                    {Cart.map((items, i) => (

                        <div key={i} className="flex flex-col md:flex-row w-full bg-slate-300 rounded items-center md:justify-between p-4 gap-4">
                            <div className='flex'>
                                <img src={items.url} className="h-[10rem] rounded" alt="" />
                                <div className="flex flex-col justify-center ml-4">
                                    <h1 className="text-xl md:text-2xl font-semibold">{items.title}</h1>
                                    <p className="text-xl md:text-2xl">Price: ₹ {items.price}</p>
                                </div>
                            </div>
                            <button><MdDelete className="text-3xl cursor-pointer" onClick={() => deleteItem(items._id)} /></button>

                        </div>
                    ))}
                    <div className="flex items-center justify-between border-2 border-slate-600 rounded gap-4 p-5 bg-slate-200">
                        <p className='font-semibold text-2xl'>{Cart.length} books</p>
                        <p className='text-2xl font-semibold'>Total: ₹ {Total}</p>
                        <button className="text-2xl px-2 py-1 border-2 border-slate-600 rounded hover:bg-slate-600 hover:text-white transition-all duration-200" onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
            )}

        </>
    )
}


export default Cart
