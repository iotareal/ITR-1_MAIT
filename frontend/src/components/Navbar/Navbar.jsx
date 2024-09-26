import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

    const links = [
        { name: "Home", link: "/" },
        { name: "All Books", link: "all-books" },
        { name: "Cart", link: "/cart" },
        { name: "Profile", link: "/profile" }
    ]

    const isLoggedIn = useSelector((state) => {
        return state.auth.isLoggedIn;
    });

    const role = useSelector((state) => {
        return state.auth.role;
    });

    if (isLoggedIn === false) {
        links.splice(2, 2);
    }

    if(isLoggedIn === true && role === "admin") {
        links.splice(2,1);
    }

    const [hamMenu, setHamMenu] = useState("hidden");
    return <>
        <nav className="bg-gray-300 p-4 flex justify-between items-center relative z-40">
            <Link to={"/"} className="text-3xl font-bold flex gap-2">
                <img className="w-10" src="https://cdn-icons-png.flaticon.com/512/171/171322.png" draggable="false" alt="" />
                BookHaven
            </Link>

            <div className="nav-links-custom flex items-center gap-4 font-semibold">
                <div className="hidden md:flex">
                    {links.map((items, i) => (
                        <Link to={items.link} key={i} className="p-2 hover:text-gray-600 transition-all duration-300 gap-4">{items.name}{" "}</Link>
                    ))}
                </div>
                {isLoggedIn === false ? (
                    <>
                        <div className="hidden md:flex gap-4">
                            <Link to={"/signup"} className="px-2 py-1 border-2 border-slate-600 rounded hover:bg-slate-600 hover:text-white transition-all duration-200">Sign Up</Link>
                            <Link to={"/login"} className="px-2 py-1 border-2 border-slate-600 rounded hover:bg-slate-600 hover:text-white transition-all duration-200">Login</Link>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                <button className="md:hidden">
                    <RxHamburgerMenu className="text-3xl hover:text-slate-600" onClick={() => {
                        if (hamMenu === "hidden") {
                            setHamMenu("block");
                        } else {
                            setHamMenu("hidden");
                        }
                    }} />
                </button>

            </div>
        </nav>
        <div className={`${hamMenu} bg-white h-screen absolute top-0 left-0 w-full z-30 flex flex-col items-center justify-center gap-4 `}>
            {links.map((items, i) => (
                <Link to={items.link} key={i} className={`${hamMenu} p-2 hover:text-gray-600 transition-all duration-300 gap-4`}>{items.name}{" "}</Link>
            ))}

            {isLoggedIn === false ? (
                <>
                    <Link to={"/signup"} className={`${hamMenu} px-2 py-1 border-2 border-slate-600 rounded hover:bg-slate-600 hover:text-white transition-all duration-200`}>Sign Up</Link>
                    <Link to={"/login"} className={`${hamMenu} px-2 py-1 border-2 border-slate-600 rounded hover:bg-slate-600 hover:text-white transition-all duration-20`}>Login</Link>
                </>
            ) : (
                <></>
            )}

        </div>
    </>

};
export default Navbar;
