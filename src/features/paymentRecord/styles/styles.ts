import styled from 'styled-components/macro';
import color from 'styles/color';

import { ThemeButtonCss } from 'styles/reuseableStyle';

export const SectionRoot = styled.div`
& > h3 {
    font-size: 1.3rem;
}

padding-bottom: 3rem;

`

export const SectionDiv = styled.div`
    width: 55rem;
    background-color: white;
    padding: 1rem 2.2rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
`

export const TableSectionDiv = styled.div`
    width: 75rem;
    background-color: white;
    padding: 1rem 2.2rem;
    padding-bottom: 2rem;
    margin-bottom: 2rem;

    .MuiDataGrid-columnHeaderWrapper {
        background-color: #F6F8F7;
        color: #8C9492;
    }
`

export const SectionHeader = styled.div`

    border-bottom: 1px solid ${color.GLOBAL.BORDER};

    & > div {
        display: inline-block;
        font-size: 1.2rem;
        font-weight: bold;
        padding: .5rem 0;

    }
`


export const BalanceWrapperDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

export const BalanceDiv = styled.div`

    margin-right: 4rem;

    div:first-child {
        margin-top: 1.5rem;
        font-weight: 500;
    }

    div:nth-child(2) {
        margin-top: 1rem;
        font-size: 2.5rem;
        font-weight: bolder;
    }
`

export const DefaultPaymentDiv = styled.div`
    & > div:nth-child(1) {
        margin-top: 1.8rem;
        font-weight: 600;
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: 3rem;
        margin-bottom: .2rem;
    }
`

export const NoPaymentDiv = styled.div`
    font-size: .95rem;
    font-weight: 400;
    margin-top: -.5rem;
    color: #9AA19F;
`

export const MasterImg = styled.img`
    width: 4rem;
    height: 2.2rem;
    margin-right: 1rem;
    margin-left:  -.7rem;
`

export const VisaImg = styled.img`
    width: 4rem;
    height: 2.2rem;
    margin-right: 1rem;
    margin-left:  -.7rem;

`

export const CreditCardNoDiv = styled.div`
    font-weight: 800;
    word-spacing: 3px;
    letter-spacing: 2px;
`

export const LinkDiv = styled.div`
    font-size: .9rem;
    display: inline-block;
    color: ${color.GLOBAL.LINK};
    cursor: pointer;
`




export const DateDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > span {
        font-weight: 600;
    }

`

export const DateWrapperDiv = styled.div`
    position: relative;
    
    & > div:first-child{
        position: absolute;
        top: 1.75rem;
        left: 1.8rem;
        z-index: 5;
    }

    input {
        margin: 1rem;
        padding: .8rem 1rem .8rem 3rem;
        width: 6rem;
        outline: none;
        border-radius: 5px; 
        border: 1px solid ${color.FORM.BORDER.NORMAL};
        font-family: 'Lato',sans-serif;
        font-size: 1rem;
    }

`

export const TableDateDiv = styled.div`
    margin-left: 1rem;
`

export const TableCardNoDiv = styled.div`
    word-spacing: 3px;
    letter-spacing: 2px;
`

type TableStatusProps = {
    status: string;
}

export const TableStatusDiv = styled.div<TableStatusProps>`
    color: ${TableStatusProps => TableStatusProps.status === 'Success' ?
        '#70C561' : '#F8AA37'
    };
`

export const RedeemButton = styled.button`
    margin-top: 1rem;
    margin-bottom: 2rem;
    padding: .9rem 0;
    min-width: 10rem;
    font-size: 1rem;

    ${ThemeButtonCss}
`