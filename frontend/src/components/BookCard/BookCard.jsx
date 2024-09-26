import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({data}) => {
    console.log(data);
    
    return (
        <>
        <Link to={`/view-book-details/${data._id}`}>
            <div className="bg-slate-300 rounded p-4 flex flex-col gap-4 h-full">
                <div className="bg-slate-400 rounded flex items-center justify-center">
                    <img src={data.url} alt="/" className="h-[25vh]"/>
                </div>
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <p className="font-semibold">by {data.author}</p>
                <p className="font-semibold">₹ {data.price}</p>
            </div>
        </Link>
        </>
        
    )
}

export default BookCard