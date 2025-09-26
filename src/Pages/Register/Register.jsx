import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { supabase } from '../../Features/Auth/Supabase/supabase-client';

function Register() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async(e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const {data,error} = await supabase.auth.signUp({
      email:email,
      password:password
    });

    if(error){
      setLoading(false);
      setMessage(error.message);
      toast.error(error.message);
      return;
    }
    if(data){
      setLoading(false);
      setMessage("registered successfully");
      toast.success("registered successfully");
      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white/50 shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        
        <form className="w-full text-left" onSubmit={handleRegister}>
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-amber-600 text-center">
            Register
          </h3>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer w-full text-white bg-amber-600 hover:bg-amber-500 
            focus:ring-4 focus:outline-none focus:ring-amber-300 
            font-medium rounded-lg text-lg px-8 py-2.5 text-center"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={'/login'} className="font-bold text-amber-600">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register;
