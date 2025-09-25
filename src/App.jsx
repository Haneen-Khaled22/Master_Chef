import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Features/Layout/Layout'
import HomePage from "./Pages/Home/HomePage"
import AboutPage from './Pages/About/AboutPage';
import ContactPage from './Pages/Contact/ContactPage';
import MenuPage from './Pages/Menu/MenuPage';
import Reservation from './Pages/Reservation/Reservation'
import NotFound from './Pages/NotFound/NotFound'
import CategoryDetails from './Pages/CategoryDetails/CategoryDetails'
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails'
import Search from './Pages/Search/Search'
import Cart from './Pages/Cart/Cart'
import { AuthProvider } from './Features/Context/AuthContext/AuthContext'
import Login from './Pages/Login/Login'
import { Toaster } from 'react-hot-toast'
import Register from './Pages/Register/Register'
import { CartProvider } from './Features/Context/CartContext/CartContext'
import Checkout from './Pages/Checkout/Checkout'
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute'
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {
  
  let router = createBrowserRouter([
    {path:"",element:<Layout/>,
      children:[
        {index:true,element:<HomePage/>},
        {path:'/login',element:<Login/>},
        {path:'/register',element:<Register/>},
        {path:'/about',element:<AboutPage/>}
        ,{path:'/contact',element:<ContactPage/>},
        {path:'/menu',element:<MenuPage/>},
        {path:'/reservation',element:<Reservation/>},
        {path:'/search',element:<Search/>},
        {path:'/cart',element:<Cart/>},
        {path:'/checkout',element:<Checkout/>},
        {path:'/reserve',element:<Reservation/>},
        {path:'/catdetails/:id',element:<CategoryDetails/>},
        {path:'/recipedetails/:id',element:<RecipeDetails/>},
        {path:'*',element:<NotFound/>},
      ]
      
    }
  ])


  return (
    <>
    <AuthProvider>
    <CartProvider>
    
      
      
  <RouterProvider router={router}></RouterProvider>

   
    
    <Toaster />
      </CartProvider>
      </AuthProvider>
    
    
    </>
    
  )
}

export default App
