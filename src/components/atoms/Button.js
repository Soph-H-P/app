import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 160px;
  font-weight: 300;
  font-size: 18px;
  padding: 8px;
  background: ${(props) => props.theme.primaryColor};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.black};
    color: ${(props) => props.theme.primaryColor};
    font-weight: 700;
  }

  ${(props) =>
    props.type === 'secondary' &&
    css`
      background: ${props.theme.white};
      color: ${props.theme.black};
      border: ${props.theme.primaryColor} solid 1px;
      padding: 7px;

      &:hover {
        background: ${(props) => props.theme.white};
        color: ${(props) => props.theme.primaryColor};
        border: ${props.theme.black} solid 3px;
        padding: 5px;
      }
    `}
  ${(props) =>
    props.icon === true &&
    css`
      background: none;
      color: ${props.theme.black};
      border: none;
      width: fit-content;
      display: flex;
      align-items: center;
      font-size: 0.8rem;

      &:hover {
        background: none;
        border: none;
        transform: scale(1.1);
      }
    `}
`;

const Button = ({ type, handleClick, dataId = '', children, id = '', icon = false }) => {
  return (
    <StyledButton
      id={id && id}
      onClick={(e) => handleClick(e)}
      type={type}
      data-id={dataId}
      icon={icon}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
