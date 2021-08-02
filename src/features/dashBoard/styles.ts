import styled from 'styled-components/macro';
import color from 'styles/color';




export const HeaderDiv = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
`

export const TabsDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    background-color: #F0F0F0;

    .Mui-selected {
        color: ${color.THEME} !important;
        background-color: white;
    }

    .MuiTabs-indicator {
        background-color: ${color.THEME};
        top: 0;
        bottom: unset;
    }

    .MuiTab-root {
        padding: 18px 12px;
    }

    & > span {
        margin-left: 1rem;
        text-align: center;
        color: #00000080;
    }
`


export const ChartDiv = styled.div`
    background-color: white;
    padding: 2rem;
`