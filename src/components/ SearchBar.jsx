import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Pesquisar miaus..."
        value={searchValue}
        onChange={handleInputChange}
        // onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={handleSearchClick}>
        <BsSearch /> {/* Ícone de lupa */}
      </SearchButton>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 40px 10px 10px; /* Adicione espaço à direita para o botão */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: relative; /* Necessário para posicionar o ícone absoluto */
  background-image: linear-gradient(90deg, #CA82F8, #CA82F894);
`;

const SearchButton = styled.button`
  position: absolute;
  right: 60px;
  top: 217px;
  transform: translateY(-50%);
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 10px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #555;
  }

  svg {
    margin-right: 5px;
  }
`;
