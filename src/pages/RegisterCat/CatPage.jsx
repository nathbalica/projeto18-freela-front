import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import apis from '../../services/apis';
import Footer from '../../components/Footer/Footer';
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';

export default function AddKittenPage() {
  const navigate = useNavigate(); 
  const [kittenInfo, setKittenInfo] = useState({
    name: '',
    photo: '',
    description: '',
    year_old: '',
    breed: '',
    weight: '',
    localization: '',
    price: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setKittenInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await apis.createKitten(kittenInfo);
      console.log('Kitten created:', response.data);

      // Reset form after submission
      setKittenInfo({
        name: '',
        photo: '',
        description: '',
        year_old: '',
        breed: '',
        weight: '',
        localization: '',
        price: ''
      });
    } catch (error) {
      console.error('Error creating kitten:', error);
    }
  };

  return (
    <Container>
      <PageHeader>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={24} />
        </BackButton>
        <PageTitle>Cadastre seu Miau</PageTitle>
      </PageHeader>
      <BackgroundCircles>
        <CircleTopLeft />
        <CircleLeft />
        <CircleBottomRight />
      </BackgroundCircles>

      <FormContainer>
        <BlurredBackground />
        <PerfilMiau>Perfil Miau</PerfilMiau>
        <Divider />
        <Form onSubmit={handleSubmit}>
          <LabelContainer>
            <Label>Nome:</Label>
            <Input
              type="text"
              name="name"
              value={kittenInfo.name}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Foto (link):</Label>
            <Input
              type="text"
              name="photo"
              value={kittenInfo.photo}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Descrição:</Label>
            <Input
              type="text"
              name="description"
              value={kittenInfo.description}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Idade:</Label>
            <Input
              type="text"
              name="year_old"
              value={kittenInfo.year_old}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Raça:</Label>
            <Input
              type="text"
              name="breed"
              value={kittenInfo.breed}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Peso:</Label>
            <Input
              type="number"
              name="weight"
              value={kittenInfo.weight}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Localização:</Label>
            <Input
              type="text"
              name="localization"
              value={kittenInfo.localization}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <LabelContainer>
            <Label>Preço:</Label>
            <Input
              type="number"
              name="price"
              value={kittenInfo.price}
              onChange={handleInputChange}
            />
          </LabelContainer>
          <SubmitButton type="submit">Adicionar Miau</SubmitButton>
        </Form>
      </FormContainer>
      <Footer />
    </Container>
  );
}

// Styled components and other code remain the same...

const PerfilMiau = styled.div`
  font-weight: 700;
  margin-bottom: 5px;


`


const AddButton = styled(Link)`
  margin-left: 10px;
  color:  #D58CE5;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color:  #D58CE5;
  }
`;

const Container = styled.div`
  padding: 20px 0;
  height: auto;
  
`;

const Divider = styled.hr`
  margin: 10px 0;
  border: 0;
  border-top: 1px solid #0f0f0f;
`;

const PageHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  margin: 0; 
`;

const BackButton = styled(Link)`
  color: #fff;
  background: #D58CE5;
  margin-left: 20px;
  margin-right: 20px;
  padding: 3px;
  display: flex;
  text-align: center;
  border-radius: 75%;

`;

const Form = styled.form`
  display: flex;

  max-width: 400px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 12px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 5px;
  width: 50%;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #D58CE5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #C66CD6;
  }
`;

const FormContainer = styled.div`
  border-radius: 20px;
  position: relative;
  max-width: 250px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(20px);
`;

const BlurredBackground = styled.div`
border-radius: 20px;
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
  z-index: -1;
  border-radius: 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjusted to evenly space label and input */
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
  opacity: 0.8;
  animation: animateCircle 10s linear infinite;
`;

const animateCircle = `
  @keyframes animateCircle {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    100% {
      transform: translate(100vw, 100vh);
      opacity: 1;
    }
  }
`;

export const CircleTopLeft = styled(Circle)`
  ${animateCircle}
  top: -200px;
  left: -200px;
`;

export const CircleLeft = styled(Circle)`
  ${animateCircle}
  top: 350px;
  left: -200px;
`;

export const CircleBottomRight = styled(Circle)`
  ${animateCircle}
  bottom: 100px;
  right: -200px;
`;









