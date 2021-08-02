import styled from 'styled-components/macro';
import color from 'styles/color';

const AbsoultTopRightDiv = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 2rem;
    margin-top: 1rem;

    span {
        color: ${color.THEME};
    }

    a {
        text-decoration: none;
    }
`

export default AbsoultTopRightDiv