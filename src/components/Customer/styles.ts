import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns:  1fr 2fr;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const appearFromLeft = keyframes`
  from {
    opactiy: 0;
    transform: translateX(-50px);
  }
  to {
    opactiy: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;

  animation: ${appearFromLeft} 1s;

  form {
    margin: auto;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    h3 {
      margin: 12px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 5px;
      color: #f4ede8;

      &::placeholder {
        color: #fff;
      }

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;

      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: 1s;

      &:hover,
      &:focus {
        box-shadow: inset 22em 0 0 0 ${shade(0.2, '#ff9000')};
        color: #fff;
      }
    }

  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;


export const SectionPeople = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 50%);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 100%);
  }
`

export const DivPeople = styled.div`
  background: #232129;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;

  border: 2px solid #232129;
  color: #666360;

  input {
    border: 0;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
  grid-template-columns: repeat(1, 100%);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 50%);
  }
`;
