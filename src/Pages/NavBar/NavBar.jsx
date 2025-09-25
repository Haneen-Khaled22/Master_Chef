import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/mylogo2.png";
import cart from "../../assets/shopping-bag.png"
import profile from "../../assets/user.png"
import userphoto from "../../assets/usephoto.png"
import { useCart } from "../../Features/Context/CartContext/CartContext";
import { useAuth } from "../../Features/Context/AuthContext/AuthContext";


export default function NavBar() {
  let navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {user,signOut} = useAuth();

  const {uniqueItems,cartItems} = useCart();

  const dropdownRef = useRef(null);

  function navigateToReservation() {
    navigate("reserve");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className={` relative w-full text-sm font-bold h-[80px] px-12`}>
      <div className="flex justify-between items-center h-full relative">
        {/* logo */}
        <img
          className={`h-38 w-38 object-cover mt-8 ml-5`}
          src={logo}
          alt="Logo"
        />

        {/* Burger button small screens */}
        <button
          className="md:hidden text-xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Links */}
        
        <ul
          className={`flex-col md:flex md:flex-row gap-8  text-black items-center text-md absolute rounded-lg md:static top-[60px] right-0 w-[200px] z-10 md:w-auto bg-white md:bg-transparent transition-all duration-300 ${
            isOpen ? "flex mt-4 p-4" : "hidden"
          }`}
        >
          <li className="md:w-auto w-full text-center py-2 cursor-pointer  rounded-md md:hover:bg-transparent hover:bg-[rgba(211,159,56,1)] md:hover:text-black hover:text-white">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          </li>
          <li className="md:w-auto w-full text-center py-2 cursor-pointer rounded-md md:hover:bg-transparent hover:bg-[rgba(211,159,56,1)] md:hover:text-black hover:text-white">
            <NavLink to="/menu" onClick={() => setIsOpen(false)}>Menu</NavLink>
          </li>
          <li className="md:w-auto w-full text-center py-2 cursor-pointer rounded-md md:hover:bg-transparent hover:bg-[rgba(211,159,56,1)] md:hover:text-black hover:text-white">
            <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          </li>
          <li className="md:w-auto w-full text-center py-2  cursor-pointer rounded-md md:hover:bg-transparent hover:bg-[rgba(211,159,56,1)] md:hover:text-black hover:text-white">
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          </li>
          <li className="md:w-auto w-full text-center py-2  cursor-pointer rounded-md md:hover:bg-transparent hover:bg-[rgba(211,159,56,1)] md:hover:text-black hover:text-white">
            <NavLink to="/cart" onClick={() => setIsOpen(false)}>
            <div className="relative inline-block">
  <img src={cart} className="w-6 h-6" alt="cart" />
  {cartItems.length > 0?<span className="absolute -top-2 -right-2 rounded-full w-4 h-4 flex items-center justify-center bg-red-500 text-white text-xs">
   
    {uniqueItems}
  </span>:null}
</div>

            </NavLink>
          </li>
          <li ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="inline-block cursor-pointer"
            >
              <img src={profile} className="w-6 h-6" alt="profile" />
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white/90 border border-gray-200 rounded-lg shadow-lg z-50 p-2 flex flex-col items-center gap-3">
                {/* صورة البروفايل */}
                <img
                  src={userphoto}
                  alt="Profile photo"
                  className="w-16 h-16 rounded-full object-cover border border-gray-300 p-2"
                />

                {/* الإيميل */}
                <p className="text-sm text-gray-700 text-center">
                  {user ? user.email : "Guest"}
                </p>

                {/* زرار اللوج آوت */}
                {user ? (
                  <button
                    onClick={signOut}
                    className="w-full py-2 text-sm text-red-600 font-medium hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    Logout
                  </button>
                ) : null}
              </div>
            )}
          </li>

          <li>
             <button 
             onClick={navigateToReservation}
             className="mt-auto bg-[rgba(211,159,56,1)] text-black py-1 px-4 rounded-3xl hover:bg-[rgb(232,186,93)] cursor-pointer">
                    Reserve Table
                  </button>
          </li>
        
        </ul>
      </div>
    </div>
  );
}


