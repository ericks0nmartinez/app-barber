import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
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
  animation: ${appearFromLeft} 1s;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
