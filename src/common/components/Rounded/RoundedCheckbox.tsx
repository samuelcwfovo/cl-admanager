import React from "react"

import styled from "styled-components"

const StyledLabel = styled.label`
  @keyframes hover-color {
    from {
      border-color: silver
    }

    to {
      border-color: #3e97eb
    }
  }

  input {
    position: absolute;
    display: none;
  }


  input + span {
    position: relative;
    display: block;
    padding-left: 30px;
    cursor: pointer;
    vertical-align: middle;
  }

  input + span:hover:before {
    animation-duration: .34s;
    animation-fill-mode: both;
    animation-name: hover-color;
  }

  input + span:before {
    position: absolute;
    display: inline-block;
    top: -10px;
    left: 0;
    width: 20px;
    height: 20px;
    content: '';
    border: 1px solid silver;
    border-radius: 3px;
  }

  input + span:after {
    position: absolute;
    display: none;
    content: '';

    top: -8px;
    left: 7px;
    box-sizing: border-box;
    width: 6px;
    height: 12px;
    transform: rotate(45deg);
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    border-top: 0;
    border-left: 0;

  }

  input:checked + span:before {
    border: rgb(45,188,159);
    background: rgb(45,188,159);
    animation-name: none;
  }

  input:checked + span:after {
    display: block;
  }
`

type Props = {
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

const RoundedCheckbox = (props: Props) => {
    return (
        <StyledLabel>
            <input type="checkbox" name={props.name} value={props.value} onChange={props.onChange} checked={props.checked}></input>
            <span></span>
        </StyledLabel>
    )
}

export default RoundedCheckbox