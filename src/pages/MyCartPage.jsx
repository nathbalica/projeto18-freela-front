import styled from "styled-components";
import { StyledHeader } from "../components/Header";
import { StyledButton } from "../components/StyledButton";
import ProductCard from "../components/ProductCard";
import ProductCartCard from "../components/ProductCartCard";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import apis from "../services/apis";
import apiCart from "../services/apiCart";
import apiProduct from "../services/apiProduct";
import CartContext from "../contexts/CartContext";

export default function MyCart() {
    const navigate = useNavigate();
    const {setCartItens, cartItens} = useContext(CartContext);
    const {userAuth} = useContext(AuthContext);

    function calculaTotal() {
        let total = 0;
        cartItens.forEach(p => total += p.price);

        return total;
    }

    async function esvaziarCarrinho() {
        try {
            const response = await apis.getSession(userAuth.token);
            const { userId } = response.data;
            await apiCart.removeAll(userId);

            setCartItens([]);
            alert("O carrinho foi esvaziado com sucesso.");

        } catch(err) {
            alert("Erro ao esvaziar o carrinho.");
        }
    }

    return (
        <>
            <StyledHeader>
                <ion-icon onClick={() => navigate("/home")} name="chevron-back-outline"></ion-icon>
                <span>Carrinho de compras</span>
                <ion-icon onClick={esvaziarCarrinho} name="trash-outline"></ion-icon>
            </StyledHeader>
            <PageContainer>
                {cartItens && cartItens.map((p, index) => <ProductCartCard key={`${p._id}-${index}`} produto={p}/>)}
            </PageContainer>
            <AmountContainer>
                <div>
                    <span>Total: {cartItens.length} {(cartItens.length < 2) ? "item" : "itens"}</span>
                    <span>R$ {calculaTotal().toFixed(2).replace(".", ",")}</span>
                </div>
                <StyledButton
                    onClick={() => navigate("/checkout")}
                    disabled={cartItens.length === 0}
                    width="340px">Fechar Pedido<ion-icon name="chevron-forward-outline"></ion-icon>
                </StyledButton>
            </AmountContainer>
        </>
    );
}

const PageContainer = styled.div`
    padding: 0px 15px;
    margin-bottom: 174px;
`;

const AmountContainer = styled.div`
    position: fixed;
    z-index: 2;
    bottom: 0;
    width: 100%;
    height: 150px;
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
`;