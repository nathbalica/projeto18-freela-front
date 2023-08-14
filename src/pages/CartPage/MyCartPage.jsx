import styled from "styled-components";
import { StyledHeader } from "../../components/Header";
import { StyledButton } from "../../components/StyledButton";
import ProductCard from "./KittenCard"; // Importando o componente ProductCard
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/Cart"; // Importando o hook useCart
import useAuth from "../../hooks/auth";
import apis from "../../services/apis"; // Importando o objeto 'apis'
import { useState, useEffect } from "react";

export default function MyCart() {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useCart(); // Obtendo a função setCartItems
    const { userAuth } = useAuth();
    const [updateKey, setUpdateKey] = useState(0);

    function calculaTotal() {
        let total = 0;
        cartItems.forEach(p => total += p.price);
        return total;
    }

    async function removeFromCart(itemId) {
        try {
            const response = await apis.deleteCartItem(userAuth.token, itemId);
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems);
            }
        catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }

    const uniqueCartItems = Array.from(new Set(cartItems.map(item => item.id)))
        .map(id => cartItems.find(item => item.id === id));

    return (
        <>
            <StyledHeader>
                <ion-icon onClick={() => navigate("/home")} name="chevron-back-outline"></ion-icon>
                <span>Carrinho</span>
            </StyledHeader>
            <BackgroundCircles>
                <CircleTopLeft />
                <CircleLeft />
                <CircleBottomRight />
            </BackgroundCircles>
            <PageContainer>
                {uniqueCartItems.map((p) => (
                    <ProductCard key={p.id} product={p}>
                        <StyledButton onClick={() => removeFromCart(p.id)}>Remover</StyledButton>
                    </ProductCard>
                ))}
            </PageContainer>
            <AmountContainer>
                <div>
                    <span>Total: {cartItems.length} {(cartItems.length < 2) ? "item" : "itens"}</span>
                    <span>R$ {calculaTotal().toFixed(2).replace(".", ",")}</span>
                </div>
                <StyledButton
                    onClick={() => navigate("/checkout")}
                    disabled={cartItems.length === 0}
                    width="340px">
                    Fechar Pedido<ion-icon name="chevron-forward-outline"></ion-icon>
                </StyledButton>
            </AmountContainer>
        </>
    );
}

const PageContainer = styled.div`
    padding: 0px 15px;
    margin-bottom: 174px;
    margin-top: 80px;
`;

const AmountContainer = styled.div`
    position: fixed;
    z-index: 2;
    bottom: 0;
    width: 100%;
    height: 130px;
    background-color: #F6F6F6;
    border: 1px solid #F6F6F6;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    font-family: 'Montserrat', sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        width: 340px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            :nth-child(1) {
                color: #7D7463;
                font-size: 12px;
                font-weight: bold;
            }
            :nth-child(2) {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
`

export const BackgroundCircles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

export const Circle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EBBFE5, #F7C0C2);
`;

export const CircleTopLeft = styled(Circle)`
  top: -200px;
  left: -200px;
`;

export const CircleLeft = styled(Circle)`
  top: 350px;
  left: -200px;
`;

export const CircleBottomRight = styled(Circle)`
  bottom: 100px;
  right: -200px;
`;
