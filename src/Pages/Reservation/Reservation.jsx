import { useState } from "react";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import toast from "react-hot-toast";
import reserve from "../../assets/meal (1).png"


export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 1,
    date: "",
    time: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("reservations").insert([
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        guests: form.guests,
        reservation_date: form.date,
        reservation_time: form.time,
        notes: form.notes,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }
    ]);

    setLoading(false);

    if (error) {
      toast.error(" Error while reserving, try again!");
      console.error(error);
    } else {
      toast.success("Reservation confirmed at Master Chef!");
      setForm({ name: "", phone: "", email: "", guests: 1, date: "", time: "", notes: "" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center m-8 ">
      <div className="bg-white/20 shadow-lg rounded-2xl p-8 w-full sm:max-w-xl">
        <div className="flex items-center  justify-center gap-3 m-5">
            <h2 className="text-3xl font-bold text-center text-amber-800 ">
          Reserve a Table 
        </h2>
        <img src={reserve} className="h-9 w-9 object-cover"/>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block font-semibold mb-1">Number of Guests</label>
            <input
              type="number"
              min="1"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: +e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg "
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg "
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold mb-1">Special Notes</label>
            <textarea
              rows="3"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg "
              placeholder="e.g., Birthday celebration, High chair needed..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className=" cursor-pointer w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Reserving..." : "Reserve Table"}
          </button>
        </form>
      </div>
    </div>
  );
}
