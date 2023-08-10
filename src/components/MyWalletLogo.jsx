import styled from "styled-components"
import logo from "../assets/logo.png"

export default function MyWalletLogo() {
    return (
        <ContainerLogo>
            <img src={logo}/>
            <Text>Passo a Passo</Text>
            <Subtitle>Seu destino para sapatos incríveis!</Subtitle>

        </ContainerLogo>
    )
}


const ContainerLogo = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    img{
        width: 150px;
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

