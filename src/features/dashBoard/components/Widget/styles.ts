
import styled from 'styled-components/macro';
import color from 'styles/color';
import { ThemeButtonCss, ButtonCss } from 'styles/reuseableStyle';





export const DrakBgFilterDiv = styled.div`
z-index: 200;
position: absolute;
top:0%;
left:0%;
height: 100vh;
width: 100vw;
backdrop-filter: brightness(50%);
`
export const AbsoluteCenterDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
`

export const BoxDiv = styled.div`
    width: 60rem;
    min-height: 30rem;

    background-color: white;
    border-radius: 5px;
`


export const TapDiv = styled.div`
    display: flex;
    justify-content: space-between; 
    border-bottom: 1px solid #F2F2F2;
`

export const TapGroupDiv = styled.div`
    display: flex;
    flex-direction: row;

    & > div {
        padding: 1rem 2rem;
    }
`


type TabDivProps = {
    isActive: boolean;
}

export const TapContentDiv = styled.div<TabDivProps>`
    cursor: pointer;
    ${TabDivProps => TabDivProps.isActive ?
        `
            border-bottom: 2px solid ${color.THEME};
            font-weight: 600;
        `
        :
        `
            color: #8B8E8E;
            font-weight: 400;
            &:hover {
                border-bottom: 2px solid grey;
            }
        `
    }
    
`

export const CloseButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 1rem;
    cursor:pointer;
`

export const WidgetContainerDiv = styled.div`
    margin: 0 2.5rem 2rem 2.5rem;
`

export const WidgetHeaderDiv = styled.div`
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
`

export const CampaignContainerDiv = styled.div`
    max-width: 40rem;

    padding-bottom: 1rem;
`

export const CampaignObjectiveDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

export const CampaignObjectiveDetailDiv = styled.div`
    display : flex;
    flex-direction: row;
    margin-top : 2rem;
    align-items: center;
`

export const CampaignIconDiv = styled.div`
    position: relative;
    border-radius: 90px;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 4rem;
    width: 4rem;
    
    border: 2px solid ${color.THEME};
    color : ${color.THEME};

    & > svg {
        z-index: 2;
        font-size: 2rem;
    }

    &::after {
        z-index: 1;
        content: "";
        position: absolute;
        top:0.25rem;
        left:0.25rem;
        width: 3.5rem;
        height: 3.5rem;
        background-color: #D5F2EC;
        border-radius: 45px;
    }
`

export const CampaignTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    & > div {
        font-size: 1.1rem;
    }

    & > span {
        margin-top: .25rem;
        font-size: .9rem;
        color: #747877;
    }
`

export const WidgetFooterDiv = styled.div`
    border-top: 2px solid #F2F2F2;
    padding: 2rem;
`

export const ButtonGroupDiv = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    justify-content: flex-end;
`

export const ContinueButton = styled.button`
    ${ThemeButtonCss}

    font-size: 1rem;
    padding : .75rem 2rem;
`


export const PreviousButton = styled.div`
    color: ${color.THEME};
    font-size: 1rem;
    margin-right: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    & > span {
        margin-left: .25rem;
    }

`



export const AdGroupContainerDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    & > div:first-child {
        margin-right: 5rem;
    }
`

export const DatePickWrapperDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    margin-bottom: .75rem;

    & > div:first-child {
        margin-right: 2rem;
    }

    input {
        font-size: 1rem;
        padding: .6rem 1rem;
        border-radius: 5px;
        border: 1px solid ${color.FORM.BORDER.NORMAL};
        background-color: ${color.FORM.BG.NORMAL};
        
        &:hover {
            border: 1px solid ${color.THEME};
        }

        &:focus {
            outline-offset: 0;
            border: 1px solid ${color.THEME};
            box-shadow: 0 0 0 1px ${color.THEME};
            background-color: ${color.FORM.BG.NORMAL};
        }


    }
`

export const CheckBoxWrapperDiv = styled.div`
    .MuiCheckbox-colorSecondary.Mui-checked {
        color : ${color.THEME};
    }
`

