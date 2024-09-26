import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookhaven-swm2.onrender.com/api/v1/get-books");
            console.log(response.data.data);
            setData(response.data.data);
        }
        fetch();
    }, [])

    return (
        <div className="flex flex-col items-center mt-4 min-h-screen">
            <h1 className="text-3xl font-bold">All books</h1>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {Data && Data.map((items, i) => <BookCard key={i} data={items} />)}
            </div>
        </div>
    )
}

export default AllBooks
