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
  padding: 10px;
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
  border-radius: 8px;
`;

const KittenInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const KittenName = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
`;

const KittenStatus = styled.span`
  color: ${(props) => (props.isstatus.toString() === 'true' ? 'green' : 'red')};
  font-size: 12px;
  margin-bottom: 5px;
`;

const KittenCharacteristics = styled.span`
  font-size: 12px;
  color: #777;
  margin-bottom: 10px;
`;
