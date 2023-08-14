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
  border: 1px solid #E0E0E0;
  border-radius: 15px;
  padding: 15px;
  margin: 20px 10px;
  background: rgba(0, 0, 0, 0.37);

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
