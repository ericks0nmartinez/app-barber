import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';
import Button from '../../components/Button';

const Home: React.FC = () => {
  const history = useHistory();

  const removeItem = () => {
    localStorage.removeItem('scheduling');
    localStorage.removeItem('shedulingId');
    localStorage.removeItem('clientId');
    localStorage.removeItem('servicesId');
    localStorage.removeItem('productId');
  };

  const handlerScheduling = () => {
    removeItem()
    localStorage.removeItem('professionalId');
    localStorage.setItem('scheduling', 'true');
    history.push('/scheduling');
  };

  const handlerCustomerClient = () => {
    removeItem()
    localStorage.setItem('scheduling', 'false');
    history.push('/auth');
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Button onClick={handlerScheduling}>Agendamento</Button>
          <Button onClick={handlerCustomerClient}>Atender cliente</Button>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Home;

