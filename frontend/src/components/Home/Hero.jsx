import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-12 gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-600 text-center md:text-left">Find your favourite books.</h1>

                <p className="text-xl text-slate-500 md:text-left text-center">Discover the world of literature, from timeless classics to modern bestsellers, and explore the vast collection of books available at your fingertips.</p>

                <Link to="/all-books" className=" text-xl md:text-2xl bg-slate-600 text-white px-10 py-3 rounded-full w-fit hover:bg-slate-300 hover:text-slate-600 hover: border-2 border-slate-600 transition-all duration-300" >Explore</Link>
            </div>
            <div className="w-full md:w-1/2 md:py-14">
                <img className="w-full" src="https://cdn.pixabay.com/photo/2018/07/01/20/01/music-3510326_1280.jpg" alt="hero"/>
            </div>
        </div>
    );
};

export default Hero;
