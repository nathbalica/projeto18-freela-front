import React from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import useAuth from "../../hooks/auth";
import MyWalletLogo from "../MyWalletLogo";
import SearchBar from "../ SearchBar";
import TextHome from "../../pages/Home/TextHome";

export default function Header() {
  const { userAuth, login } = useAuth();

  return (
    <HeaderContainer>
      <MyWalletLogoContainer>
        <MyWalletLogo />
      </MyWalletLogoContainer>
      <IconContainer>
        <FaBars color="#CD89F8" />
      </IconContainer>
      <TextHome />
      <SearchBar />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  background-color: #fff;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  padding-top: 20px;
  top: 0;
  width: 100%;

`;

const MyWalletLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 20px;
  margin-top: 10px;
`;




