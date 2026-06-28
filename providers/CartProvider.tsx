import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";
import { Tables } from "@/database.types";

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<"products">, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size,
    );

    if (existingItem) {
      //   if already item is present in cart, then just increase the quantity
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newItem: CartItem = {
      id: randomUUID(),
      product,
      size,
      quantity: 1,
      product_id: product.id,
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  // update the product quantity in cart
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // to remove the item if quantity becomes 0

    setItems(updatedItems);
  };

  // get the total amount of items in the cart
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
