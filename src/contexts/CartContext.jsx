import { createContext, useContext, useEffect, useState } from "react";
import apis from "../services/apis";
import useAuth from "../hooks/auth";

const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const { userAuth } = useAuth();
  
    // Add the addToCart function to the context
    const addToCart = (item) => {
      setCartItems((prevCartItems) => [...prevCartItems, item]);
    };
  
    useEffect(() => {
      async function fetchCart() {
        try {
          const cartResponse = await apis.createShoppingCart(userAuth.token);
          const cartId = cartResponse.shoppingCart.id;
          const cartItemsResponse = await apis.getCartItemsByCartId(
            userAuth.token,
            cartId
          );
          setCartItems(cartItemsResponse.data.cartItems);
        } catch (error) {
          console.log("Erro ao buscar o carrinho:", error);
        }
      }
      fetchCart();
    }, [userAuth.userId]);
  
    return (
      <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
        {children}
      </CartContext.Provider>
    );
  }

export default CartContext;
