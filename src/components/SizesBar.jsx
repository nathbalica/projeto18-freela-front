import { useState } from "react";
import styled from "styled-components";

export default function SizesBar(props) {
    const { sizes, selectedSize, setSelectedSize } = props;

    function toggleSize(ind) {
        setSelectedSize(ind);
    }

    return (
        <SizesBarContainer>
            <span>Escolha o tamanho</span>
            <div>
                {sizes.map((s, ind) => <button
                                     onClick={() => toggleSize(ind)}
                                     key={s}
                                     disabled={(selectedSize === ind) ? true : false}>{s}
                                </button>)}
            </div>
        </SizesBarContainer>
    );
}

const SizesBarContainer = styled.div`
    padding: 15px 0;
    font-family: 'Montserrat', sans-serif;
    height: 70px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
        font-size: 14px;
    }

    div {
        display: flex;
        justify-content: space-between;

        button {
            font-size: 16px;
            width: 61px;
            height: 41px;
            border-radius: 8px;
            background-color: #D5E0ED;
            border: 1px solid #D5E0ED;
            color: #000;

            display: flex;
            align-items: center;
            justify-content: center;

            :disabled {
                background-color: #0ACF83;
                border: 1px solid #0ACF83;
                color: #FFF;                
            }
        }
    }
`;