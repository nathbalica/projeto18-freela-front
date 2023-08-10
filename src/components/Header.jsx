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
  justify-content: space-between;
  padding: 0 2px 5px 5px;
  margin-bottom: 15px;
  font-size: 26px;
  font-family: 'Montserrat', sans-serif;
  border: #292929;
  background-color: #038754;
  height: 50px;
  overflow: hidden;
`