import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdLocationOn } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../../hooks/Cart";
import {
  KittenDetailsContainer,
  KittenImage,
  KittenInfo,
  KittenName,
  KittenDescription,
  KittenPrice,
  KittenInfoRow,
  KittenInfoItem,
  BackgroundCircles,
  Circle,
  CircleTopLeft,
  CircleBottomRight,
  OwnerContactInfo,
  AddToCartButton,
  BackButtonContainer,
  BackButtonCircle

} from "./styles";
import apis from "../../services/apis";
import useAuth from "../../hooks/auth";
import { Link, useLocation } from "react-router-dom";



export default function KittenDetails() {
  const { id } = useParams();
  const { userAuth } = useAuth();
  const navigate = useNavigate();

  const [kitten, setKitten] = useState(null);
  const { cartItems, addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      const cartResponse = await apis.createShoppingCart(userAuth.token);
      const cartId = cartResponse.shoppingCart.id;
  
      try {
        await apis.createCartItem(userAuth.token, { cartId, kittenId: id });
        addToCart(kitten);
        navigate("/cart");
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.message === "O item já foi adicionado ao carrinho.") {
          console.log("Item already exists in the cart");
          // Display a message to the user indicating that the item is already in the cart
          alert("Este item já foi adicionado ao carrinho.");
        } else {
          console.error("Error adding item to cart:", error);
        }
      }
    } catch (error) {
      console.error("Error creating shopping cart:", error);
    }
  };

  useEffect(() => {
    apis.getKitten(userAuth.token, id)
      .then(response => {
        setKitten(response.data.kitten);
      })
      .catch(error => {
        console.error("Error fetching kitten details:", error);
      });
  }, [userAuth.token, id]);

  // const handleAddToCart = () => {
  //   // Implement your add to cart logic here
  //   console.log("Added to cart:", kitten.name);
  // };

  if (!kitten) {
    return <div>Loading...</div>;
  }


  return (

    <KittenDetailsContainer>
      <BackgroundCircles>
        <CircleTopLeft />
        <CircleBottomRight />
      </BackgroundCircles>

      <BackButtonContainer onClick={() => navigate(-1)}>
        <BackButtonCircle>
          <IoIosArrowBack color="white" size={24} />
        </BackButtonCircle>
      </BackButtonContainer>

      <CartIcon to="/cart">
        <AiOutlineShoppingCart />
        <CartCount>{cartItems.length}</CartCount> {/* Substitua "2" pelo valor correto do contador de carrinho */}
      </CartIcon>

      <KittenImage src={kitten.photo} alt={kitten.name} />
      <KittenInfo>
        <KittenName>{kitten.name}</KittenName>

        <KittenInfoRow>
          <KittenInfoItem withBackground withMarginLeft>
            <strong></strong> {kitten.weight} kg
          </KittenInfoItem>
          <KittenInfoItem withBackground withMarginLeft>
            <strong></strong> {kitten.breed}
          </KittenInfoItem>
          <KittenInfoItem withBackground withMarginLeft>
            <strong>{kitten.year_old} years</strong>
          </KittenInfoItem>
        </KittenInfoRow>

        <KittenInfoRow>
          <KittenInfoItem withMarginLeft>
            <MdLocationOn color="#086e08" fontSize="20px" /> {kitten.localization}
          </KittenInfoItem>
        </KittenInfoRow>

        <OwnerContactInfo>
          <h4>Contato do Dono</h4>
          <p>Telefone: {kitten.phone}</p>
          <p>Email: {kitten.email}</p>
        </OwnerContactInfo>

        <KittenDescription><h3>Sobre</h3> <br /> {kitten.description}</KittenDescription>
        <KittenPrice>R${kitten.price}</KittenPrice>

      </KittenInfo>
      <AddToCartButton onClick={handleAddToCart}>Adicionar ao Carrinho</AddToCartButton>
    </KittenDetailsContainer>

  );
}

const CartIcon = styled(Link)`
  position: absolute;
  top: 0px;
  right: 30px;
  color: #C4C4C4; 
  font-size: 30px;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s;

  &:hover {
    color: lightgray;
  }
`;


const CartCount = styled.span`
  position: absolute;
  top: 25px; /* Ajuste a posição vertical */
  right: -10px; /* Ajuste a posição horizontal para mover o contador para a direita */
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px;
  font-size: 12px;
`;






