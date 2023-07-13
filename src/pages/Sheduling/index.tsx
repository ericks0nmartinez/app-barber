import React, { useRef, useCallback, useState, useEffect } from 'react';
import api from '../../services/api'

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import Services from '../../components/Services'
import Products from '../../components/Products'
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Background
} from './styles';
import Select from '../../components/Select';
import Customer from '../../components/Customer';

const Scheduling: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState('')
  const [optionHora, setOptionHora] = useState('')
  const [optionProfessional, setOptionProfessional] = useState('')
  const [optionData, setOptionData] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const scheduling = localStorage.getItem('scheduling') === 'true'

  const professionais = ['', 'Jova', 'Pepeu'];
  const daysOfMonthFromToday = getDaysOfMonthFromToday()

  function getDaysOfMonthFromToday() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = currentDate.getDate() +1;

    const days = [];

    for (let day = today; day <= daysInMonth; day++) {
      const formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
      days.push(formattedDate);
    }

    return days;
  }

  function getHalfHourIntervals() {
    const intervals = [];
    let hour = 9;
    let minute = 0;

    while (hour <= 20 || (hour === 20 && minute === 30)) {
      intervals.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      minute += 30;

      if (minute === 60) {
        hour++;
        minute = 0;
      }
    }

    return intervals;
  }

  const halfHourIntervals = getHalfHourIntervals();

  const history = useHistory();

  const createRecordDate = useCallback(async data => {
    try {
      const idCustomer = localStorage.getItem('clientId')
      const getScheduling: any = await api.get(`schedules/${idCustomer}`)

      if (getScheduling.data.length === 0) {
        const response = await api.post('schedules', {
          idCustomer: idCustomer,
          scheduling: scheduling,
          data: data.data,
          hora: data.hora,
          updateData: '',
          updateHora: '',
          professional: data.professional,
        })
        localStorage.setItem('shedulingId', response.data._id)
        console.log('response.data._id', response.data._id)
      }
    } catch (error) {
      // Trate o erro conforme necessário
    }
  }, [])

  const updateRecordDate = useCallback(async (data) => {
    //todo
    const idCustomer = localStorage.getItem('clientId')

    const getScheduling: any = await api.get(`schedules/${idCustomer}`);

    if (
      getScheduling.data.length !== 0 &&
      data.professional !== ''
    ) {
      const idSheduling = getScheduling.data[0]._id;

      // Se não estiver agendando e não há agendamento existente, criar
      const response = await api.patch(`schedules/${idSheduling}`, {
        idCustomer: idCustomer,
        scheduling: scheduling,
        data: data.data,
        hora: data.hora,
        updateData: '',
        updateHora: '',
        professional: data.professional,
      });
      localStorage.setItem('shedulingId', response.data._id)
      console.log('response.data._id', response.data._id)
    }
  }, []);

  useEffect(() => {

    updateRecordDate({
      data: optionData,
      hora: optionHora,
      professional: optionProfessional
    })

    if (optionHora !== '' && optionData !== '') {
      createRecordDate({
        data: optionData,
        hora: optionHora,
        professional: optionProfessional
      })
    }
  }, [optionProfessional, optionData && optionHora])

  const handleSubmit = useCallback(async () => {
    try {
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Agendar atendimento</h1>
            <Customer />
            <section style={{ width: '100%' }} >
              {professionais.length > 1 && (
                <Select name="professional" value={optionProfessional} onChange={(e) => {
                  setOptionProfessional(e.target.value)
                }}>
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
            {scheduling === true ? (
              <section
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <Select name="date" value={optionData} onChange={(e) => {
                  setOptionData(e.target.value)
                }}>
                  {daysOfMonthFromToday.map((data, index) => (
                    <option
                      key={index}
                      style={{ width: '100%' }}
                      value={data}
                    >
                      {data}
                    </option>
                  ))}
                </Select>
                <Select name="hora" value={optionHora} onChange={(e) => {
                  setOptionHora(e.target.value)
                }}>
                  {halfHourIntervals.map((hora, index) => (
                    <option key={index} style={{ width: '100%' }} value={hora}>
                      {hora}
                    </option>
                  ))}
                </Select>
              </section>
            ) : (
              <></>
            )}
              <Services />
              <Products />
            <Button type="submit">Finalizar</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container >
  );
};

export default Scheduling;
