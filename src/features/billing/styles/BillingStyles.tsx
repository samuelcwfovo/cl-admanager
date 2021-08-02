
import styled from 'styled-components/macro';
import color from 'styles/color';

import { withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export const BillingRoot = styled.div`
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

export const SectionHeader = styled.div`

    border-bottom: 1px solid ${color.GLOBAL.BORDER};

    & > div {
        display: inline-block;
        font-size: 1.2rem;
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

export const SectionDetail = styled.div`

    h4 {
        font-size: .95rem;
        font-weight: 480;
        margin-bottom: .5rem;
        margin-top: 2.2rem;
    }

    h5 {
        margin-top: 1.2rem;
        margin-bottom: .5rem;
        font-weight: 480;
        font-size: 1.05rem;
    }

    p {
        font-weight: 300;
    }
`

export const SectionDetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    & > div {
        margin-right: 3rem;
    }

`

export const SameLineWrapperDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

`

export const ButtonGroupDiv = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
`

export const SaveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    border: none;
    background-color: ${color.THEME};
    color: white;
    padding: .8rem 0;
    min-width: 12rem;
    font-size: .9rem;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }

    &:active {
        opacity: 0.7;
    }

    //loading color
    &> div {
        color:white;
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
    padding: .8rem 2rem;
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


export const PhoneInputWrapper = styled.div`
    //override PhoneInupt library css
    input {
        &:hover {
            border: 1px solid ${color.THEME} !important;
        }

        &:focus {
            outline-offset: 0;
            border: 1px solid ${color.THEME} !important;
            box-shadow: 0 0 0 1px ${color.THEME};
            background-color: ${color.FORM.BG.NORMAL} !important;
        }
    }

    .selected-flag {
        background: transparent !important;
    }

`

export const CardContainerDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
`


export const VisaImg = styled.img`
    width: 4rem;
    height: 1.2rem;
    margin-right: 1rem;
    margin-top: .5rem;
`

export const MasterImg = styled.img`
    width: 4rem;
    height: 2.2rem;
    margin-right: 1rem;
    margin-top: .5rem;
`


export const CardNoDiv = styled.div`
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 1px;
`

export const CardDetailDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: .2rem;

    div {
        font-weight: 400;
        font-size: .9rem;
    }
`

export const CardActiveDiv = styled.div`
    border-radius: 3px;
    margin-left: .5rem;
    background-color: ${color.THEME_HEAVY};
    height: 1rem;
    color: white;
    padding: .3rem .7rem;
    font-size: .7rem;
`

export const CardButtonContainerDiv = styled.div`
    margin-left: auto;

    button {
        padding: .5rem 1.5rem;
        text-transform: none;
        margin-left: .5rem;
    }
`

export const LinkSpan = styled.span`
    font-size: .9rem;
    display: inline-block;
    color: ${color.GLOBAL.LINK};
    cursor: pointer;

`

export const AbsoluteCenterDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
`

export const DrakBgFilterDiv = styled.div`
    z-index: 5;
    position: absolute;
    top:0%;
    left:0%;
    height: 100vh;
    width: 100vw;
    backdrop-filter: brightness(50%);
`


const GreenCheckbox = withStyles({
    root: {
        color: color.GLOBAL.BORDER,
        '&$checked': {
            color: color.THEME,
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

type CheckBoxProps = {
    label?: string;
    checked?: boolean;
    onChange?: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
}

export const CheckBox = (props: CheckBoxProps) => {
    return (
        <div style={{ marginTop: '1rem' }}>
            <FormControlLabel
                control={<GreenCheckbox checked={props.checked} onChange={props.onChange} />}
                label={props.label}
            />
        </div>

    )
}