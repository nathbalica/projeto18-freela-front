import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import apis from "../services/apis"; // Importe o arquivo onde as funções de API estão definidas
import useAuth from "../hooks/auth";

export default function SearchBar({ handleSearch, searchFilteredProducts }) {
  const [searchValue, setSearchValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);


  function handleInputChange(event) {
    const { value } = event.target;
    setSearchValue(value);


    if (value === "") {
      setSearchValue("");
      setSuggestions([]);
    }

  }

  function handleInputFocus() {
    setIsInputFocused(true);
  }

  function handleInputBlur() {
    setIsInputFocused(false);
  }

  useEffect(() => {
    if (searchValue.trim() !== "") {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  async function fetchSuggestions() {
    try {
      const response = await apis.getSuggestions(); // Chame a função de API apropriada para buscar as sugestões
      const data = response.data; // A resposta da API deve conter o campo "suggestions" com as sugestões de nomes de produtos
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  function handleSuggestionClick(suggestion) {
    setSearchValue(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);

  }


  function renderSuggestions() {
    if (!isInputFocused || suggestions.length === 0) {
      return null;
    }

    const filteredSuggestions = searchFilteredProducts.length > 0 ? searchFilteredProducts.map(product => product.name) : suggestions;

    return (
      <SuggestionsContainer>
        {filteredSuggestions.map((suggestion) => (
          <SuggestionItem 
          key={suggestion} 
          onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </SuggestionItem>
        ))}
      </SuggestionsContainer>
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch(searchValue); // Executa a pesquisa quando o usuário pressiona Enter
    }
  }

  function handleSearchButton() {
    handleSearch(searchValue); // Executa a pesquisa quando o usuário clica no botão de pesquisa
    setSuggestions([]);
  }

  return (
    <SearchBarContainer>
      {renderSuggestions()}
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Pesquisar..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />

        <SearchButton onClick={handleSearchButton}>
          <AiOutlineSearch />
        </SearchButton>

      </SearchInputContainer>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 15px;
  margin-bottom: 15px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  border-radius: 10px;
  border: 1px solid #bababa;
  flex: 1;
  outline: none;
  font-size: 16px;
  padding: 10px 10px;
  background-position: right 10px center;
  width: 100%;
`;

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #038754;
  color: #fff;
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 10px;
  font-size: 20px;
`;

const SuggestionsContainer = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 2;
`;

const SuggestionItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

`;


