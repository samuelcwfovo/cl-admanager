import styled from 'styled-components/macro';
import color from 'styles/color';

const InputForm = styled.form`

    max-width: 25rem;

    input[type=checkbox] {
        width: 1rem;
        height: 1rem;
        margin: 0 .5rem 0 0;
        vertical-align:middle;
    }

    input[type=checkbox]:checked {
        filter: hue-rotate(300deg);
    }
`


export default InputForm