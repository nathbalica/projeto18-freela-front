import React from "react";
import styled from "styled-components";

export default function CheckoutItem(props) {
  const { name, price } = props;

  return (
    <SCItemBox>
      <div>
        <SCItemName>{name}</SCItemName>
        <SCItemPrice>R$ {price.toFixed(2)}</SCItemPrice>
      </div>
    </SCItemBox>
  );
}

const SCItemBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  /* gap: 15px; */
  margin-bottom: 20px;

  img {
    width: 85px;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      font-family: 'Montserrat';
    }
  }
`;

const SCItemName = styled.p`
  color: #000;
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 700;
`;

const SCItemPrice = styled.p`
  font-weight: 500;
`;