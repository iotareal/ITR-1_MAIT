import React, { useEffect, useState } from 'react';
import axios from 'axios';
const UserOrderHistory = () => {
    const [OrderHistory, setOrderHistory] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookhaven-swm2.onrender.com/api/v1/get-order-history", { headers });
            console.log(response.data.data);
            setOrderHistory(response.data.data);
        }
        fetch();
    }, [])
    
    return (
        <>
            {OrderHistory && OrderHistory.length === 0 && (
                <div className="flex flex-col items-center mt-4 min-h-screen">
                    <h1 className="text-3xl font-bold">No Orders Found</h1>
                </div>
            )}
            {OrderHistory && OrderHistory.length > 0 && (
                <div className="flex flex-col items-center mt-4">
                    <h1 className="text-3xl font-bold">Your Order History</h1>
                    <div className="md:p-8 w-full flex flex-col gap-3">
                        <div className="p-2 bg-slate-300 rounded-2xl grid grid-cols-4 gap-2 items-center justify-evenly font-bold">
                            <p className='justify-self-center'>Serial No.</p>
                            <p className='justify-self-center'>Book Title</p>
                            <p className='justify-self-center'>Price</p>
                            <p className='justify-self-center'>Status</p>
                        </div>
                        {OrderHistory && OrderHistory.map((item, i) => (
                            <div className="p-2 bg-slate-300 rounded-2xl grid grid-cols-4 gap-2 items-center justify-evenly font-semibold" key={i}>
                                <p className='justify-self-center'>{i + 1}</p>
                                <p className='justify-self-center'>{item.book === null ? "N/A" : item.book.title}</p>
                                <p className='justify-self-center'>{item.book === null ? "N/A" : "₹ " + item.book.price}</p>
                                <p className='justify-self-center'>{item.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default UserOrderHistory;
