import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartCount, CartIcon } from "./Header/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";

export default function Header() {
    const navigate = useNavigate();
    const {cartItens} = useContext(CartContext);

    return (
        <StyledHeader>
            <ion-icon onClick={() => navigate(-1)} name="chevron-back-outline"></ion-icon>
            <CartIcon onClick={() => navigate("/meu-carrinho")}>
                <AiOutlineShoppingCart />
                {cartItens && <CartCount>{cartItens.length}</CartCount>}
            </CartIcon>
        </StyledHeader>
    );
}

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 150px;
  background-color: #F6F6F6;
  border: none;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
background: linear-gradient(135deg, white, #FFC0CB); 
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #333333;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  height: 50px;

`