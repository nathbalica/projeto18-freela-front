import { createContext, useContext, useEffect, useState } from "react";
import apiCart from "../services/apiCart";
import AuthContext from "./AuthContext";
import apis from "../services/apis";
import apiProduct from "../services/apiProduct";
import { useLocation } from "react-router-dom";

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartItens, setCartItens] = useState([]);
  const { userAuth } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCart() {

      try {
        const response = await apis.getSession(userAuth.token);
        const { userId } = response.data;

        const fetchCart = await apiCart.getCart(userId);
        const transformedProds = [];
        fetchCart.data.itens.forEach(id => {
            apiProduct.getProduct(id)
                .then(res => {
                    transformedProds.push(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        });
        
        setCartItens(transformedProds);

      } catch (err) {
        console.log(err);
      }
    }
    fetchCart();

  }, []);

  return (
    <CartContext.Provider value={{ cartItens, setCartItens }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;