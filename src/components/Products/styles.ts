import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: grid;

  grid-template-columns: 40em 100%;

  @media (max-width: 768px) {
    grid-template-columns: 500px 1fr;
  }
`;

export const Content = styled.div`
  width: 95%;

  @media (max-width: 768px) {
    width: 95%;
  }
  margin: auto;
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
  margin: auto;
  animation: ${appearFromLeft} 1s;

  form {
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    h3 {
      text-align: left;
      margin: 12px;
    }

    input {
      &::placeholder {
        color: #666360;
      }
    }

    button {
      background: #ff9000;

      height: 56px;
      border-radius: 10px;
      border: 0;
      color: #312e38;
      width: 30%;
      font-weight: 500;
      margin-bottom: 16px;
      transition: 1s;

      &:hover,
      &:focus {
        box-shadow: inset 22em 0 0 0 ${shade(0.2, '#ff9000')};
        color: #fff;
      }
    }
  }
`;

export const SectionCheckbox = styled.section`
  display: grid;
  margin: auto;

  grid-template-columns:  repeat(3, 33%);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 50%);
  }
`
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

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
