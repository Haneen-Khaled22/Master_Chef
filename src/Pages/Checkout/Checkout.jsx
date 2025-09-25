import React, { useState } from "react";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import { useAuth } from "../../Features/Context/AuthContext/AuthContext";
import { useCart } from "../../Features/Context/CartContext/CartContext";
import toast from "react-hot-toast";

function Checkout() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { cartItems, clearCart } = useCart();

  // بيانات العميل
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // حساب الإجمالي
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handlePlaceOrder() {
    if (!user) {
         toast.error("Please login first");
      return;
    }

    if (!fullName || !address || !city || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        amount: totalAmount,
        status: "pending",
        full_name: fullName,
        address,
        city,
        phone,
        payment_method: paymentMethod,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
         toast.error("Something went wrong!");
    } else {
         toast.success("Order placed successfully ");
      clearCart();
      setFullName("");
      setAddress("");
      setCity("");
      setPhone("");
      setPaymentMethod("cash");
    }
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* بيانات العميل */}
      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />

        {/* اختيار طريقة الدفع */}
        <div className="mt-4">
          <label className="font-semibold block mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="wallet">Mobile Wallet</option>
          </select>
        </div>
      </div>

      {/* تفاصيل الكارت */}
      <ul className="mb-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between border-b py-2 text-gray-700"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{item.price * item.quantity} EGP</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total:</span>
        <span>{totalAmount} EGP</span>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-amber-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-500 disabled:opacity-50"
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;
