import React, { useRef, useCallback, useState, useEffect } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'

import Button from '../../components/Button'
import api from '../../services/api'

import { Container, Content, AnimationContainer } from './styles'
import Select from '../../components/Select'
import Services from '../../components/Services'
import Products from '../../components/Products'
import Customer from '../../components/Customer'

const handleData = new Date().toLocaleString('en-GB', {
  hour12: false,
})

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [open, setOpen] = useState(false)
  const [optionProfessional, setOptionProfessional] = useState('')
  const register = localStorage.getItem('scheduling') === 'true'
  const professionais = ['', 'Jova', 'Pepeu']

  const history = useHistory()

  const handlerBackHome = () => {
    history.push('/home');
  };

  const recordDate = useCallback(async professional => {
    //todo
    const idCustomer = localStorage.getItem('clientId')
    const getScheduling: any = await api.get(`schedules/${idCustomer}`)

    if (
      getScheduling.data.length === 0 && //Não tem agendamento
      professional !== '' // profissional não esta vazio
    ) {
      // Se não estiver agendando e não há agendamento existente, criar
      const response = await api.post('schedules', {
        idCustomer: idCustomer,
        scheduling: register,
        data: handleData.split(', ')[0],
        hora: handleData.split(', ')[1],
        professional: professional,
        updateData: handleData.split(', ')[0],
        updateHora: handleData.split(', ')[1],
      })
        localStorage.setItem('shedulingId', response.data._id)
    } else if (getScheduling.data[0] &&
    professional !== '') {
      // Se houver um agendamento existente, atualizar
      const idSheduling = getScheduling.data[0]._id
      localStorage.setItem('shedulingId', idSheduling)
      console.log('shedulingId', idSheduling)
      const dataScheduling = getScheduling.data[0].data
      const horaScheduling = getScheduling.data[0].hora

      await api.patch(`schedules/${idSheduling}`, {
        idCustomer: idCustomer,
        scheduling: register,
        data: dataScheduling,
        hora: horaScheduling,
        updateData: handleData.split(', ')[0],
        updateHora: handleData.split(', ')[1],
        professional: professional,
      })
    }
  }, [])

  useEffect(() => {
    if (optionProfessional !== '') {
      recordDate(optionProfessional)
    }
  }, [optionProfessional])

  const finalyProductCustomer = useCallback(async () => {
    const idProduct = localStorage.getItem('productId')
    await api.patch(`products/${idProduct}`, {
      finalyProduct: true,
    })
  }, [])

  const finalyServiceCustomer = useCallback(async () => {
    const idService = localStorage.getItem('servicesId')
    await api.patch(`services/${idService}`, {
      finalyService: true,
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      finalyServiceCustomer()
      finalyProductCustomer()
      history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Serviço prestado</h1>
            <Customer />
            <section style={{ width: '100%' }}>
              {professionais.length > 1 && (
                <Select
                  name='professional'
                  value={optionProfessional}
                  onChange={e => {
                    setOptionProfessional(e.target.value)
                    setOpen(true)
                  }}
                >
                  {professionais.map((professional, index) => (
                    <option
                      key={index}
                      style={{ width: '100%' }}
                      value={professional}
                    >
                      {professional}
                    </option>
                  ))}
                </Select>
              )}
            </section>
            {open === true ? (
              <>
                <Services />
                <Products />
                <Button type='submit'>Finalizar</Button>
              </>
            ) : (
              <></>
            )}
          </Form>
          <Button style={{width: '25%'}} onClick={handlerBackHome}>Voltar</Button>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default Register;
