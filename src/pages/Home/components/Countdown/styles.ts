import { styled } from "styled-components";

export const CountdownContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 12rem;

    span {
        width: 8rem;
        height: 100%;
        background-color: ${(props) => props.theme['gray-700']};
        border-radius: 8px;

        display: flex;
        align-items: center;
        justify-content: center;
        
        font-size: 10rem;
        font-weight: bold;
    }


`;

export const SeparatorContainer = styled.div`
    width: 6rem;
    height: 100%;
    color: ${(props) => props.theme['green-500']};

    display: flex;
    align-items: center;
    justify-content: center;
        
    font-size: 10rem;
    font-weight: bold;
`;