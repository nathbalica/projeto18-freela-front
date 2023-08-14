import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io';
import apis from '../../services/apis';
import useAuth from '../../hooks/auth';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';


export default function MyKittensPage() {
  const [userKittens, setUserKittens] = useState([]);
  const { userAuth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserKittens();
  }, []);

  async function fetchUserKittens() {
    try {
      const response = await apis.getUserKittens(userAuth.token); // Replace with the actual API call
      setUserKittens(response.data.kittens);
    } catch (error) {
      console.error('Error fetching user\'s kittens:', error);
    }
  }

  return (
    <Container>
      <BackgroundCircles>
        <CircleTopLeft />
        <CircleLeft />
        <CircleBottomRight />
      </BackgroundCircles>
      <PageHeader>
        <BackButton to="/home">
          <IoIosArrowBack size={24} />
        </BackButton>
        <PageTitle>Meus Gatos</PageTitle>
        <AddButton to="/add-kitten">
          <IoIosAddCircleOutline size={32} />
        </AddButton>
      </PageHeader>
      <KittensList>
        {userKittens.map(kitten => (
          <KittenLink to={`/kitten/${kitten.id}/update`} key={kitten.id}>
            <KittenContainer>
              <KittenImage src={kitten.photo} alt={kitten.name} />
              <KittenName>{kitten.name}</KittenName>
              <KittenBreed>{kitten.breed}</KittenBreed>
            </KittenContainer>
          </KittenLink>
        ))}
      </KittensList>
      <BlurredBackground />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-width: 100%;
`;

const KittenLink = styled(Link)`
  text-decoration: none;
  color: inherit; // Inherit the color from the parent
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled(Link)`
  color:  #D58CE5;
  text-decoration: none;
  transition: color 0.3s;
  margin-left: 10px;
  &:hover {
    color: #555;
  }
`;

const PageTitle = styled.h2`
  font-size: 24px;
`;

const AddButton = styled(Link)`
  margin-left: 10px;
  color:  #D58CE5;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color:  #D58CE5;
  }
`;

const KittensList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 100px;
  padding: 20px; // Add padding to the list container
`;

const KittenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // Adjust the layout of the content
  justify-content: center;
  text-align: center;
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
      rgba(46, 45, 45, 0.4) 0%,
      rgba(134, 132, 132, 0.4) 100%
    );
    border-radius: 15%;
    z-index: -1;}
`;

const KittenImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15%;
  object-fit: cover;
`;

const KittenName = styled.h3`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px; // Add margin to separate from the breed
`;

const KittenBreed = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0; // Reset margin to remove default spacing
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

export const BlurredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px); /* Apply the blur effect */
  z-index: -2;
`;

