import styled from 'styled-components/macro';
import { css } from "styled-components";
import color from 'styles/color';


export const ButtonCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }

    &:active {
        opacity: 0.7;
    }

`

export const ThemeButtonCss = css`
    ${ButtonCss}
    background-color: ${color.THEME};
    color: white;

    div {
        color: white;
    }

`
