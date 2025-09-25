import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../Features/Auth/Supabase/supabase-client';
import { useAuth } from '../../Features/Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';

function Login() {

    const {signInWithGoogle} = useAuth();

    let navigate = useNavigate()

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
        

        console.log("data:", data);
        console.log("error:", error);

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
        <div className=" flex items-center justify-center m-10">
      <div className="bg-white/30 shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        
        <form className=" text-left max-w-sm mx-auto mt-8 mb-8" onSubmit={handleLogin}>
        <h3 className="mb-8 text-3xl font-bold text-amber-600 text-center">Login</h3>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className=" text-white bg-amber-600 hover:bg-amber-500 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            {loading? <i className="fas fa-spinner fa-spin"></i>:"Login"}
          
        </button>
    <span className='ml-4 font-normal text-sm '>don't have an account?<span className='font-bold text-[16px] ml-2'><Link to={'/register'}>Register</Link></span> </span>

      </form>


      {/* google */}

        <div className="space-y-4 mb-8">
          <button
           onClick={signInWithGoogle}
            className=" cursor-pointer w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
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

export default Login
