import styled from 'styled-components/macro';


const SameLineWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    & > img {
        width: 12rem;
        margin-right: 1rem;
    }

    & > h3 {
        font-size: 1.3rem;
        white-space: nowrap;
        display: flex;
        align-items: center;
    }
`

export default SameLineWrapper