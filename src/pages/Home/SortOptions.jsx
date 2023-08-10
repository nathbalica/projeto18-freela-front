import React from "react";
import styled from "styled-components";

export default function SortOptions({ visible, handleSortOption }) {
  return (
    visible && (
      <SortOptionsContainer>
        <SortOption onClick={() => handleSortOption("asc")}>
          Maior para menor
        </SortOption>
        <SortOption onClick={() => handleSortOption("desc")}>
          Menor para maior
        </SortOption>
      </SortOptionsContainer>
    )
  );
}



export const SortOptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 0;
`;

export const SortOption = styled.div`
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
`;



