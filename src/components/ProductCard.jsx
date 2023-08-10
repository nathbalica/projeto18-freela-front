import styled from "styled-components";

export default function ProductCard(props) {
    const { name, brand, image } = props.produto;

    return (
        <StyledContainer>
            <StyledImage image={image}></StyledImage>
            <div>
                <span>{name}</span>
                <span>{brand}</span>
            </div>
        </StyledContainer>
    );
}

const StyledImage = styled.div`
    background-color: #F6F6F6;
    width: 342px;
    height: 245px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background-image: url(${props => props.image});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 80%;
    margin-bottom: 20px;
`

const StyledContainer = styled.div`


    > div {
        display: flex;
        justify-content: space-between;

        font-family: 'Montserrat', sans-serif;
        font-size: 24px;

        span {
            &:nth-child(2) {
                font-weight: bold;
            }
        }
    }
`;