import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../Features/Auth/Supabase/supabase-client';
import { useAuth } from '../../Features/Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';

function Login() {

  const { signInWithGoogle } = useAuth();
  let navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin=async(e)=>{
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const {data,error} = await supabase.auth.signInWithPassword({
        email:email,
        password:password
    });

    if(error){
        setMessage(error.message);
        toast.error(error.message);
        setLoading(false);
        return;
    }
    if (data.session) {
      setMessage("logged in successfully");
      toast.success("logged in successfully");
      setLoading(false);
      navigate('/');
    } else {
      setMessage("Login failed");
      toast.error("Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="bg-white/50 shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        
        <form className="text-left w-full" onSubmit={handleLogin}>
          <h3 className="mb-8 text-2xl sm:text-3xl font-bold text-amber-600 text-center">Login</h3>

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
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to={'/register'} className="font-bold text-amber-600">Register</Link>
          </p>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google */}
        <div className="space-y-4">
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-2 px-4 
            rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login;
