import styled from 'styled-components/macro';
import color from 'styles/color';

interface Props {
    isInvalid: boolean;
}

const FormInput = styled.input<Props>`

    box-sizing: border-box;
    width: 100%;
    padding: .6rem 1rem .6rem 1rem;
    font-size: 1rem;
    border-radius: 5px; 
    border: ${Props => Props.isInvalid ? `1px solid ${color.FORM.BORDER.ERROR}` : `1px solid ${color.FORM.BORDER.NORMAL}`};
    background-color: ${Props => Props.isInvalid ? color.FORM.BG.ERROR : color.FORM.BG.NORMAL};
    font-family: 'Lato',sans-serif;
    font-weight: normal;

    &:hover {
        border: 1px solid ${color.THEME};
    }

    &:focus {
        outline-offset: 0;
        border: 1px solid ${color.THEME};
        box-shadow: 0 0 0 1px ${color.THEME};
        background-color: ${color.FORM.BG.NORMAL};
    }

`

export default FormInput