import React from "react"

import styled from "styled-components"

const AbnormalLabel = styled.label`
  display: block;
  height: 25px;
  position: relative;
  padding-left: 40px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .control {
    background-color: #2dbc9f;
  }

  input:checked ~ .control:after {
    left: 20px;
  }

  .control {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 40px;
    border-radius: 13px;
    background-color: #adbeb9;
    transition: background-color 0.13s ease-in;
  }

  .control:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 5px;
    width: 15px;
    height: 15px;
    border-radius: 13px;
    background: white;
    transition: left 0.13s ease-in;
  }
`
type Props = {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const RoundedSwitch = (props: Props) => {
  return (
    <AbnormalLabel>
      <input type="checkbox" name={props.name} value={props.value} onChange={props.onChange} checked={props.checked}></input>
      <span className="control"></span>
    </AbnormalLabel>
  )
}

export default RoundedSwitch