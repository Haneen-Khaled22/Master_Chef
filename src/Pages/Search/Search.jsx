import React, { useEffect, useState } from "react";
import search from "../../assets/search.png";
import { supabase } from "../../Features/Auth/Supabase/supabase-client";
import { useCart } from "../../Features/Context/CartContext/CartContext";
import SelectedProduct from "../../Features/Shared/SelectedProduct/SelectedProduct";

function Search() {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipeSearch = async (query) => {
    setLoading(true);
    let { data, error } = await supabase
      .from("recipes")
      .select("*")
      .ilike("name", `%${query}%`);

    setLoading(false);

    if (error) {
      console.error("Error fetching recipedetails:", error.message);
      return [];
    }
    return data;
  };

  useEffect(() => {
    if (!searchQuery) {
      setRecipes([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      async function loadData() {
        let recipeSearch = await fetchRecipeSearch(searchQuery);
        setRecipes(recipeSearch || []);
      }
      loadData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <>
      {/* Search bar */}
      <div className="flex items-center gap-3 sm:gap-6 rounded-2xl py-2 sm:py-3 px-4 sm:px-8 w-[90%] sm:w-[70%] md:w-[50%] mx-auto mt-8 sm:mt-12 bg-white/80 focus-within:shadow-md transition">
        <img
          src={search}
          className="w-4 h-4 sm:w-5 sm:h-5 opacity-60"
          alt="search icon"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for food..."
          className="w-full outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Results */}
      <div>
        {loading ? (
          <div className="mx-auto min-h-[200px] flex items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="m-6 sm:m-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.length > 0 ? (
              recipes.map((recipe) => {
                const existing = cartItems.find(
                  (item) => item.recipeId === recipe.id
                );
                return (
                  <div
                    onClick={() => setSelectedRecipe(recipe)}
                    key={recipe.id}
                    className="cursor-pointer bg-white/20 rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col"
                  >
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-30 sm:h-48 object-contain"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base sm:text-lg font-semibold">
                        {recipe.name}
                      </h3>
                     
                      <p className="text-sm sm:text-md font-normal mb-4">
                        Price:{" "}
                        <span className="text-amber-600 font-bold">
                          {recipe.price} EGP
                        </span>
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (existing) {
                            removeFromCart(existing.rowId);
                          } else {
                            addToCart(recipe);
                          }
                        }}
                        className={` w-[150px] mt-auto py-1 sm:py-2 px-3 sm:px-4 rounded-3xl cursor-pointer text-sm sm:text-base ${
                          existing
                            ? "bg-amber-600 hover:bg-amber-500 text-white"
                            : "bg-amber-600 hover:bg-amber-500 text-white"
                        }`}
                      >
                        {existing ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : searchQuery ? (
              <p className="text-gray-500 col-span-full text-center">
                No results found.
              </p>
            ) : null}
          </div>
        )}
      </div>

      {selectedRecipe && (
        <SelectedProduct
          selectedRecipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}

export default Search;
