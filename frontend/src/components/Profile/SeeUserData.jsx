import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const SeeUserData = ({UserDiv, UserDivData, setUserDiv}) => {
    return <div>
        <div className={`${UserDiv} top-0 left-0 h-screen w-full bg-slate-300 opacity-80`}>
            
        </div>{" "}

        <div className={`${UserDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">User Information</h1>
                    <button onClick={() => setUserDiv("hidden")}>
                        <IoMdCloseCircle className="text-2xl text-red-700" />
                    </button>
                </div>
                <div className="mt-2">
                    <label htmlFor="">
                        Username: {" "}
                        <span>{UserDivData.username}</span>
                    </label>
                </div>
                <div className="mt-4">
                    <label htmlFor="">
                        Email: <span>{UserDivData.email}</span>
                    </label>
                </div>
                <div className="mt-4">
                    <label htmlFor="">
                        Address: {" "}
                        <span>{UserDivData.address}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>;
};

export default SeeUserData;