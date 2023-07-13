import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';
import Button from '../../components/Button';

const Home: React.FC = () => {
  const history = useHistory();

  const handlerList = () => {
    history.push('/list');
  };

  const handlerCustomerClient = () => {
    localStorage.setItem('scheduling', 'false');
    history.push('/register');
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Button onClick={handlerList}>Lista de serviços</Button>
          <Button onClick={handlerCustomerClient}>Atender cliente</Button>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Home;
