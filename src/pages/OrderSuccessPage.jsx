import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <Container>
      <BackgroundCircles>
        <CircleTopLeft />
        <CircleLeft />
        <CircleBottomRight />
      </BackgroundCircles>
      <Content>
        <CheckIcon name="checkmark-circle-sharp" />
        <FinalMessage>Compra concluída com sucesso!</FinalMessage>
        <Button onClick={handleBackToHome}>
          <AiOutlineHome size={24} />
          Voltar para a página inicial
        </Button>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CheckIcon = styled.div`
  font-size: 64px;
  color: #0acf83;
`;

const FinalMessage = styled.p`
  font-family: "Montserrat";
  font-size: 24px;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

const Button = styled.button`
  background-color:  #D58CE5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background-color:  #D58CE5;
  }
`;

const BackgroundCircles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const Circle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ebbfe5, #f7c0c2);
`;

const CircleTopLeft = styled(Circle)`
  top: -200px;
  left: -200px;
`;

const CircleLeft = styled(Circle)`
  top: 350px;
  left: -200px;
`;

const CircleBottomRight = styled(Circle)`
  bottom: 100px;
  right: -200px;
`;
