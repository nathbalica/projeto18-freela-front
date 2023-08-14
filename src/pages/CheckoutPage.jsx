import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apis from "../services/apis";
import useAuth from "../hooks/auth";
import useCart from "../hooks/Cart";
import CheckoutItem from "../components/CheckoutItem";
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { BackButtonCircle } from "./KittenDetails/styles";

export default function CheckoutPage() {
    const { userAuth } = useAuth();
    const { cartItems, clearCart } = useCart()
    const navigate = useNavigate();

    const [finish, setFinish] = useState(false);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState(cartItems);

    useEffect(() => {
        const totalAmount = cartItems.reduce(
            (accumulator, item) => accumulator + item.price,
            0
        );
        setTotal(totalAmount);
    }, [cartItems]);

    
    const finishPurchase = async () => {
      try {
        const createOrderResponse = await apis.createOrder(userAuth.token);
        const cartId = createOrderResponse.cartId;
        
        await apis.deleteCartItemsByCartId(userAuth.token, cartId);
        setFinish(true);
        navigate("/order-success");
      } catch (error) {
        console.log("Error completing purchase", error);
      }
    };

    const handleBackToCart = () => {
        navigate("/cart");
    };

    const handleBackToHome = () => {
        navigate("/home");
    };

    return (
        <>
            <BackgroundCircles>
                <CircleTopLeft />
                <CircleLeft />
                <CircleBottomRight />
            </BackgroundCircles>
            <Header>
            <BackButtonContainer>
                <BackButtonCircle onClick={handleBackToCart}>
                    <IoIosArrowBack color="white" size={24} />
                </BackButtonCircle>
            </BackButtonContainer>
                <HeaderText>Checkout</HeaderText>
                <HomeButton name="home-outline" onClick={handleBackToHome} />
            </Header>
            {finish ? (
                <>
                    <FinalMessage>Compra concluída</FinalMessage>
                    <CheckIcon name="checkmark-circle-sharp" />
                    <Infos>
                        <Info>
                            Nome: <span>{userAuth.userName}</span>
                        </Info>
                        <Info>
                            Endereço de entrega: <span>{address}</span>
                        </Info>
                        <Info>
                            Total: <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                        </Info>
                    </Infos>
                    <ButtonContainer>
                        <Button onClick={() => navigate("/home")}>Continuar comprando</Button>
                    </ButtonContainer>
                </>
            ) : (
                <>
                    <ContainerOrders>
                        <TextContainer>
                            {items.map((item) => (
                                <CheckoutItem
                                    key={item.id}
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                />

                            ))}
                        </TextContainer>
                    </ContainerOrders>
                    <Total>
                        <p>Total:</p>
                        <p>R$ {total.toFixed(2).replace(".", ",")}</p>
                    </Total>
                    <ButtonContainer>
                        <Button onClick={finishPurchase}>Concluir Compra</Button>
                    </ButtonContainer>

                </>
            )}
        </>
    );
}

const BackButtonContainer = styled.div `
    margin-left: 20px;
`

const ContainerOrders = styled.div`
  padding: 20px;
  margin: 20px;
  background: rgba(0, 0, 0, 0.37);
  border-radius: 40px;
  backdrop-filter: blur(20px);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.4) 100%
    );
    border-radius: 40px;
    z-index: -1;
  }
    
    
`

const TextContainer = styled.div`
  position: relative;
  z-index: 1;
`;


const Header = styled.div`
  width: 100%;
  height: 55px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackgroundCircles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

export const Circle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EBBFE5, #F7C0C2);
`;

export const CircleTopLeft = styled(Circle)`
  top: -200px;
  left: -200px;
`;

export const CircleLeft = styled(Circle)`
  top: 350px;
  left: -200px;
`;

export const CircleBottomRight = styled(Circle)`
  bottom: 100px;
  right: -200px;
`;




// ... Previous code ...

const BackButton = styled(IoIosArrowBack)`
  width: 30px;
  height: 30px;
  margin-left: 15px;
  cursor: pointer;
  color: #D58CE5;
`;

const HomeButton = styled(AiOutlineHome)`
  margin-right: 15px;
  font-size: 30px;
  cursor: pointer;
  color: #D58CE5;
`;

const HeaderText = styled.p`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 18px;
`;

const InputAddress = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 50px 0;

  input {
    height: 100%;
    width: 300px;
    border: 1px solid #DBDBDB;
    border-radius: 10px;
    padding: 0 20px 0 0;
    font-size: 16px;
    padding-left: 16px;
    font-family: 'Montserrat';

    &::placeholder {
      font-size: 12px;
    }
  }
`;

const Total = styled.div`
  width: 300px;
  height: 35px;
  margin: 50px auto 25px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-family: 'Montserrat';
    font-weight: 700;
    font-size: 18px;
  }
`;

const ButtonContainer = styled.div`
  width: 280px;
  height: auto;
  margin: 0 auto;


  button {
    width: 100%;
    height: 55px;
    background-color:  #D58CE5;
    border: none;
    border-radius: 7px;
    font-family: 'Montserrat';
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 55px;
  background-color: #0acf83;
  border: 1px solid #0acf83;
  border-radius: 7px;
  font-family: "Montserrat";
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`;

const FinalMessage = styled.p`
  width: 240px;
  height: 100px;
  margin: 60px auto 10px auto;
  font-family: 'Montserrat';
  font-size: 34px;
  font-weight: 300;
  text-align: center;
  line-height: 42px;
`;

const CheckIcon = styled.div`
  width: 90px;
  height: auto;
  margin: 0 auto;
  color: #0ACF83;
`;

const Infos = styled.div`
  width: 320px;
  height: auto;
  margin: 30px auto 40px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  p {
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
  }

  span {
    font-weight: 500;
  }
`;

const Info = styled.p`
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  span {
    font-weight: 500;
  }
`;

// Rest of your code ...
