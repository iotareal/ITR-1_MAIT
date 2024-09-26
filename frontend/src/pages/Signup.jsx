import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
    const[Values, setValues] = useState({username: "", email: "", password: "", address: ""})

    const navigate = useNavigate();
    const change = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setValues({...Values, [name]: value})
    }

    const submit = async (e) => {
        try {
            if(Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
                alert("Please fill all the fields");
                return;
            } else {
                const response = await axios.post("https://bookhaven-swm2.onrender.com/api/v1/sign-up", Values);
                console.log(response.data);
                alert(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }


    return <div className=' flex justify-center px-[25px] py-[100px]'>
        <div className='bg-slate-300 w-full max-w-[500px] rounded p-8 flex flex-col justify-center'>
            <h1 className='text-3xl font-bold text-center'>Signup</h1>
            <div className='p-4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name">Username</label>
                        <input className="p-2" type="text" name="username" placeholder='username' id="name" value={Values.username} onChange={change} required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input className="p-2" type="email" name="email" placeholder='xyz@example.com' id="email" value={Values.email} onChange={change} required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input className="p-2" type="password" name="password" placeholder='password' id="password" value={Values.password} onChange={change} required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="address">Address</label>
                        <textarea className="p-2" name="address" id="address" placeholder='address' rows="4" value={Values.address} onChange={change} required/>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button className='w-full bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-500 transition-all duration-300' onClick={submit}>Signup</button>
                    </div>
                    <div className='flex justify-center'>
                        <p>Already have an account? &nbsp;
                        </p>
                        <Link to="/login">
                            <p className='font-semibold hover:text-gray-700'>Login</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Signup
