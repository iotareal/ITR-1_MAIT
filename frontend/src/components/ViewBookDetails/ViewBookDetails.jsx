import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`https://bookhaven-swm2.onrender.com/api/v1/get-book-by-id/${id}`,);

            setData(response.data.data);
        }
        fetch();
    }, [])

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookId: id
    }

    const handleCart = async () => {
        const response = await axios.put("https://bookhaven-swm2.onrender.com/api/v1/add-to-cart/", {}, { headers });
        console.log(response.data);
        alert(response.data.message);
    }

    const deleteBook = async () => {
        const response = await axios.delete("https://bookhaven-swm2.onrender.com/api/v1/delete-book/", { headers });
        alert(response.data.message);
        navigate("/all-books");
    }
    return (
        <>
            {Data && (
                <div className="px-12 py-8 flex md:flex-row flex-col gap-4 min-h-screen">
                    <div className="bg-slate-300 rounded p-10 w-full md:w-1/2 flex justify-center items-center gap-5">
                        <img className="rounded" src={Data.url} alt="/"/>
                        {isLoggedIn === true && role === "user" && (
                            <button className="text-2xl md:text-3xl" onClick={handleCart}>
                                <FaShoppingCart />
                            </button>
                        )}

                        {isLoggedIn === true && role === "admin" && (
                            <div className="flex flex-col gap-5">
                                <Link to={`/update-book/${id}`} className="text-2xl md:text-3xl">
                                    <FaEdit />
                                </Link>
                                <button className="text-2xl md:text-3xl" onClick={deleteBook}>
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-4 w-full md:w-1/2 flex flex-col gap-4">
                        <h1 className="text-3xl md:text-4xl font-semibold">
                            {Data.title}
                        </h1>
                        <p className="text-2xl font-semibold">{Data.author}</p>
                        <p>{Data.desc}</p>
                        <p className="font-semibold">Language: {Data.language}</p>
                        <p className="font-semibold">Price: ₹ {Data.price}{" "}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewBookDetails
