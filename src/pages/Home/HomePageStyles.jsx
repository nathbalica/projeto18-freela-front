import styled from "styled-components";
import { BiDownArrow } from "react-icons/bi";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
`;

export const TextHomeContainer = styled.div`
  color: #868686;
  text-align: flex-start;
  font-style: normal;
  line-height: normal;
  padding: 15px;

  p {
    font-size: 20px;
    font-weight: 500;
  }

  span {
    font-size: 23px;
    font-weight: bold;
  }
`;



export const ProductsContainerWrapper = styled.div`
  margin-top: 10px;
  border-radius: 15px;
  background-color: #f2f2f2;
`;

export const ProductsContainer = styled.ul`
  position: relative;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;

  max-height: 350px;
  overflow-y: auto;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  & > div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

export const SneakerItem = styled.li`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 150px;
  padding-bottom: 10px;
`;

export const SneakerImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 15px;
`;

export const SneakerTitle = styled.p`
  padding: 5px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #000;
  text-align: center;
`;

export const SneakerPrice = styled.span`
  margin-top: 5px;
  font-size: 16px;
  text-align: center;
`;

export const Sort = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #fff;
  width: 35%;
  cursor: pointer;
  position: relative;
`;

export const SortText = styled.span`
  margin-right: 5px;
`;

export const SortArrow = styled(BiDownArrow)`
  font-size: 16px;
`;

export const SortOptions = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const SortOption = styled.div`
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
`;

export const LoadMoreButton = styled.button`
  width: 50%;
  background-color: #038754;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`;
