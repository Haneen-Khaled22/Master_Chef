import React, { useState } from 'react'
import star from "../../../assets/star.png"
import fire from "../../../assets/fire.png"
import clock from "../../../assets/chronometer.png"
import { useNavigate } from 'react-router-dom';

function SelectedProduct({ selectedRecipe, onClose }) {
  let navigate = useNavigate();

  // 🟢 state محلي للكمية
  const [quantity, setQuantity] = useState(selectedRecipe.quantity || 1);

  function navigateToCheckout() {
    navigate('/checkout');
  }

  if (!selectedRecipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white/70 rounded-3xl p-12 w-[430px] shadow-lg relative m-4">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className=" cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* صورة المنتج */}
        <img
          src={selectedRecipe.image_url}
          alt={selectedRecipe.name}
          className="w-full h-[200px] object-contain rounded-2xl"
        />

        {/* الاسم */}
        <h2 className="font-bold text-xl mt-4">{selectedRecipe.name}</h2>

        {/* الكمية */}
        <div className="flex items-center gap-4 mt-3 font-semibold">
          <button
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            className=" cursor-pointer w-9 h-9 flex justify-center items-center rounded-full bg-gray-200"
          >
            -
          </button>
          <span className=" text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className=" cursor-pointer w-9 h-9 flex justify-center items-center rounded-full bg-black text-white"
          >
            +
          </button>
        </div>

        {/* معلومات المنتج */}
        <div className="flex justify-between items-center text-md mt-4 text-gray-700">
          <span className="flex items-center gap-1">
            <img src={star} className="w-5 h-5 " />
            <span className="text-md font-semibold">{selectedRecipe.rating || 4.5}</span>
          </span>

          <span className="flex items-center gap-1">
            <img src={clock} className="w-4 h-4" />
            <span className="text-md font-semibold">{selectedRecipe.delivery_time}</span>
          </span>

          <span className="flex items-center gap-1">
            <img src={fire} className="w-4 h-4" />
            <span className="text-md font-semibold">{selectedRecipe.calories}</span>
          </span>
        </div>

        {/* وصف قصير */}
        <p className="text-md text-gray-700 mt-3">
          {selectedRecipe.description}
        </p>

        <hr className="border-t-2 border-dotted border-gray-400 my-4" />

        {/* السعر وزرار الكارت */}
        <div className="mt-5 flex justify-between items-center">
          <p className="text-md text-gray-700 mt-3">
            Total amount <br />
            <span className="text-xl text-amber-600">
              {selectedRecipe.price * quantity} EGP
            </span>
          </p>
          <button
            onClick={navigateToCheckout}
            className=" cursor-pointer bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-500"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectedProduct;
