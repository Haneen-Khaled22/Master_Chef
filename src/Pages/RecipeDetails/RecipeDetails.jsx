import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";

function RecipeDetails() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { id } = useParams();

  const fetchRecipeDetails = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id);

    setLoading(false);
    if (error) {
      console.error("Error fetching recipedetails:", error.message);
      return [];
    }
    return data;
  };

  useEffect(() => {
    async function loadData() {
      let recipeDetails = await fetchRecipeDetails();
      setRecipes(recipeDetails);
      console.log(recipeDetails);
    }
    loadData();
  }, []);

  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <div className="inset-0 z-50 flex flex-col justify-center items-center gap-3" key={recipe.id}>
            <img src={recipe.image_url} className="w-[300px]"/> 
            <h2 className="font-bold text-3xl"> {recipe.name}</h2>
              <h2 className="text-gray-500 text-2xl"> {recipe.description}</h2>
                <h2 className="text-gray-500 text-2xl"> {recipe.rating}</h2>
                  
              <p className="text-md font-normal mb-4">
                      Price:{" "}
                      <span className="text-sm text-amber-600 font-bold">
                        {recipe.price} EGP
                      </span>
                    </p>
                    <button className="mt-auto bg-amber-600 text-white py-1 px-4 rounded-3xl hover:bg-amber-500 cursor-pointer">
                      Order Now
                    </button>
          </div>
        );
      })}
    </div>
  );
}

export default RecipeDetails;
