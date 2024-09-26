import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = ({data}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);
    return (
        <div className="h-[70vh] bg-slate-300 shadow-lg p-4 rounded flex flex-col items-center justify-evenly">
            <div className="flex flex-col gap-3 items-center">
            <img className="w-[100px]" src={data.avatar}></img>
            <p className="text-3xl font-semibold">{data.username}</p>
            <p>{data.email}</p>
            </div>
            {role === "admin" && (
                <>
                <Link to="/profile/add-book" className="hover:text-slate-700 transition-all duration-300">
                    Add Book
                </Link>
                <Link to="/profile" className="hover:text-slate-700 transition-all duration-300">
                    All Orders
                </Link>
                </>
            )}
            <button className=" px-2 py-1 border-2 border-slate-600 rounded hover:bg-slate-600 hover:text-white transition-all duration-200" onClick={() => {
                dispatch(authActions.logout());
                dispatch(authActions.changeRole("user"));
                localStorage.clear();
                navigate("/");
            }}>Log Out</button>
        </div>
    );
};

export default Sidebar;
