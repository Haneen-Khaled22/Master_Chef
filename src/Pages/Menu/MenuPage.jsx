import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import { useNavigate, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import star from "../../assets/star.png"
import fire from "../../assets/fire.png"
import clock from "../../assets/chronometer.png"
import SelectedProduct from "../../Features/Shared/SelectedProduct/SelectedProduct";
import { useCart } from "../../Features/Context/CartContext/CartContext";



function MenuPage({recipe}) {
  const {addToCart, cartItems, removeFromCart } = useCart();
  let navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const splideRef = useRef(null);

  let { id } = useParams();

  // stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-xl ${i < rating ? "text-amber-500" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // categories names
  async function fetchCategories() {
    let { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.log(error);
      return [];
    }
    return data;
  }


  // recipes by categories
  async function getRecipesByCategories(categoryId = null) {
    console.log("Fetching recipes for category:", categoryId);

    if (categoryId === "all" || !categoryId) {
      let { data, error } = await supabase.from("recipes").select("*");

      if (error) {
        console.error("Supabase error:", error);
        return [];
      }

      return data;
    }

    let { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("category_id", categoryId);

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    console.log("Recipes result:", data);
    return data;
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await fetchCategories();
      setCategories(result);

      const categoryToLoad = id ? id : "all";
      setActiveCategory(categoryToLoad);

      const myRecipes = await getRecipesByCategories(categoryToLoad);
      setRecipes(myRecipes);
      setLoading(false);
    }

    loadData();
  }, [id]);


  // active category
  const handleActiveCategory = async (categoryId) => {
    setActiveCategory(categoryId);
    const myRecipes = await getRecipesByCategories(categoryId);
    setRecipes(myRecipes);
  };

  return (
    <div>
     <div className='flex mx-auto justify-center items-center flex-wrap'>
  {loading ? (
    <div className="mx-auto min-h-screen flex items-center justify-center">
      <span className="loader"></span>
    </div>
  ) : (
    <>
      <div
        onClick={() => handleActiveCategory("all")}
        className={`m-4 px-4 py-1 rounded-3xl cursor-pointer ${
          activeCategory === "all"
            ? "bg-[rgb(232,186,93)] text-white"
            : "bg-white/60 hover:bg-[rgb(232,186,93)] hover:text-white"
        }`}
      >
        <h2>All</h2>
      </div>

     {categories.map((cat) => (
  <div
    onClick={() => handleActiveCategory(cat.id)}
    key={cat.id}
    className={`px-4 py-1 m-4 rounded-3xl cursor-pointer transition text-center
      ${
        activeCategory === cat.id
          ? "bg-[rgb(232,186,93)] text-white"
          : "bg-white/60 hover:bg-[rgb(232,186,93)] hover:text-white"
      }`}
  >
    <h2 className="text-xs sm:text-sm md:text-base  whitespace-nowrap">
      {cat.name}
    </h2>
  </div>
))}

    </>
  )}
</div>


      <div className="max-w-8xl sm:px-6 py-5 relative mb-24">
        {/* العنوان + الأسهم */}
        <div className="flex items-center justify-between ">
          <div></div>
          <div className="flex gap-4 mb-3">
            <button
              onClick={() => splideRef.current?.go("<")}
              className="text-4xl cursor-pointer text-amber-600 hover:text-amber-800"
            >
              ‹
            </button>
            <button
              onClick={() => splideRef.current?.go(">")}
              className="text-4xl cursor-pointer text-amber-600 hover:text-amber-800"
            >
              ›
            </button>
          </div>
        </div>

        {/* السلايدر */}
        <Splide
          ref={splideRef}
          options={{
            type: "slide", // غيرت من "loop" لـ "slide" عشان ميكررش العناصر
            perPage: 4,
            pagination: false,
            arrows: false, // مهم: منع الأسهم الافتراضية
            gap: "1rem",
            autoplay: false, // شلت الـ autoplay عشان ميكررش العناصر
            rewind: false, // منع العودة للبداية
            rewindByDrag: false, // منع العودة بالدراج
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
          aria-label="Popular Recipes"
        >
          {recipes.map((recipe) => {
            const existing = cartItems.find(
              (item) => item.recipeId === recipe.id
            ); 
            return   (
            <SplideSlide key={recipe.id} >
              <div onClick={() => setSelectedRecipe(recipe)}
               className="cursor-pointer bg-white/20 rounded-xl shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-30 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{recipe.name}</h3>
                  {/* <p className="text-sm text-gray-600 mt-1 line-clamp-2 w-[130px]">
                    {recipe.description}
                  </p> */}
                  <p className="text-md font-normal mb-4">
                    Price :{" "}
                    <span className="text-sm text-amber-600 font-bold">
                      {recipe.price} EGP
                    </span>
                  </p>
                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (existing) {
                          removeFromCart(existing.rowId); // لو موجود → شيله
                        } else {
                          addToCart(recipe); // لو مش موجود → ضيفه
                        }
                      }}
                      className="mt-auto bg-amber-600 text-white py-1 px-4 rounded-3xl hover:bg-amber-500 cursor-pointer"
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

       {selectedRecipe && (

<SelectedProduct selectedRecipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />

      )}
      </div>
    </div>
  );
}

export default MenuPage;
