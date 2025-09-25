import React, { useEffect, useState, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import { useNavigate } from "react-router-dom";
import SelectedProduct from "../../Features/Shared/SelectedProduct/SelectedProduct";
import { useCart } from "../../Features/Context/CartContext/CartContext";


export default function PopularProductsSlider({product}) {
  const { addToCart,cartItems,removeFromCart } = useCart();
  let navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(false)
  const splideRef = useRef(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const {addPopularProductToCart} = useCart();
  
  

  useEffect(() => {
    const fetchProducts = async () => {

      setLoading(true)
      const { data, error } = await supabase
        .from("popular_products")
        .select("id, recipe_id, name, price, image_url, description, rating, delivery_time, calories, quantity")
  .order("id", { ascending: true });
      if (!error) setProducts(data);
      setLoading(false)
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-8xl sm:px-6 py-12 relative mt-12">
      {/* العنوان + الأسهم */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-3xl">Best Sellers</h2>
        <div className="flex gap-4">
          <button
            onClick={() => splideRef.current?.go("<")}
            className="text-4xl cursor-pointer text-amber-600 hover:text-amber-800"
          >
            ‹
          </button>
          <button
            onClick={() => splideRef.current?.go(">" )}
            className="text-4xl cursor-pointer text-amber-600 hover:text-amber-800"
          >
          ›
          </button>
        </div>
      </div>

    {loading ? (
  <div className="mx-auto min-h-screen flex items-center justify-center">
    <span className="loader"></span>
  </div>
) : (
  // السلايدر
  <Splide
    ref={splideRef}
    options={{
      type: "loop",
      perPage: 4,
      pagination: false,
      arrows: false, // منع الأسهم الافتراضية
      gap: "1rem",
      autoplay: true,
      breakpoints: {
        1024: { perPage: 2 },
        640: { perPage: 1 },
      },
    }}
    aria-label="Popular Recipes"
  >
    {products.map((product) => {
 const existing = cartItems.find((item) => item.recipeId === product.recipe_id);
      return (
      <SplideSlide key={product.id} >
        <div 
           onClick={() => setSelectedRecipe(product)}
          className="cursor-pointer bg-white/20 rounded-xl shadow hover:shadow-lg transition overflow-hidden h-auto flex flex-col">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-35 object-contain"
          />
          <div className="p-4 flex flex-col flex-grow gap-3">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            {/* <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p> */}
            {/* <p className="text-md font-normal mb-4">
              Price:{" "} */}
              <span className="text-sm text-amber-600 font-bold">
                {product.price} EGP
              </span>
            {/* </p> */}
            <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (existing) {
                          removeFromCart(existing.rowId); // لو موجود → شيله
                        } else {
                          addToCart(product); // لو مش موجود → ضيفه
                        }
                      }}
                      className=" w-[150px] mt-auto bg-amber-600 text-white py-1 px-3 rounded-3xl hover:bg-amber-500 cursor-pointer"
                    >
                      {existing ? "Remove from Cart" : "Add to Cart"}
                    </button>
          </div>
        </div>
      </SplideSlide>
    )

    }
    
    )}
  </Splide>
  
)}
{selectedRecipe && (
  <SelectedProduct selectedRecipe={selectedRecipe} onClose={()=>setSelectedRecipe(null)}/>
)}


      
    </div>
  );
}
