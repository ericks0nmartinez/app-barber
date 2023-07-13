import React, { useRef, useCallback, useState } from 'react'
import { FormHandles } from '@unform/core'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import {
  SectionPeople,
  DivPeople,
} from './styles'

interface PhoneData {
  phone?: string
}

const Customer: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { findPhoneCustomer } = useAuth()
  const [inputName, setInputName] = useState('')
  const [inputPhone, setInputPhone] = useState('')

  const handleCreateCustomer = useCallback(async () => {
    const idCustomer = localStorage.getItem('clientId')

    try {
      if (inputName !== '' && inputPhone !== '' && idCustomer === null) {
        const response = await api.post('customer', {
          status: true,
          name: inputName,
          phone: inputPhone,
        })
        localStorage.setItem('clientId', response.data._id)
      }
    } catch (error) {
      // Trate o erro conforme necessário
    }
  }, [inputName])

  const handleGetCustomer = useCallback(
    async (data: PhoneData) => {
      try {
        const response = await api.get(`customer/${data.phone}`)
        localStorage.setItem('clientId', response.data[0]._id)
        const name = response.data[0].name
        setInputName(name)
        formRef.current?.setFieldValue('name', name)
      } catch (error) {
        // Trate o erro conforme necessário
      }
    },
    [findPhoneCustomer],
  )

  const handleGetPhoneCustomer = useCallback(() => {
    handleGetCustomer({ phone: inputRef.current?.value })
  }, [handleGetCustomer])

  return (
    <SectionPeople>
      <DivPeople>
        <input
          name='phone'
          style={{ width: '100%' }}
          ref={inputRef}
          onBlur={handleGetPhoneCustomer}
          type='text'
          placeholder='(67) 99999-9999'
          onChange={e => setInputPhone(e.target.value)}
        />
      </DivPeople>
      <DivPeople>
        <input
          name='name'
          type='text'
          style={{ width: '100%' }}
          onBlur={handleCreateCustomer}
          placeholder='Nome'
          value={inputName}
          onChange={e => setInputName(e.target.value)}
        />
      </DivPeople>
    </SectionPeople>
  )
}

export default Customer
