import styled from "styled-components";

export const HomePageContainer = styled.div`
  width: 100%;

`

export const KittensContainer = styled.div`
  padding: 0px 20px 0 20px;
  margin-top: 100px;
  background: #CA82F8;

  
`;

export const KittensGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
  
`;

export const KittenItem = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(202, 130, 248, 0.3);

`;

export const KittenImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

export const KittenName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const LoadMoreButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #555;
  }
`;
