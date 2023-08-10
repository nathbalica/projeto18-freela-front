import React from "react";
import styled from "styled-components";

export default function BrandOptions({ visible, handleSortOptionByBrand }) {
  return (
    visible && (
      <BrandOptionsContainer>
        <BrandOption onClick={() => handleSortOptionByBrand("Mostrar todas")}>
          Mostrar todas
        </BrandOption>
        <BrandOption onClick={() => handleSortOptionByBrand("Puma")}>
          Puma
        </BrandOption>
        <BrandOption onClick={() => handleSortOptionByBrand("Adidas")}>
          Adidas
        </BrandOption>
        <BrandOption onClick={() => handleSortOptionByBrand("Nike")}>
          Nike
        </BrandOption>
      </BrandOptionsContainer>
    )
  );
}



export const BrandOptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const BrandOption = styled.div`
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
`;



