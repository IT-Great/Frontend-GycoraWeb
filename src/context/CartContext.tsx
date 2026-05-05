/* eslint-disable react-hooks/set-state-in-effect */
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { BASE_URL } from "../config/api";

// // // Tipe data berdasarkan struktur dari API Golang
// // export interface CartItem {
// //   id: number;
// //   product_id: number;
// //   quantity: number;
// //   gross_amount: number;
// //   product: {
// //     name: string;
// //     price: number;
// //     image_url: string;
// //     sku?: string; // Sifatnya opsional jika tidak selalu turun dari API
// //   };
// // }

// // Tipe data berdasarkan struktur dari API Golang/Laravel
// // export interface CartItem {
// //   id: number;
// //   product_id: number;
// //   quantity: number;
// //   gross_amount: number;
// //   product: {
// //     name: string;
// //     price: number;
// //     image_url: string;
// //     sku?: string; // Sifatnya opsional jika tidak selalu turun dari API
// //     // --- TAMBAHKAN BARIS DI BAWAH INI ---
// //     stock: number; 
// //   };
// // }

// // --- 1. BUAT INTERFACE PRODUCT TERPISAH ---
// export interface Product {
//   color: string;
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
//   sku?: string;
//   stock: number;
// }

// // --- 2. GUNAKAN INTERFACE PRODUCT DI CART ITEM ---
// export interface CartItem {
//   id: number;
//   product_id: number;
//   quantity: number;
//   gross_amount: number;
//   product: Product; // Panggil tipe Product di sini
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   fetchCart: () => void;
//   isCartOpen: boolean;
//   setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   cartTotalItems: number;
//   cartSubtotal: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Fungsi untuk menarik data terbaru dari Golang API
//   const fetchCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) return; // Jangan fetch jika belum login

//     try {
//       // Pastikan port ini sesuai dengan server Golang Anda (misal 8080 atau 8000)
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         headers: { Authorization: `Bearer ${token}`, "Accept": "application/json" },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const cartsArray = data.data ? data.data : data;
//         setCartItems(cartsArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data keranjang:", error);
//     }
//   };

//   // Otomatis tarik data keranjang saat web pertama kali dimuat
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchCart();
//   }, []);

//   const cartTotalItems = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );
//   const cartSubtotal = cartItems.reduce(
//     (total, item) => total + item.gross_amount,
//     0,
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         fetchCart,
//         isCartOpen,
//         setIsCartOpen,
//         cartTotalItems,
//         cartSubtotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // Custom hook agar mudah digunakan di komponen lain
// // eslint-disable-next-line react-refresh/only-export-components
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context)
//     throw new Error("useCart harus digunakan di dalam CartProvider");
//   return context;
// };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { BASE_URL } from "../config/api";

// // --- 1. BUAT INTERFACE PRODUCT TERPISAH ---
// export interface Product {
//   color: string;
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
//   sku?: string;
//   stock: number;
// }

// // --- 2. GUNAKAN INTERFACE PRODUCT DI CART ITEM ---
// export interface CartItem {
//   id: number;
//   product_id: number;
//   quantity: number;
//   gross_amount: number;
//   product: Product; 
//   color?: string | null; // Tambahkan properti color di level CartItem
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   fetchCart: () => void;
//   // Fungsi baru untuk memanipulasi state secara optimis
//   addCartItemOptimistically: (newItem: CartItem) => void;
//   revertCartItems: (previousItems: CartItem[]) => void;
  
//   isCartOpen: boolean;
//   setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   cartTotalItems: number;
//   cartSubtotal: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Fungsi untuk menarik data terbaru dari API
//   const fetchCart = async () => {
//     const token = localStorage.getItem("user_token");
//     if (!token) return; 

//     try {
//       const res = await fetch(`${BASE_URL}/api/carts`, {
//         headers: { Authorization: `Bearer ${token}`, "Accept": "application/json" },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         const cartsArray = data.data ? data.data : data;
//         setCartItems(cartsArray || []);
//       }
//     } catch (error) {
//       console.error("Gagal mengambil data keranjang:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // --- FUNGSI OPTIMISTIC BARU ---
//   const addCartItemOptimistically = (newItem: CartItem) => {
//     setCartItems(prev => {
//       // Cek apakah produk dengan varian yang sama sudah ada
//       const existingItemIndex = prev.findIndex(
//         item => item.product_id === newItem.product_id && item.color === newItem.color
//       );

//       if (existingItemIndex >= 0) {
//         // Jika sudah ada, update quantity dan gross_amount
//         const newItems = [...prev];
//         newItems[existingItemIndex].quantity += newItem.quantity;
//         newItems[existingItemIndex].gross_amount += newItem.gross_amount;
//         return newItems;
//       } else {
//         // Jika belum ada, tambahkan sebagai item baru di urutan teratas
//         return [newItem, ...prev];
//       }
//     });
//   };

//   const revertCartItems = (previousItems: CartItem[]) => {
//     setCartItems(previousItems);
//   };
//   // ------------------------------

//   const cartTotalItems = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );
//   const cartSubtotal = cartItems.reduce(
//     (total, item) => total + item.gross_amount,
//     0,
//   );

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         fetchCart,
//         addCartItemOptimistically, // Expose fungsi baru
//         revertCartItems,           // Expose fungsi revert
//         isCartOpen,
//         setIsCartOpen,
//         cartTotalItems,
//         cartSubtotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart harus digunakan di dalam CartProvider");
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

export interface Product {
  color: string;
  id: number;
  name: string;
  price: number;
  discount_price: number;
  voucher_discount_price: number;
  image_url: string;
  sku?: string;
  stock: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  gross_amount: number;
  product: Product; 
  color?: string | null; 
}

interface CartContextType {
  cartItems: CartItem[];
  fetchCart: () => void;
  // Fungsi-fungsi Optimistic
  addCartItemOptimistically: (newItem: CartItem) => void;
  removeCartItemOptimistically: (itemId: number) => void;
  updateCartItemQtyOptimistically: (itemId: number, newQty: number, newGrossAmount: number) => void;
  revertCartItems: (previousItems: CartItem[]) => void;
  
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartTotalItems: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    const token = localStorage.getItem("user_token");
    if (!token) return; 

    try {
      const res = await fetch(`${BASE_URL}/api/carts`, {
        headers: { Authorization: `Bearer ${token}`, "Accept": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        const cartsArray = data.data ? data.data : data;
        setCartItems(cartsArray || []);
      }
    } catch (error) {
      console.error("Gagal mengambil data keranjang:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchCart();
  }, []);

  // --- FUNGSI OPTIMISTIC ---
  const addCartItemOptimistically = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product_id === newItem.product_id && item.color === newItem.color
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += newItem.quantity;
        newItems[existingItemIndex].gross_amount += newItem.gross_amount;
        return newItems;
      } else {
        return [newItem, ...prev];
      }
    });
  };

  const removeCartItemOptimistically = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartItemQtyOptimistically = (itemId: number, newQty: number, newGrossAmount: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQty, gross_amount: newGrossAmount }
          : item
      )
    );
  };

  const revertCartItems = (previousItems: CartItem[]) => {
    setCartItems(previousItems);
  };
  // ------------------------------

  const cartTotalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.gross_amount,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addCartItemOptimistically, 
        removeCartItemOptimistically, // Baru
        updateCartItemQtyOptimistically, // Baru
        revertCartItems,           
        isCartOpen,
        setIsCartOpen,
        cartTotalItems,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus digunakan di dalam CartProvider");
  return context;
};