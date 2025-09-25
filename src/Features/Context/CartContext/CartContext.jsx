import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../Auth/Supabase/supabase-client";
import { useAuth } from "../AuthContext/AuthContext";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // دالة بتجيب أحدث نسخة من الكارت
  const refreshCart = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("cart")
      .select(`
        id,
        recipe_id,
        quantity,
        recipes (
          name,
          price,
          image_url
        )
      `)
      .eq("user_id", user.id);

    if (!error && data) {
      setCartItems(
        data.map((item) => ({
          rowId: item.id,            // 🟢 المفتاح الأساسي من cart
          recipeId: item.recipe_id,  // 🟢 الريسيبي المرتبط
          quantity: item.quantity,
          name: item.recipes.name,
          price: item.recipes.price,
          image_url: item.recipes.image_url,
        }))
      );
    }
  };

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    refreshCart();
  }, [user]);

  // إضافة عنصر للكارت
 const addToCart = async (item) => {
  if (!user) {
    console.error("User not logged in");
     toast((t) => (
            <span className="flex gap-2 capitalize items-center">
              <a
                className="text-amber-600 underline uppercase font-semibold"
                href="/login"
              >
                login
              </a>{" "}
              to add items to cart
            </span>
          ), { id: "must-login" }); // id يمنع تكرار التوست
        
    return;
  }

  const recipeId = item.recipe_id || item.id;
  const existing = cartItems.find((cartItem) => cartItem.recipeId === recipeId);

  if (existing) {
    // لو موجود → زود الكمية
    const { error } = await supabase
      .from("cart")
      .update({ quantity: existing.quantity + 1 })
      .eq("id", existing.rowId);

    if (error) {
      console.error("Update error:", error.message);
    } else {
      toast.success(`${item.name} quantity increased`);
      await refreshCart();
    }
  } else {
    // لو مش موجود → أضف عنصر جديد
    const { error } = await supabase.from("cart").insert([
      {
        user_id: user.id,
        recipe_id: recipeId,
        quantity: 1,
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      toast.success(`${item.name} added to cart`);
      await refreshCart();
    }
  }
};



  // زيادة الكمية
  const increaseQuantity = async (rowId) => {
    const current = cartItems.find((i) => i.rowId === rowId);
    if (!current) return;

    const { error } = await supabase
      .from("cart")
      .update({ quantity: current.quantity + 1 })
      .eq("id", rowId);

    if (error) {
      console.error("Increase error:", error.message);
    } else {
      await refreshCart(); // ✅ مزامنة
    }
  };

  // تقليل الكمية
  const decreaseQuantity = async (rowId) => {
    const current = cartItems.find((i) => i.rowId === rowId);
    if (!current) return;

    if (current.quantity > 1) {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: current.quantity - 1 })
        .eq("id", rowId);

      if (error) {
        console.error("Decrease error:", error.message);
      } else {
        await refreshCart(); // ✅ مزامنة
      }
    } else {
      await removeFromCart(rowId);
    }
  };

  // إزالة عنصر
  const removeFromCart = async (rowId) => {
  const current = cartItems.find((i) => i.rowId === rowId);

  const { error } = await supabase.from("cart").delete().eq("id", rowId);

  if (error) {
    console.error("Delete error:", error.message);
  } else {
    toast.error(`${current?.name || "Item"} removed from cart`);
    await refreshCart();
  }
};

  // تفريغ الكارت كله
  const clearCart = async () => {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Clear error:", error.message);
    } else {
      setCartItems([]);
    }
  };

  const totalItems = cartItems.reduce((sum, p) => sum + p.quantity, 0); // عدد القطع الكلي
const uniqueItems = cartItems.length; // عدد المنتجات المختلفة

  const totalPrice = cartItems.reduce(
    (sum, p) => sum + p.quantity * (p.price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        uniqueItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
