import React, { useRef, useCallback, useState } from 'react'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useHistory } from 'react-router-dom'


import Button from '../../components/Button'
//import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import Register from '../Register'

import {
  Container,
  Content,
  AnimationContainer,
  SectionPeople,
  Background,
  DivPeople,
} from './styles'

const Auth: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()
  const [inputPhone, setInputPhone] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [mensagem, setMensagem] = useState('')

  //const { findPhoneCustomer } = useAuth()

  const handleSubmit = useCallback(async () => {
    try {
      if (inputPhone !== '' && inputPassword !== '') {
        const response = await api.get(
          `barber-professional/${inputPhone}/${inputPassword}`,
        )

        if (response.data !== 0) {
          localStorage.setItem('professionalId', response.data._id)
          history.push('/home')
        }
      } else {
        setMensagem('Telefone ou senha errado')
      }
    } catch (err) {
      console.log(err)
    }
  }, [inputPhone, inputPassword])
  return (
    <Container>
      <Content>
      <AnimationContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Imperatrix</h1>
              <SectionPeople>
                <DivPeople>
                  <input
                    name='phone'
                    style={{ width: '100%' }}
                    ref={inputRef}
                    type='text'
                    onBlur={e => setInputPhone(e.target.value)}
                    placeholder='(67) 99999-9999'
                  />
                </DivPeople>
                <DivPeople>
                  <input
                    name='password'
                    type='password'
                    style={{ width: '100%' }}
                    onBlur={e => setInputPassword(e.target.value)}
                    placeholder='Digite a senha'
                  />
                </DivPeople>
                <><p>{mensagem}</p></>
              </SectionPeople>
              <Button type='submit'>Entrar</Button>
            </Form>
          </AnimationContainer>
          <Background />
        </Content>
    </Container>
  )
}

export default Auth
