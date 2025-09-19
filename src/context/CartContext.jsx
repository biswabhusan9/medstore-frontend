// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { getData } from "./DataContext";

// export const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const [cartItem, setCartItem] = useState(() => {
//     try {
//       const stored = localStorage.getItem("cart");
//       if (!stored) return [];
//       const parsed = JSON.parse(stored);
//       if (Array.isArray(parsed)) return parsed;
//       return [];
//     } catch {
//       return [];
//     }
//   });

//   const { data } = getData();

//   // 🔄 Remove products from cart if no longer available
//   useEffect(() => {
//     if (data) {
//       setCartItem((prev) => {
//         const filtered = prev.filter((item) => {
//           const prod = data.find((p) => p.id === item.id);
//           return prod && prod.available !== false;
//         });
//         if (JSON.stringify(filtered) !== JSON.stringify(prev)) {
//           return filtered;
//         }
//         return prev;
//       });
//     }
//   }, [data]);

//   // 💾 Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItem));
//   }, [cartItem]);

//   // 🛒 Add product to cart
//   const addToCart = (product) => {
//     if (product.available === false) {
//       toast.error("This product is out of stock!");
//       return;
//     }

//     const itemInCart = cartItem.find((item) => item.id === product.id);

//     if (itemInCart) {
//       // ✅ Increase only cartQuantity (NOT quantityText)
//       const updatedCart = cartItem.map((item) =>
//         item.id === product.id
//           ? { ...item, cartQuantity: item.cartQuantity + 1 }
//           : item
//       );
//       setCartItem(updatedCart);
//       toast.success("Product quantity increased!");
//     } else {
//       // ✅ Add product with cartQuantity = 1 and quantityText = product.quantity
//       setCartItem([
//         ...cartItem,
//         {
//           ...product,
//           cartQuantity: 1, // how many user ordered
//           quantityText: product.quantity, // product info like "20 Tablets"
//         },
//       ]);
//       toast.success("Product added to cart!");
//     }
//   };

//   // ➕➖ Update only cartQuantity
//   const updateQuantity = (productId, action) => {
//     setCartItem((prevCart) =>
//       prevCart.map((item) => {
//         if (item.id === productId) {
//           if (action === "inc") {
//             return { ...item, cartQuantity: item.cartQuantity + 1 };
//           } else if (action === "dec" && item.cartQuantity > 1) {
//             return { ...item, cartQuantity: item.cartQuantity - 1 };
//           }
//         }
//         return item;
//       })
//     );
//   };

//   const deleteItem = (productId) => {
//     setCartItem(cartItem.filter((item) => item.id !== productId));
//     toast.success("Product removed from cart!");
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getData } from "./DataContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  });

  const { data } = getData();

  // 🔄 Remove products from cart if no longer available
  useEffect(() => {
    if (data) {
      setCartItem((prev) => {
        const filtered = prev.filter((item) => {
          const prod = data.find((p) => p.id === item.id);
          return prod && prod.available !== false;
        });
        if (JSON.stringify(filtered) !== JSON.stringify(prev)) {
          return filtered;
        }
        return prev;
      });
    }
  }, [data]);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  // 🛒 Add product to cart
  const addToCart = (product) => {
    if (product.available === false) {
      toast.error("This product is out of stock!");
      return;
    }

    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      // ✅ CHANGE HERE: respect product.cartQuantity if provided (for dropdown)
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? {
              ...item,
              cartQuantity:
                item.cartQuantity +
                (product.cartQuantity ?? 1), // <-- if dropdown sent 4, add +4
            }
          : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      // ✅ CHANGE HERE: use product.cartQuantity if available, fallback to 1
      setCartItem([
        ...cartItem,
        {
          ...product,
          cartQuantity: product.cartQuantity ?? 1, // <-- FIXED
          quantityText: product.quantity, // product info like "20 Tablets"
        },
      ]);
      toast.success("Product added to cart!");
    }
  };

  // ➕➖ Update only cartQuantity
  // const updateQuantity = (productId, action) => {
  //   setCartItem((prevCart) =>
  //     prevCart.map((item) => {
  //       if (item.id === productId) {
  //         if (action === "inc") {
  //           return { ...item, cartQuantity: item.cartQuantity + 1 };
  //         } else if (action === "dec" && item.cartQuantity > 1) {
  //           return { ...item, cartQuantity: item.cartQuantity - 1 };
  //         }
  //       }
  //       return item;
  //     })
  //   );
  // };

  // ➕➖ Update only cartQuantity
const updateQuantity = (productId, action) => {
  setCartItem((prevCart) =>
    prevCart.map((item) => {
      if (item.id === productId) {
        if (action === "inc") {
          // ✅ ADD CHECK: Allow maximum 5
          if (item.cartQuantity >= 5) {
            toast.info("Maximum 5 quantity allowed!");
            return item; // ⬅️ do not increase further
          }
          return { ...item, cartQuantity: item.cartQuantity + 1 };
        } else if (action === "dec" && item.cartQuantity > 1) {
          return { ...item, cartQuantity: item.cartQuantity - 1 };
        }
      }
      return item;
    })
  );
};
  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
