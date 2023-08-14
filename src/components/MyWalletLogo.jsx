import styled from "styled-components"
import logo from "../assets/logo.svg"

export default function MyWalletLogo() {
    return (
        <ContainerLogo>
            <img src={logo}/>
        </ContainerLogo>
    )
}


const ContainerLogo = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 100px;
    }

`
const Text = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
    margin-bottom: 10px;

`

const Subtitle = styled.h3`
    /* font-family: "Raleway", sans-serif; */
    
`

