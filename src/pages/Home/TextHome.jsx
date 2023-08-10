import React from "react";
import { TextHomeContainer } from "./HomePageStyles";

export default function TextHome({ userName }) {
  return (
    <TextHomeContainer>
      <p>Olá, {userName}</p>
      <br />
      <span>O que você está procurando hoje?</span>
    </TextHomeContainer>
  );
}

