import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function KittenContainer({ kitten }) {
    const navigate = useNavigate();
    const handleKittenClick = () => {
        navigate(`/kitten/${kitten.id}`);
    };
    
    return (
        <Container onClick={handleKittenClick}>
            <KittenImage src={kitten.photo} alt={kitten.name} />
            <KittenInfo>
                <KittenName>{kitten.name}</KittenName>
                <KittenStatus isstatus={kitten.status.toString()}>
                    {kitten.status.toString() === 'true' ? "Ativo" : "Inativo"}
                </KittenStatus>
                <KittenCharacteristics>{kitten.description}</KittenCharacteristics>
            </KittenInfo>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 14px;
  background: #FFF;
  box-shadow: 0px 2px 30px 0px rgba(53, 56, 90, 0.12);
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 100px; /* Apply a larger margin to the last KittenContainer */
  }
`;

const KittenImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 14px;
  border: 1px solid transparent;
  /* background-image: linear-gradient(90deg, #CA82F8, #CA82F894); */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const KittenInfo = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
`;

const KittenName = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const KittenStatus = styled.span`
  color: ${(props) => (props.isstatus.toString() === 'true' ? 'green' : 'red')};
  font-size: 12px;
  margin-bottom: 2px;
`;

const KittenCharacteristics = styled.span`
  font-size: 12px;
  color: #777;
`;