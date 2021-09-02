

import React from "react"

import styled from "styled-components"

type LabelProps = {
  isError: boolean;
}

const AbnormalLabel = styled.label<LabelProps>`
  display: block;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    & >  div {
      display: inline;
    }
  }

  input + span {
    line-height: 21px;
    height: 21px;
    padding-left: 21px;
    display: inline;
    position: relative;
  }
  input + span:not(:empty) {
    padding-left: 30px;
  }
  input + span:before, input + span:after {
    content: "";
    width: 21px;
    height: 21px;
    display: block;
    border-radius: 50%;
    border: 1px solid ${LabelProps => LabelProps.isError ? 'red' : '#d1d7e3'};
    left: 0;
    top: 0;
    position: absolute;
  }
  input + span:before {
    background: #fff;
    transition: background 0.2s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
  }
  input + span:after {
    background: rgb(64, 190, 154);
    transform: scale(0);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4);
  }
  input:checked + span:before {
    background: #fff;
  }
  input:checked + span:after {
    transform: scale(0.55);
    transition: transform 0.3s ease;
  }

`


type Props = {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  children?: JSX.Element;
  isError: boolean;
}

const RoundedRadioButton = (props: Props) => {
  return (
    <AbnormalLabel isError={props.isError}>
      <input type="radio" name={props.name} value={props.value}
        onChange={props.onChange} checked={props.checked} />
      <span className="radio_label">{props.children}</span>
    </AbnormalLabel>
  )
}

export default RoundedRadioButton