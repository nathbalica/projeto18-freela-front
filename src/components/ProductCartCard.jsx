import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import apis from "../services/apis";
import AuthContext from "../contexts/AuthContext";
import apiCart from "../services/apiCart";
import CartContext from "../contexts/CartContext";

export default function ProductCartCard(props) {
    const {_id, name, price, image} = props.produto;
    const {cartItens, setCartItens} = useContext(CartContext);
    const {userAuth} = useContext(AuthContext);

    async function removeItem() {
        try {
            const response = await apis.getSession(userAuth.token);
            const { userId } = response.data;

            await apiCart.removeOne(userId, _id);
            
            // remove apenas um produto do selecionado id:
            const cartItensCpy = [...cartItens];
            let splitIndex = -1;
            cartItens.forEach((index, i) => {
                if (i._id === _id) splitIndex = index;
                return;
            });
            cartItensCpy.splice(splitIndex, 1);
            setCartItens(cartItensCpy);

            alert("Removido com sucesso!");
        } catch(err) {
            alert("Erro ao remover item!");
        }
    }
    
    return (
        <ProductCard>
            <div>
                <img src={image} />
                <InformationContainer>
                    <span>{name}</span>
                    <span>{`R$ ${price.toFixed(2).replace(".", ",")}`}</span>
                </InformationContainer>
            </div>
            <ion-icon onClick={removeItem} name="trash-outline"></ion-icon>
        </ProductCard>
    );
}

const ProductCard = styled.div`
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    height: 137px;
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 133px;
        height: 137px;
        border-radius: 20px;
    }
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ion-icon {
        width: 20px;
        height: 20px;
    }
`;

const InformationContainer = styled.div`
    width: 160px;
    display: flex;
    height: 100px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div {
        width: 110px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
            width: 20px;
            height: 20px;
            border: 1px solid #7D7463;
            padding: 4px;
            border-radius: 10px;
            color: #000;
            font-size: 24px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    > span {
        color: #000;

        :nth-child(1) {
            text-align: center;
            font-size: 20px;
            font-weight: lighter;
        }
        :nth-child(2) {
            font-size: 18px;
            font-weight: bold;
        }
    }
`;