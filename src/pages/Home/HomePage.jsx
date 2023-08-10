import React, { useRef } from "react";
import apis from "../../services/apis";
import useAuth from "../../hooks/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/ SearchBar"
import HomeStyle from "../../style/GlobalStyle";
import {
  HomeContainer,
  ProductsContainerWrapper,
  ProductsContainer,
  SneakerItem,
  SneakerImage,
  SneakerTitle,
  SneakerPrice,
  Sort,
  SortContainer,
  SortText,
  LoadMoreButton,
} from "./HomePageStyles";
import { BiDownArrow } from "react-icons/bi";
import Header from "../../components/Header/Header";
import TextHome from "./TextHome";
import SortOptions from "./SortOptions";
import BrandOptions from "./BrandOptions";

const perPage = 5;

export default function HomePage() {
  const [cartItems, setCartItems] = useState(0);
  const [products, setProducts] = useState(null);
  const [sortOptionsVisible, setSortOptionsVisible] = useState(false);
  const [sortBrandOptionsVisible, setSortBrandOptionsVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedProductsCount, setLoadedProductsCount] = useState(0);
  const [searchFilteredProducts, setSearchFilteredProducts] = useState([]);
  const { userAuth, login } = useAuth();
  const productsContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth?.token) {
      navigate("/");
    } else {
      handleGetProducts();
    }
  }, [userAuth?.token, navigate]);

  function handleGetProducts() {
    apis
      .getProducts(userAuth.token)
      .then((res) => {
        setProducts(res.data.products);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const toggleSortOptions = () => {
    setSortOptionsVisible((prevState) => !prevState);
  };

  const handleSortOption = (option) => {
    let sortedProducts = [...products];

    if (option === "desc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "asc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handleLoadLess = () => {
    setCurrentPage(1);
    setLoadedProductsCount(0);
    productsContainerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (selectedBrand === "") {
      setLoadedProductsCount(currentPage * perPage);
    } else {
      const filteredProducts = products.filter(
        (product) => product.brand === selectedBrand
      );

      const totalPages = Math.ceil(filteredProducts.length / perPage);
      console.log(totalPages)
      if (currentPage <= totalPages) {
        setLoadedProductsCount(currentPage * perPage);
      } else {
        setCurrentPage(1);
        setLoadedProductsCount(perPage);
        productsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }


    }

  }, [currentPage, products, selectedBrand]);


  const toggleSortBrandOptions = () => {
    setSortBrandOptionsVisible((prevState) => !prevState);
  };

  const handleSortOptionByBrand = (brand) => {
    if (brand === "Mostrar todas") {
      setSelectedBrand("");
    } else {
      const filteredProducts = products.filter(
        (product) => product.brand === brand
      );
      setSelectedBrand(brand);
      setLoadedProductsCount(filteredProducts.length);
    }
    setSortBrandOptionsVisible(false);
  };


  const handleSearch = (searchValue) => {
    if (searchValue) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchFilteredProducts(filteredProducts);
    } else {
      setSearchFilteredProducts([]);
    }
  };


  if (!userAuth) {
    return null;
  }
  if (!Array.isArray(products)) {
    return <h1>Carregando...</h1>;
  }
  if (products.length === 0) {
    return <h1>Nenhum produto disponível</h1>;
  }

  const navigateToCheckout = () => {
    navigate("/meu-carrinho");
  };

  return (
    <HomeContainer>
      <HomeStyle />
      <Header cartItems={cartItems} navigateToCheckout={navigateToCheckout}
      />
      <TextHome userName={userAuth.userName} />
      <SearchBar
        handleSearch={handleSearch}
        searchFilteredProducts={searchFilteredProducts}
      />
      <ProductsContainerWrapper>
        <ProductsContainer ref={productsContainerRef}>
          <Sort>
            <SortContainer onClick={toggleSortOptions}>
              <SortText>Ordenar por preço</SortText>
              {sortOptionsVisible ? <BiDownArrow /> : <BiDownArrow />}
              <SortOptions
                visible={sortOptionsVisible}
                handleSortOption={handleSortOption}
              />
            </SortContainer>
            <SortContainer onClick={toggleSortBrandOptions}>
              <SortText>Filtrar por marca</SortText>
              {sortBrandOptionsVisible ? <BiDownArrow /> : <BiDownArrow />}
              <BrandOptions
                visible={sortBrandOptionsVisible}
                handleSortOptionByBrand={handleSortOptionByBrand}
              />
            </SortContainer>
          </Sort>
          <div>

            {(searchFilteredProducts.length > 0
              ? searchFilteredProducts
              : products.filter(
                (product) => selectedBrand === "" || product.brand === selectedBrand
              )
            )
              .slice(0, currentPage * perPage)
              .map((product) => (
                <SneakerItem
                  key={product._id}
                  onClick={() => navigate(`/produto/${product._id}`)}
                >
                  <SneakerImage src={product.image} alt={product.title} />
                  <SneakerTitle>{product.name}</SneakerTitle>
                  <SneakerPrice>${product.price}</SneakerPrice>
                </SneakerItem>
              ))}
            : {products
              .filter(
                (product) => selectedBrand === "" || product.brand === selectedBrand
              )
              .slice(0, currentPage * perPage)
              .map((product) => (
                <SneakerItem
                  key={product._id}
                  onClick={() => navigate(`/produto/${product._id}`)}
                >
                  <SneakerImage src={product.image} alt={product.title} />
                  <SneakerTitle>{product.name}</SneakerTitle>
                  <SneakerPrice>${product.price}</SneakerPrice>
                </SneakerItem>
              ))}
            {/* {products
              .filter(
                (product) => selectedBrand === "" || product.brand === selectedBrand
              )
              .slice(0, currentPage * perPage)
              .map((product) => (
                <SneakerItem key={product._id}>
                  <SneakerImage src={product.image} alt={product.title} />
                  <SneakerTitle>{product.name}</SneakerTitle>
                  <SneakerPrice>${product.price}</SneakerPrice>
                </SneakerItem>
              ))} */}
          </div>
          {selectedBrand === "" ? (
            <>
              {currentPage * perPage < products.length && (
                <LoadMoreButton onClick={handleLoadMore}>
                  Carregar mais
                </LoadMoreButton>
              )}

              {currentPage * perPage >= products.length && (
                <LoadMoreButton onClick={handleLoadLess}>
                  Carregar menos
                </LoadMoreButton>
              )}
            </>
          ) : (<>

            {currentPage * perPage < products.filter((product) => product.brand === selectedBrand).length && (
              console.log('entrou'),
              console.log('quantidade de produtos:' + products),
              <LoadMoreButton onClick={handleLoadMore}>
                Carregar mais
              </LoadMoreButton>
            )}

            {currentPage * perPage >= products.filter((product) => product.brand === selectedBrand).length && (
              <LoadMoreButton onClick={handleLoadLess}>
                Carregar menos
              </LoadMoreButton>
            )}
          </>)}



        </ProductsContainer>
      </ProductsContainerWrapper>
    </HomeContainer>
  );
}


