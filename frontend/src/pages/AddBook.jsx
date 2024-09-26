import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
    });

    const change = (e) => {
        const {name, value} = e.target;
        setData({...Data, [name]: value})
    }

    const headers = {
        "id": localStorage.getItem("id"),
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }

    const submit = async (e) => {
        try {
            if(Data.url === "" || Data.title === "" || Data.author === "" || Data.price === "" || Data.desc === "" || Data.language === "") {
                alert("Please fill all the fields");
                return;
            } else {
                const response = await axios.post("https://bookhaven-swm2.onrender.com/api/v1/add-book", Data, {headers});
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: ""
                })
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <div className=' flex flex-col items-center md:px-[25px] gap-4'>
            <h1 className='text-3xl font-bold text-center'>Add Book</h1>
        <div className='bg-slate-300 w-full max-w-[700px] rounded p-8 flex flex-col justify-center'>
            <div className='p-4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="image">Image</label>
                        <input className="p-2" type="text" name="url" placeholder='url of image' id="image" value={Data.url} onChange={change}required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="title">Title of Book</label>
                        <input className="p-2" type="text" name="title" placeholder='title of book' id="title" value={Data.title} onChange={change}required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="author">Author of Book</label>
                        <input className="p-2" type="text" name="author" placeholder='author of book' id="author" value={Data.author} onChange={change}required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="language">Language</label>
                        <input className="p-2" type="text" name="language" placeholder='language' id="language" value={Data.language} onChange={change}required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="price">Price</label>
                        <input className="p-2" type="number" name="price" placeholder='price' id="price" value={Data.price} onChange={change}required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="desc">Description of Book</label>
                        <textarea className="p-2" type="text" name="desc" placeholder='description of book' id="desc" value={Data.desc} onChange={change}required/>
                    </div>
                    
                    <div className='flex justify-center mt-4'>
                        <button className='w-full bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-500 transition-all duration-300' onClick={submit}>Add Book</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddBook;
