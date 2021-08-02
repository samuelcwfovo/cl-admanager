import styled from 'styled-components/macro';


const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;

    & > div {
        justify-content: start;
    }

    h1 {
        margin-bottom: 2.5rem;
    }

    /* label {
        display: block;
        margin-bottom: .5rem;
    } */
`

export default CenterDiv