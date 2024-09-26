import { useEffect, useState } from "react"
import axios from "axios"
import { FaExternalLinkAlt } from "react-icons/fa";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
    const [AllOrderHistory, setAllOrderHistory] = useState();
    const [UserDiv, setUserDiv] = useState("hidden");
    const [UserDivData, setUserDivData] = useState();
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookhaven-swm2.onrender.com/api/v1/get-all-order-history", {headers});
            console.log(response.data.data);
            setAllOrderHistory(response.data.data);
        }
        fetch()
    }, [])


    return (
        <>
            {AllOrderHistory && AllOrderHistory.length === 0 && (
                <div className="flex flex-col items-center mt-4 min-h-screen">
                    <h1 className="text-3xl font-bold">No Orders Found</h1>
                </div>
            )}
            {AllOrderHistory && AllOrderHistory.length > 0 && (
                <div className="flex flex-col items-center mt-4">
                    <h1 className="text-3xl font-bold">All Orders</h1>
                    <div className="md:p-8 w-full flex flex-col gap-3">
                        <div className="p-2 bg-slate-300 rounded-2xl grid grid-cols-5 gap-2 items-center justify-evenly font-bold">
                            <p className='justify-self-center'>Serial No.</p>
                            <p className='justify-self-center'>Book Title</p>
                            <p className='justify-self-center'>Price</p>
                            <p className='justify-self-center'>Status</p>
                            <p className='justify-self-center'>User</p>
                        </div>
                        {AllOrderHistory && AllOrderHistory.map((item, i) => (
                            <div className="p-2 bg-slate-300 rounded-2xl grid grid-cols-5 gap-2 items-center justify-evenly font-semibold" key={i}>
                                <p className='justify-self-center'>{i + 1}</p>
                                <p className='justify-self-center'>{item.book === null ? "N/A" : item.book.title}</p>
                                <p className='justify-self-center'>{item.book === null ? "N/A" : "₹ " +item.book.price}</p>
                                <p className='justify-self-center'>{item.status}</p>
                                <button className="justify-self-center" onClick={() => {
                                    setUserDiv("fixed");
                                    setUserDivData(item.user);
                                }}><FaExternalLinkAlt /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {UserDivData && (
                <SeeUserData
                    UserDiv={UserDiv}
                    UserDivData={UserDivData}
                    setUserDiv={setUserDiv}
                />
            )}
        </>
    );
}

export default AllOrders
