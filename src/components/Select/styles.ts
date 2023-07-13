import styled, { css } from 'styled-components';
import Tootlip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  /* Campo não preenchido, bordar fica vermelha  */
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Verificação se o campo está preenchido,
  se ele estiver ficar com os icones na cor laranja */

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  select {
    flex: 1;
    border: 0;
    background: transparent;
    color: #666360;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tootlip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
