import styled from 'styled-components/macro';
import color from 'styles/color';

interface Props {
    isLoading?: boolean;
    isSetup?: boolean;
}


const Button = styled.button<Props>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: none;
    background-color: ${color.THEME};
    opacity: ${Props => Props.isLoading? '0.5' : '1'};
    color: white;
    padding: 0.8rem;
    font-size: 1rem;
    margin-top: ${Props => Props.isSetup ? '1.8rem' : '3.5rem'};
    cursor: pointer;
    font-weight: bolder;
    &:hover {
        opacity: ${Props => Props.isLoading? '0.5' : '0.85' };
    }

    &:active {
        opacity: ${Props => Props.isLoading? '0.5' : '0.7' };
    }

    & > div {
        color: white;
    }

`

export default Button