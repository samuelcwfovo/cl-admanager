import styled from 'styled-components/macro';
import color from 'styles/color';

interface Props {
    isLoading: boolean;
    
}


const UploadButton = styled.button`
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: none;
    background-color: #464B4A;
    color: white;
    padding: 1rem;
    font-size: 1rem;
    cursor: pointer;
    
    &:hover {
        opacity: 0.85;
    }

    &:active {
        opacity: 0.7;
    }
`

export default UploadButton