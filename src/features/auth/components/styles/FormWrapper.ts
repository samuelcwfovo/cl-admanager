import styled from 'styled-components/macro';
import color from 'styles/color';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin-top: 0.5rem;
    & > p {
        margin: 0;
        color: ${color.THEME};
    }
`

export default FormWrapper