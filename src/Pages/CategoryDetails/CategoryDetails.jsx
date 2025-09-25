import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import SelectedProduct from "../../Features/Shared/SelectedProduct/SelectedProduct";
import { useCart } from "../../Features/Context/CartContext/CartContext";

function CategoryDetails() {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { id } = useParams();

  const fetchCategoryDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("category_id", id);
    setLoading(false);
    if (error) {
      console.error("Error fetching recipes:", error.message);
      return [];
    }
    return data;
  };

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    setLoading(false);
    if (error) {
      console.error("Error fetching categories:", error.message);
      return [];
    }
    return data;
  };

  useEffect(() => {
    async function loadData() {
      const resultrecipes = await fetchCategoryDetails();
      setRecipes(resultrecipes || []);
      const resultcategories = await fetchCategories();
      setCategories(resultcategories || {});
    }
    loadData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="mx-auto min-h-screen flex items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mt-4 ml-12">
            <div>
              <h1 className="font-bold mt-3 text-lg">
                {categories ? categories.name : "Loading..."}
              </h1>
            </div>
          </div>

          <div>
            <div className="m-12 flex items-center flex-wrap gap-4 ">
              {recipes?.map((recipe) => {
                // ⚠️ نقارن بـ recipeId لأن CartContext بيخزن recipeId
                const existing = cartItems.find(
                  (item) => item.recipeId === recipe.id
                );
                const isInCart = !!existing;

                return (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="cursor-pointer bg-white/20 rounded-xl shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col w-[260px]"
                  >
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-30 object-contain"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold">{recipe.name}</h3>

                      <p className="text-md font-normal mb-4">
                        Price:{" "}
                        <span className="text-sm text-amber-600 font-bold">
                          {recipe.price} EGP
                        </span>
                      </p>

                      {isInCart ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // لازم نمرر rowId عشان removeFromCart يتعامل صح
                            removeFromCart(existing.rowId);
                          }}
                          className="w-[150px] mt-auto bg-red-600 text-white py-1 px-4 rounded-3xl hover:bg-red-500 cursor-pointer"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(recipe);
                          }}
                          className="w-[150px] mt-auto bg-amber-600 text-white py-1 px-4 rounded-3xl hover:bg-amber-500 cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedRecipe && (
              <SelectedProduct
                selectedRecipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CategoryDetails;
