import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '../../Features/Context/CartContext/CartContext';
import { useNavigate } from 'react-router-dom';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useAuth } from '../../Features/Context/AuthContext/AuthContext';

function Cart({recipe}) {
  const [loading, setLoading] = useState(true);
  const {cartItems, addToCart, uniqueItems,removeFromCart, clearCart, totalItems, totalPrice,increaseQuantity,decreaseQuantity} = useCart();
  const splideRef = useRef(null);
  const {user} = useAuth()

  let navigate = useNavigate();

  function navigateToCheckout(){
    navigate('/checkout');
  }

  // إيقاف الـ loading لما الكارت يخلص تحميل البيانات
  useEffect(() => {
    // إيقاف الـ loading بعد تحميل البيانات
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // انتظار ثانية واحدة عشان نشوف الـ loading

    return () => clearTimeout(timer);
  }, [cartItems]); // يعيد التشغيل لما الكارت يتغير

  // دالة لتحديد إزاي نعرض العناصر
  const shouldShowSlider = () => {
    return cartItems.length > 4;
  };

  // مكون لعرض العنصر الواحد
  const CartItem = ({ item }) => (
    <li 
      className="relative flex flex-col sm:flex-row items-center p-2 sm:p-4 justify-center rounded-lg mx-auto h-auto space-y-4 sm:space-y-0 sm:space-x-6"
    >
        {/* زرار X فوق يمين */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-amber-600 cursor-pointer font-bold text-3xl"
          onClick={() => removeFromCart(item.rowId)}
        >
          ×
        </button>

        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 w-full'>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 w-full sm:w-auto">
            <div className="flex-shrink-0">
              <img src={item.image_url} className='h-24 w-24 sm:h-28 sm:w-28 lg:h-35 lg:w-36 rounded-lg object-cover'/>
            </div>
            <div className="text-center sm:text-left flex-1 min-w-0 px-2 w-full sm:w-auto">
              <h3 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg break-words leading-tight">{item.name}</h3>
              <p className="text-sm sm:text-base">{item.price} EGP</p>
            </div>
          </div>
          
          {/* أزرار الزيادة والنقصان - تنزل تحت في الشاشات الصغيرة */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <div className="flex items-center justify-center gap-3 sm:gap-4 font-semibold bg-gray-100 rounded-3xl overflow-hidden w-fit mx-auto sm:mx-0">
              <button
              onClick={() => decreaseQuantity(item.rowId)}
              className="cursor-pointer w-7 h-7 text-xl flex justify-center items-center rounded-full bg-white">
                -
              </button>
              <span className="text-base sm:text-lg font-semibold">{item.quantity}</span>
              <button
              onClick={() => increaseQuantity(item.rowId)}
              className="cursor-pointer w-7 h-7 text-xl flex justify-center items-center rounded-full bg-amber-600 text-white">
                +
              </button>
            </div>
          </div>
        </div>
    </li>
  );

  return (
    <div className='mx-4 sm:mx-8 md:mx-12 lg:mx-20 my-6 sm:my-8 md:my-10 lg:my-12'>
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="loader mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      ) : !user ? (
  <p className="text-center text-lg">
    <a href="/login" className="text-amber-600 underline font-semibold">
      Login
    </a>{" "}
    to see your cart
  </p>
) : cartItems.length === 0 ? (
  <p className="text-center text-lg">Cart is empty now</p>
) : (
        <>
          <div className='flex flex-col lg:flex-row justify-between gap-4 lg:gap-8'>
            {/* عرض العناصر - عادي أو سلايدر */}
            <div className="flex-1 lg:flex-2">
              {shouldShowSlider() ? (
                // سلايدر للشاشات الصغيرة
                <div className="block lg:hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div></div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => splideRef.current?.go("<")}
                        className="text-3xl cursor-pointer text-amber-600 hover:text-amber-800"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => splideRef.current?.go(">")}
                        className="text-3xl cursor-pointer text-amber-600 hover:text-amber-800"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                  
                  <Splide
                    ref={splideRef}
                    options={{
                      type: "slide",
                      perPage: 1,
                      pagination: false,
                      arrows: false,
                      gap: "1rem",
                      autoplay: false,
                      rewind: false,
                      rewindByDrag: false,
                    }}
                    aria-label="Cart Items"
                  >
                    {cartItems.map((item) => (
                      <SplideSlide key={item.rowId}>
                        <div className="px-2">
                          <CartItem item={item} />
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              ) : (
                // عرض عادي للشاشات الكبيرة أو لما يكون العناصر قليلة
                <ul className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.rowId}>
                      <CartItem item={item} />
                      <hr className="border-t-2 border-gray-300 my-2 sm:my-4" />
                    </div>
                  ))}
                </ul>
              )}
              
              {/* عرض عادي للشاشات الكبيرة لما يكون في سلايدر */}
              {shouldShowSlider() && (
                <div className="hidden lg:block">
                  <ul className="space-y-8">
                    {cartItems.map((item) => (
                      <div key={item.rowId}>
                        <CartItem item={item} />
                        <hr className="border-t-2 border-gray-300 my-2 sm:my-4" />
                      </div>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className='flex-1 space-y-4 sm:space-y-6 w-full lg:w-auto'>
              <button
                className="w-full sm:w-auto mt-2 sm:mt-4 bg-gray-700 text-white font-bold px-3 py-2 cursor-pointer rounded hover:bg-gray-900 text-sm sm:text-base"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <div className='bg-white/40 p-3 sm:p-4 h-auto rounded-lg'>
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li
                      key={item.rowId}
                      className="flex items-center justify-between text-sm sm:text-base"
                    >
                      <h3 className="mb-1 sm:mb-3 truncate pr-2 ">{item.name}<span className='ml-1'>({item.quantity})</span></h3>
                      <p className="whitespace-nowrap">{item.price * item.quantity} EGP</p>
                    </li>
                  ))}
                </ul>
                <hr className="border-t-2 border-dotted border-gray-400 my-3 sm:my-4" />
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <h3 className="mb-1">Total Items</h3>
                  <p>{uniqueItems} items</p>
                </div>
                <hr className="border-t-2 border-dotted border-gray-400 my-3 sm:my-4" />
                <div className="flex items-center p-2 justify-between">
                  <h3 className="font-bold text-lg sm:text-xl mb-3">Total Price</h3>
                  <p className="font-bold text-lg sm:text-xl mb-3">{totalPrice} EGP</p>
                </div>
                <button
                onClick={navigateToCheckout}
                 className='w-full bg-amber-700 p-2 sm:p-3 cursor-pointer rounded-sm font-bold text-white text-sm sm:text-base hover:bg-amber-800 transition-colors'>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;
