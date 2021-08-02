import styled from 'styled-components/macro';
import color from 'styles/color';


export const AccountRoot = styled.div`
    & > h3 {
        font-size: 1.3rem;
    }

    padding-bottom: 3rem;

`

export const SectionDiv = styled.div`
    width: 55rem;
    background-color: white;
    padding: 1rem;
    padding-bottom: 2rem;
`

export const SectionHeader = styled.div`

    border-bottom: 1px solid ${color.GLOBAL.BORDER};

    & > div {
        display: inline-block;
        font-size: 1.1rem;
        font-weight: bold;
        padding: .5rem 0;

    }

    & > span {
        font-size: .9rem;
        margin-left: 1.5rem;
        display: inline-block;
        color: ${color.GLOBAL.LINK};
        cursor: pointer;
    }
`

export const SectionDetailDiv = styled.div`
    
    & > :first-child {
        display: grid;
        grid-template-columns: 1fr 1fr;
    
        & > div {
            margin-right: 3rem;
        }
    }

    h4 {
        font-weight: 420;
    }

    p {
        font-weight: 200;
        font-size: 1rem;
    }

    input {
        margin-top: -.5rem;
    }

    img {
        border-radius: 100%;
        width: 4rem;
        height: 4rem;
        margin-right: 1.3rem;
    }
`

export const SameLineWrapperDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const UploadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: none;
    background-color: #464B4A;
    color: white;
    padding: 1rem 2.5rem;
    font-size: .9rem;
    cursor: pointer;
    
    &:hover {
        opacity: 0.85;
    }

    &:active {
        opacity: 0.7;
    }
`

export const RemoveImageDiv = styled.div`
    margin-left: 1rem;
    font-size: .9rem;
    color: ${color.GLOBAL.LINK};
    cursor: pointer;
    font-weight: 200;
`

export const SaveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: none;
    background-color: ${color.THEME};
    color: white;
    padding: .8rem 1rem;
    font-size: .9rem;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }

    &:active {
        opacity: 0.7;
    }
`

export const CancelButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: none;
    background-color: #FFFFFF;
    color: black;
    border: 1px solid ${color.GLOBAL.CANCEL_BORDER};
    padding: .8rem 1.3rem;
    font-size: .9rem;
    cursor: pointer;
    margin-left: 2rem;
    &:hover {
        opacity: 0.85;
    }

    &:active {
        opacity: 0.7;
    }
`

export const ButtonGroupDiv = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
`


export const MarginDiv = styled.div`
    margin: 2rem;
`

export const CheckBoxContainerDiv = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: .5rem;
    & > label {
        align-self:flex-start;

        span {
            font-size: .9rem;
            font-weight: 100;
        }
    }
`
