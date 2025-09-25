import  { createContext, useEffect, useContext, useState } from "react";
import { supabase } from "../../Auth/Supabase/supabase-client";


const AuthContext = createContext();

export const AuthProvider =({children})=>{

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);

      useEffect(() => {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user ?? null);
    setLoading(false);
  };
  getSession();

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => listener.subscription.unsubscribe();
}, []);


  const signInWithGoogle = async()=>{
    const {data,error} = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })
    if(error){
        console.log('Error logging in with Google:', error.message);
    }
    return { data, error };
  }

 

  const signOut = async()=>{
    const {error} = await supabase.auth.signOut();
    setUser(null);
    if(error){
        console.log('Error signing out:', error.message);
    }
  }


    return (
        <AuthContext.Provider value={{user,signInWithGoogle,signOut,signInWithFaceBook}}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth =()=> useContext(AuthContext);