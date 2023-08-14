import styled from "styled-components";

export const KittenDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const KittenImage = styled.img`
  width: 100%;
  flex-shrink: 0;
  border-radius: 25px;
  margin-bottom: 20px;
`;

export const KittenInfo = styled.div`
  width: 100%;
  text-align: center;
  border-radius: 15px;
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.37);
`;

export const KittenName = styled.h2`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
`;

export const KittenInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  
  
`;


export const KittenInfoItem = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: ${props => (props.alignLeft ? 'left' : 'center')};
  border-radius: ${props => (props.withBackground ? '10px' : '0')};
  padding: ${props => (props.withBackground ? '10px' : '0')};
  background-color: ${props => (props.withBackground ? 'rgba(0, 0, 0, 0.2)' : 'transparent')};
  margin-right: ${props => (props.withBackground ? '8px' : '0')};
  margin-left: ${props => (props.withMarginLeft ? '8px' : '0')};
`;

export const KittenDescription = styled.div`
  font-size: 16px;
  color: #555;
  margin-bottom: ${props => (props.isSobre ? '15px' : '15px')};
  text-align: left;
  padding-left: 20px;
  color: #000;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  h3{
    color: black;
    font-weight: bold;
  }
`;

export const KittenPrice = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin: 20px 30px;
  /* padding: 0 10px; */
  display: flex;
  justify-content: flex-end;
 
`;

// export const AddToCartButton = styled.button`
//   background-color: #333;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background-color: #555;
//   }
// `;


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

export const CircleBottomRight = styled(Circle)`
  bottom: -200px;
  right: -200px;
`;

export const OwnerContactInfo = styled.div`
  color: #000000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 10px 20px;
  text-align: left;
  h4{
    margin-bottom: 10px;
  }
  p{
    font-size: 15px;
    font-weight: 400;
  }
`;

export const AddToCartButton = styled.button`
  background-color: #D58CE5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 75%;
  padding: 20px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;


export const BackButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
`;

export const BackButtonCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #D58CE5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
