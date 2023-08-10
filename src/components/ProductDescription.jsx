import styled from "styled-components";

export default function ProductDescription(props) {
    const { descricao } = props;

    return (
        <DescriptionContainer>
            <span>Descrição</span>
            <span>{descricao}</span>
        </DescriptionContainer>
    );
}

const DescriptionContainer = styled.div`
    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
        :nth-child(1) {
            font-size: 16px;
            margin-bottom: 3px;
        }
        :nth-child(2) {
            font-size: 12px;
            line-height: 20px;
        }
    }
`;
