import React from 'react'
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';


import { Container, Content, AnimationContainer, Background } from './styles'
import Table from '../../components/Table'

const ListCut: React.FC = () => {
  const history = useHistory();

  const handlerBackHome = () => {
    history.push('/home');
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Table />
          <Button style={{width: '25%'}} onClick={handlerBackHome}>Voltar</Button>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ListCut
