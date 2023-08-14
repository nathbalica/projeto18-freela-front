import React from "react";
import styled from "styled-components";

export default function TextHome({ userName }) {
  return (
    <TextHomeContainer>

      <span>Qual Miaudelo você está procurando hoje?</span>
    </TextHomeContainer>
  );
}

export const TextHomeContainer = styled.div`
  color: #868686;
  text-align: center;
  font-style: normal;
  line-height: normal;
  padding: 15px;

  p {
    font-size: 20px;
    font-weight: 500;
  }

  span {
    font-size: 23px;
    font-weight: bold;
  }
`;

