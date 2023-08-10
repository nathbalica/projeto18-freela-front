import Header from "../components/Header/Header";
import ProductCard from "../components/ProductCard";
import ProductDescription from "../components/ProductDescription";
import SizesBar from "../components/SizesBar";
import styled from "styled-components";
import { StyledButton } from "../components/StyledButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import apiProduct from "../services/apiProduct";
import AuthContext from "../contexts/AuthContext";
import apis from "../services/apis";
import apiCart from "../services/apiCart";
import CartContext from "../contexts/CartContext";


export default function ProductPage() {
    const id = useLocation().pathname.split("/").pop();
    const [produto, setProduto] = useState(undefined);
    const [selectedSize, setSelectedSize] = useState(-1);
    const { userAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { cartItens, setCartItens } = useContext(CartContext);

    async function addProductCart() {

        try {
            const response = await apis.getSession(userAuth.token);
            const { userId } = response.data

            await apiCart.addProductIntoCart(userId, produto._id);
            setCartItens([...cartItens, produto]);
            alert("Produto adicionado ao carrinho!");
            navigate("/home");

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        apiProduct.getProduct(id)
            .then((res) => {
                setProduto(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!produto) return (
        <PageContainer>
            Carregando...
        </PageContainer>
    );

    return (
        <>
            <Header />
            <PageContainer>
                <ProductCard produto={produto} />
                <SizesBar
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    sizes={produto.size} />
                <ProductDescription descricao={produto.description} />
                <StyledButton
                    onClick={addProductCart}
                    disabled={(selectedSize === -1)}
                    width="217px">Adicionar ao carrinho</StyledButton>
            </PageContainer>
        </>
    );
}

const PageContainer = styled.div`
    padding: 0px 15px;
`;