import React, { useEffect, useState } from "react";
import cover from "../../assets/homephoto-removebg-preview.png";
import pizza from "../../assets/pizza.png";
import drinks from "../../assets/drink.png";
import dessert from "../../assets/donut.png";
import burger from "../../assets/burger (1).png";
import search from "../../assets/search.png";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import PopularProductsSlider from "../Popular Recipes/PopularRecipes";
import ServicesSection from "../ServiceSection/SerciceSection";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const iconsMap = {
    Pizzas: pizza,
    Desserts: dessert,
    Drinks: drinks,
    Burgers: burger,
  };

  function navigateToMenu(){
    navigate('/menu')
  }

  function navigateToSearch(){
    navigate('/search')
  }

  const [popularRecipes, setPopularRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate()

  const fetchCategories = async () => {
      let { data, error } = await supabase
        .from("categories") // اسم الجدول عندك
        .select("id, name"); // id هنا هو UUID
      
      if (!error) {
        setCategories(data);
      }
    };

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("popular_products")
        .select("*")
        .order("id", { ascending: true });
      if (!error) setPopularRecipes(data);
    };
    fetchRecipes();
    fetchCategories();
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-12">
        {/* Left Section */}
        <div className="w-full lg:w-auto text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
            We Serve The Taste
            <br /> You Love
          </h1>
          <h3 className="text-sm sm:text-base leading-relaxed">
            Experience the perfect blend of authentic flavors, cozy atmosphere,
            <br className="hidden sm:block" /> and exceptional service, where
            every meal is crafted with passion
            <br className="hidden sm:block" /> to make your dining unforgettable
          </h3>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 sm:mt-12 md:w-auto">
            <button onClick={navigateToMenu} className="bg-[rgb(232,186,93)] rounded-3xl py-2 px-4 cursor-pointer hover:bg-[rgb(232,186,93)] hover:text-white hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300">
              Explore Food
            </button>
            <button onClick={navigateToSearch} className=" cursor-pointer flex md:w-auto border border-[rgb(232,186,93)] rounded-3xl py-2 px-5 items-center gap-3 hover:bg-[rgb(232,186,93)] hover:text-white hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300">
              <img src={search} className="w-5 h-5" alt="search icon" />
              Search
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* الصورة تختفي في الشاشات الصغيرة */}
          <div className="hidden lg:block">
            <img
              src={cover}
              className="w-60 sm:w-72 lg:w-[420px] object-cover h-auto mt-3"
              alt="cover"
            />
          </div>

          {/* الكاتيجوريز */}
          <div>
            <ul
              className="p-4 sm:p-6 text-sm cursor-pointer 
                 grid grid-cols-2 gap-3 
                 lg:flex lg:flex-col"
            >
              {categories.map((cat)=>{
                return (
                   <li
                   key={cat.id}
                onClick={() => navigate(`/catdetails/${cat.id}`)}
                className="bg-white/50 rounded-3xl px-3 py-2 flex items-center gap-2  w-[90px]
                   hover:bg-[rgb(232,186,93)] hover:text-white hover:scale-105 
                   shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img src={iconsMap[cat.name] || dishes} alt={`${cat.name} icon`} className="w-4 h-4"  />
                <span>{cat.name}</span>
              </li>
                )
                

              })

              }
             

             
            </ul>
          </div>
        </div>
      </div>
      {/* popular recipes */}
     <PopularProductsSlider/>
     {/* sercice section */}
     <ServicesSection/>
    </>
  );
}

export default HomePage;
