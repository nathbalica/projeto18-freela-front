import React, { useContext } from "react";
import styled from "styled-components";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BiSolidCat } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import useCart from "../../hooks/Cart";

export default function Footer() {
  const location = useLocation();
  const { cartItems } = useCart(); // Get cartItems from the context

  return (
    <FooterContainer cartItemCount={cartItems.length}>
      <FooterIcon to="/home" active={(location.pathname === "/home").toString()}>
        <AiOutlineHome />
      </FooterIcon>
      <FooterIcon to="/my-kittens" active={(location.pathname === "/my-kittens").toString()}>
        <BiSolidCat />
      </FooterIcon>
      <FooterIcon to="/cart" active={(location.pathname === "/cart").toString()}>
        <AiOutlineShoppingCart />
        {cartItems.length > 0 && <CartItemCount>{cartItems.length}</CartItemCount>}
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
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

const FooterIcon = styled(Link)`
  color: ${props => (props.active === "true" ? "#BA68C8" : "#C4C4C4")};
  font-size: 24px;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s;

  &:hover {
    color: lightgray;
  }
`;

const CartItemCount = styled.span`
  position: absolute;
  top: 30px;
  right: 120px;
  background-color: #BA68C8;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;