export const TapSelectDiv = styled.div`

    .Tap__control {
        border: none;

        background-color: ${color.FORM.BG.NORMAL};
    }

    .Tap__control--is-focused{
        box-shadow: 0 0 0 1px ${color.THEME};
    }

`

export const AdvanceWrapperDiv = styled.div`
    display: inline-flex;
    color: ${color.THEME};
    font-size: .9rem;
    align-items: center;
    cursor: pointer;
    margin-top: .5rem;

`

export const TimePickWrapperDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;

    & > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        input {
            font-size: .9rem;
            width : 4rem;
            padding: .6rem 1rem;
            border-radius: 5px;
            border: none;
            background-color: ${color.FORM.BG.NORMAL};
            

        }


        span {
            margin: 0 .5rem;
        }
    }
`

export const DeviceTypeDiv = styled.div`
    display: flex;
    flex-direction: row;

    & > div:first-child{
        margin-right: 2rem;
    }
`

export const BudgetTypeDiv = styled.div`
    display: flex;
    flex-direction: row;

    & > label:first-child {
        margin-right: 2rem;
    }
`

export const AmountWrapperDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .Select__control {
        font-size: 1rem;
        border: none;
        background-color: ${color.FORM.BG.NORMAL};
    }

    .Select__control--is-focused{
        box-shadow: 0 0 0 1px ${color.THEME};
    }
    & > div:first-child {
        width: 8rem;
    }

    & > span {
        margin-left: .5rem;
        padding: .75rem;
    }

    & > input {
        width : 8rem;
    }


`

export const FormatWrapperDiv = styled.div`

    & > div {
        display: flex;
        flex-direction: row;
    }

    label {
        margin-right: 2rem;
    }

    & > img {
        margin-top: 1.5rem;
    }
`


export const AdContainerDiv = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    
    & > div:first-child {
        margin-right: 2rem;
    }
`

export const AdCreativeWrapperDiv = styled.div`
    margin-left: .5rem;
    font-weight: 400;

    & > input {
        margin-bottom: 1rem;
    }

    & > p {
        margin-bottom: 0.5rem;
    }

    & > textarea {
        width: 20rem;
        height: 13rem;

        border: 1px solid #ADBEB9;
        background: #F6F8F7;
        border-radius: 2px;

        font-size: 1rem;
        padding: 1rem;
        outline: none;
    }
`

export const AdUploadWrapperDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > button {
        font-size: 1rem;
        color : #F0F0F0;
        background-color: black;
        padding: .5rem 1rem;
        border-radius: 4px;

        & > span {
            margin-left: .5rem;
        }

        ${ButtonCss}

    }

    & > div {
        margin-left: 1rem;
    }

`

export const AdTextWrapperDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    & > div {
        font-size: 0.7rem;
        color: #979797;
    }

    & > p {
        margin-bottom: 0.5rem;
    }

`

export const AdPreviewDiv = styled.div`
    background-color: #F6F8F7;
    width: 30rem;
    height: 25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow-y: scroll;

    padding: 2rem 0;


`

export const AdPreviewEmptyDiv = styled.div`
    background-color: #F0F0F0;
    width: 15rem;
    height: 9rem;

    display: flex;
    align-items: center;
    justify-content: center;

`

export const AdDisplayPreviewDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0;
    width: 70%;
    background-color: white;

    img {
        width: 100%;
        max-height: 20rem;
    }


    & > div {
        background-color: #F0F0F0;

        margin: 1rem;
        padding: .25rem .5rem;

        & > .sponsor {
            font-size: .8rem;
            margin-bottom: .25rem;
        }

        & > .describle {
            display: grid;
            grid-template-columns: 3fr 1fr;

            & > span {
                margin-left: .25rem;
                padding-top: .1rem;
                padding-bottom: .1rem;

                font-size: .7rem;
                font-weight: bold;
            }

            & > div {
                margin: auto auto 0 auto;
                padding: .125rem .75rem;
                font-size: .6rem;
                color : ${color.THEME};
                border: 1px solid ${color.THEME};
                border-radius: 4px;
            }

        }
    }
`
