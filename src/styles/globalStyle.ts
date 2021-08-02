import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`

    html, body {
        height : 100vh;
        height : -webkit-fill-available;
        overflow-x: hidden;
    }

    body {
        margin: 0px;
        padding: 0px;
        font-family: 'Lato', sans-serif;
    }

    input {
        outline: none;
    }

`

export default GlobalStyle