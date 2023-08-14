import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/auth";
import apis from "../../services/apis";
import { useNavigate } from "react-router-dom";
import TextHome from "./TextHome";
import Header from "../../components/Header/Header";
import { HomePageContainer } from "../styles/style";
import SearchBar from "../../components/ SearchBar";
import KittenContainer from "./KittenContainer";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import {
    KittensContainer,
    KittensGrid,
    KittenItem,
    KittenImage,
    KittenName,
    LoadMoreButton,
} from "../styles/style"; // Certifique-se de importar os estilos corretos
import { Link } from "react-router-dom";




const perPage = 5;

export default function HomePage() {
    const { userAuth } = useAuth();
    const [kittens, setKittens] = useState([]);
    // const [searchValue, setSearchValue] = useState("");
    // const [page, setPage] = useState(1);

    const navigate = useNavigate();

    console.log(userAuth.token)
    useEffect(() => {
        if (!userAuth?.token) {
            navigate("/");
        } else {
            loadKittens();
        }
    }, [userAuth?.token, navigate]);

    const loadKittens = async () => {
        try {
            const response = await apis.getKittens(userAuth.token);
            setKittens(response.data.kittens);
        } catch (error) {
            console.error("Error loading kittens:", error);
        }
    };


    return (
        <HomePageContainer>
            <Header />
            <KittensContainer>
                <KittensGrid>
                    {kittens.map((kitten) => (

                        <KittenContainer key={kitten.id} kitten={kitten} />

                    ))}
                </KittensGrid>
                {/* <LoadMoreButton onClick={handleLoadMore}>Carregar Mais</LoadMoreButton> */}
            </KittensContainer>
            <Footer />
        </HomePageContainer>
    );
}





