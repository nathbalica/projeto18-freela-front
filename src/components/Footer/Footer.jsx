import React from "react";
import styled from "styled-components";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BiSolidCat } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <FooterContainer>
      <FooterIcon to="/home" active={(location.pathname === "/home").toString()}>
        <AiOutlineHome />
      </FooterIcon>
      <FooterIcon to="/pet" active={(location.pathname === "/pet").toString()}>
        <BiSolidCat />
      </FooterIcon>
      <FooterIcon to="/cart" active={(location.pathname === "/cart").toString()}> {/* Alterei o link para /cart */}
        <AiOutlineShoppingCart /> {/* Substituí o ícone do coração pelo ícone do carrinho */}
      </FooterIcon>
      <FooterIcon to="/user" active={(location.pathname === "/user").toString()}>
        <AiOutlineUser />
      </FooterIcon>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background-color: #fff;
  text-align: center;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1); /* Adicionei sombra para melhor visualização */
`;

const FooterIcon = styled(Link)`
color: ${props => (props.active === "true" ? "#BA68C8" : "#C4C4C4")}; // Alterado aqui
  font-size: 24px;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s;

  &:hover {
    color: lightgray;
  }
`;
