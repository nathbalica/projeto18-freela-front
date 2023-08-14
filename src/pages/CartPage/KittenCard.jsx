import React from "react";
import styled from "styled-components";

const ProductCard = (props) => {
  const { name, price} = props.product;

  return (
    <StyledContainer>
      <ProductName>{name}</ProductName>
      <ProductInfo>
        <ProductPrice>R$ {price.toFixed(2).replace(".", ",")}</ProductPrice>
        {props.children} {/* Inserindo o botão de remoção */}
      </ProductInfo>
    </StyledContainer>
  );
};



const StyledContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 10px;
  background: rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(20px);

  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.4) 100%
    );
    border-radius: 15px;
    z-index: -1;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const ProductPrice = styled.span`
  font-size: 16px;
`;

export default ProductCard;
