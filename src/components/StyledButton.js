import styled from "styled-components";

export const StyledButton = styled.button`
    width: ${props => props.width};
    height: 50px;
    background-color: #0ACF83;
    border: 1px solid #0ACF83;
    border-radius: 8px;
    margin-top: 16px;
    padding: 0 30px;

    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: bold;
    color: #FFF;

    display: flex;
    justify-content: space-between;
    align-items: center;

    :disabled {
        background-color: #D5E0ED;
        border: 1px solid #D5E0ED;
        color: #FFF;
    }
`;