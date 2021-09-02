import styled from 'styled-components/macro';
import color from 'styles/color';

import { ThemeButtonCss, ButtonCss } from 'styles/reuseableStyle';


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


export const CustomTabsDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-top: 1rem;
    background-color: #FAFAFA;

    border : 1px solid #F0F0F0;

`

type TapButtonProps = {
    isSelected: boolean;
}

export const TabButton = styled.button<TapButtonProps>`
    box-sizing: border-box;
    border: none;
    border-right: 2px solid #F0F0F0;
    padding: 1rem 1rem;
    cursor: pointer;
    width: 12rem;
    font-size: 1rem;
    background-color: transparent;
    display: flex;
    align-items: center;
    color: #6F6F6F;

    & > div {
        margin-left: .5rem;
    }
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.1);
    }

    ${TapButtonProps => TapButtonProps.isSelected ?
        `
            background-color: white;
            border-top-right-radius: 40px;
            color: black;
        ` : null
    }

`

export const CampaignMenuDiv = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1rem;
    background-color: white;

    border-left: 2px solid #F7F7F7;
    border-right: 2px solid #F7F7F7;

`

export const CreateButton = styled.div`
    ${ThemeButtonCss}
    font-size: 1rem;
    padding: .5rem 1rem;

    & > div {
        margin-left: .25rem;
    }
`

export const DropdownButton = styled.div`
    ${ButtonCss}
    
    margin-left: 1rem;
    background-color: #F0F0F0;
    padding: .5rem 1rem;

`

export const CampaignTableDiv = styled.div`
    background-color: #FFF;
    border-top: 2px solid #F7F7F7;
    border-bottom: 2px solid #F7F7F7;

    max-height: 500px;
    overflow: auto;


    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    thead {
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      background-color: white;
      z-index: 100;
    }

    thead, tbody {
        tr:nth-child(2n) {
            background-color: #fafafa;
        }

        tr:hover {
            background-color: #f5f5f5;
        }

        tr {
            th, td {
            padding: 13px;
            border: none;
            border-left: 2px solid rgb(240, 240, 240);
            border-right: 2px solid rgb(240, 240, 240);

            text-align: right;
            }

            th:nth-child(3), td:nth-child(3) {
            text-align: left;
            }

            th:nth-child(-n+4), td:nth-child(-n+4) {
            border: none;
            }
        }
    }

    tfoot {
        position: sticky;
        bottom: 0;
        background-color: white;

            td {
                padding: 3em 1.55em;
                border: none;
                border-left: 1px solid rgb(240, 240, 240);
                border-right: 1px solid rgb(240, 240, 240);

                text-align: right;
                vertical-align: middle;

                span {
                font-size: 12px;
                color: rgb(166, 166, 166);
                }
            }
            td:nth-child(1) {
                border: none;
            }
        }



`



export const IconSpan = styled.span`
    margin-left: .5rem;
`


type CampaignNameWrapperProps = {
    isActive: boolean;
}

export const CampaignNameWrapper = styled.div<CampaignNameWrapperProps>`
    display: flex;
    align-items: center;
    color : ${CampaignNameWrapperProps => CampaignNameWrapperProps.isActive ? color.THEME : 'back'};
`







