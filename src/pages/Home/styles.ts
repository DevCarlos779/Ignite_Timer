import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        height: 26.5rem;
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        justify-content: space-between;
        
    }

`;




export const CountdownButton = styled.button`
    width: 100%;
    color: ${(props) => props.theme['gray-100']};
    font-weight: bold;
    height: 4rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    
`;

export const StartCountdownButton = styled(CountdownButton)`

    background-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background-color: ${(props) => props.theme['green-700']};
    }
    
`;

export const PauseCountdownButton = styled(CountdownButton)`

    background-color: ${(props) => props.theme['red-500']};
    color: ${(props) => props.theme['gray-100']};

    &:hover {
        background-color: ${(props) => props.theme['red-700']};
    }
    
`;