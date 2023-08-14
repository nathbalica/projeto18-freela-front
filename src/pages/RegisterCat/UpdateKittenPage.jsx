import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import apis from '../../services/apis';
import Footer from '../../components/Footer/Footer';
import useAuth from '../../hooks/auth';

export default function UpdateKittenPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userAuth } = useAuth();
  const [kittenInfo, setKittenInfo] = useState(null); // Initialize as null
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchKittenDetails();
  }, []);


  async function fetchKittenDetails() {
    try {
      const response = await apis.getKitten(userAuth.token, id);
      setKittenInfo(response.data.kitten);
    } catch (error) {
      console.error('Error fetching kitten details:', error);
    }
  }

  const handleEditClick = () => {
    setEditing(!editing); // Toggle the editing state
  };


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
      const response = await apis.updateKitten(userAuth.token, id, kittenInfo);
      console.log('Kitten updated:', response.data);
      setKittenInfo(response.data.kitten);
      setEditing(false);
      fetchKittenDetails()
    } catch (error) {
      console.error('Error updating kitten:', error);
    }
  };

  function insertLineBreaks(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    const words = text.split(' ');
    let newText = '';
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += word + ' ';
      } else {
        newText += currentLine + '\n';
        currentLine = word + ' ';
      }
    }

    return newText + currentLine;
  }
  const maxLengthForDescription = 20;

  const extractFileName = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  };

  return (
    <Container>
      <BackgroundCircles>
        <CircleTopLeft />
        <CircleLeft />
        <CircleBottomRight />
      </BackgroundCircles>
      <PageHeader>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={24} />
        </BackButton>
        <PageTitle>Perfil do Miau</PageTitle>
      </PageHeader>
      <FormContainer>
        <BlurredBackground />
        <PerfilMiau>Perfil Miau</PerfilMiau>
        <Divider />
        <Form onSubmit={handleSubmit}>
          {kittenInfo ? (
            <>
              <LabelContainer>
                <Label>Nome:</Label>
                {editing ? (
                  <Input
                    type="text"
                    name="name"
                    value={kittenInfo.name}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.name}</ReadOnlyText>
                )}
              </LabelContainer>

              <LabelContainer>
                <Label>URL</Label>
                {editing ? (
                  <Input
                    type="url"
                    name="photo"
                    value={kittenInfo.photo}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{insertLineBreaks(extractFileName(kittenInfo.photo, maxLengthForDescription))}</ReadOnlyText>
                )}
              </LabelContainer>

              <LabelContainer>
                <Label>Raça:</Label>
                {editing ? (
                  <Input
                    type="text"
                    name="breed"
                    value={kittenInfo.breed}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.breed}</ReadOnlyText>
                )}
              </LabelContainer>
              <LabelContainer>
                <Label>Descrição:</Label>
                {editing ? (
                  <Input
                    type="text"
                    name="description"
                    value={kittenInfo.description}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{insertLineBreaks(kittenInfo.description, maxLengthForDescription)}</ReadOnlyText>

                )}
              </LabelContainer>
              <LabelContainer>
                <Label>Email:</Label>
                {editing ? (
                  <Input
                    type="email"
                    name="email"
                    value={kittenInfo.email}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.email}</ReadOnlyText>
                )}
              </LabelContainer>
              <LabelContainer>
                <Label>Localização:</Label>
                {editing ? (
                  <Input
                    type="text"
                    name="localization"
                    value={kittenInfo.localization}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.localization}</ReadOnlyText>
                )}
              </LabelContainer>
              <LabelContainer>
                <Label>Telefone:</Label>
                {editing ? (
                  <Input
                    type="tel"
                    name="phone"
                    value={kittenInfo.phone}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.phone}</ReadOnlyText>
                )}
              </LabelContainer>
              <LabelContainer>
                <Label>Peso:</Label>
                {editing ? (
                  <Input
                    type="number"
                    step="0.01"
                    name="weight"
                    value={kittenInfo.weight}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.weight}kg</ReadOnlyText>
                )}
              </LabelContainer>
              <LabelContainer>
                <Label>Idade:</Label>
                {editing ? (
                  <Input
                    type="number"
                    name="year_old"
                    value={kittenInfo.year_old}
                    onChange={handleInputChange}
                    readOnly={!editing}
                  />
                ) : (
                  <ReadOnlyText>{kittenInfo.year_old} anos</ReadOnlyText>
                )}
              </LabelContainer>
              {/* Continue adicionando os campos restantes aqui */}
              {editing ? (
                <>
                  <EditButton type="submit">Salvar</EditButton>
                </>
              ) : (
                <EditButton onClick={handleEditClick}>Editar</EditButton>
              )}
            </>
          ) : (
            <LoadingText>Carregando informações...</LoadingText>
          )}
        </Form>
      </FormContainer>
      <Footer />
    </Container>
  );
}

// const LabelContainer = styled.div`
//   display: flex;
//   flex-direction: column; /* Ajusta o layout para exibir os campos um abaixo do outro */
//   margin-bottom: 10px; /* Adiciona um espaço entre os campos */
// `;

const Input = styled.input`
  padding: 5px;
  width: 100%; /* Preenche a largura disponível */
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ReadOnlyText = styled.p`
    font-size: 12px;
    margin: 5px 0;
    white-space: pre-line;
`;

const EditButton = styled.button`
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

const LoadingText = styled.p`
    font-size: 16px;
    margin: 20px 0;
`;

const PerfilMiau = styled.div`
  font-weight: 700;
  margin-bottom: 5px;
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

const BackButton = styled.button`
  color: #fff;
  background: #D58CE5;
  margin-left: 20px;
  margin-right: 20px;
  padding: 3px;
  display: flex;
  text-align: center;
  border: none;
  border-radius: 75%;
  cursor: pointer;
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

// const Input = styled.input`
//   padding: 5px;
//   width: 50%;
//   height: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
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

const CircleTopLeft = styled(Circle)`
  ${animateCircle}
  top: -200px;
  left: -200px;
`;

const CircleLeft = styled(Circle)`
  ${animateCircle}
  top: 350px;
  left: -200px;
`;

const CircleBottomRight = styled(Circle)`
  ${animateCircle}
  bottom: 100px;
  right: -200px;
`;

// const EditButton = styled.button`
//   margin-top: 20px;
//   padding: 10px;
//   background-color: #D58CE5;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   &:hover {
//     background-color: #C66CD6;
//   }
// `;

// const LoadingText = styled.p`
//   font-size: 16px;
//   margin: 20px 0;
// `;

