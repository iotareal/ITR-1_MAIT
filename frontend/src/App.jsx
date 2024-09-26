import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import AllOrders from "./components/Profile/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => {
    return state.auth.role;
  })
  useEffect(()=> {
    if (
      localStorage.getItem("id") && localStorage.getItem("role") && localStorage.getItem("token")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return <div className="">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (<Route index element={<UserOrderHistory />} /> ) : (<Route path="/profile" element={<AllOrders />} />)}
          {role === "admin" && (<Route path="/profile/add-book" element={<AddBook />} />)}
        </Route>
        <Route path="/update-book/:id" element={<UpdateBook/>} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
  </div>
};

export default App;