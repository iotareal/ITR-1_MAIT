import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authActions } from '../store/auth'
import { useDispatch } from 'react-redux'
const Login = () => {
    const[Values, setValues] = useState({username: "", password: ""})

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const change = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setValues({...Values, [name]: value})
    }

    const submit = async (e) => {
        try {
            if(Values.username === "" || Values.password === "") {
                alert("Please fill all the fields");
                return;
            } else {
                const response = await axios.post("https://bookhaven-swm2.onrender.com/api/v1/sign-in", Values);
                dispatch(authActions.login());
                dispatch(authActions.changeRole(response.data.role));
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                navigate("/profile");
                
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }
  return <div>
    <div className='flex justify-center px-[25px] py-[150px]'>
        <div className='bg-slate-300 w-full max-w-[500px] rounded p-8 flex flex-col justify-center'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <div className='p-4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="username">Username</label>
                        <input className="p-2" type="text" name="username" placeholder='username' id="username" onChange={change} value={Values.username} required/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input className="p-2" type="password" name="password" placeholder='password' id="password" onChange={change} value={Values.password} required/>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button className='w-full bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-500 transition-all duration-300' onClick={submit}>Login</button>
                    </div>
                    <div className='flex justify-center'>
                        <p>Don't have an account? &nbsp;
                        </p>
                        <Link to="/signup">
                            <p className='font-semibold hover:text-gray-700'>Signup</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
}

export default Login
