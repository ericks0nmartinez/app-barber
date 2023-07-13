import React, { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'

import styled from 'styled-components'
import { string } from 'yup'

const TableContainer = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin: 5% auto;
`

const TableHeader = styled.th`
  background: #232129;
  padding: 10px;
  text-align: center;
  font-weight: bold;
`

const TableData = styled.td`
  text-align: center;
`

const Select = styled.select`
  background: #232129;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;

  border: 2px solid #232129;
  color: #fff;

  display: flex;
  align-items: center;
  width: 90%;
`

const Checkbox = styled.input`
  margin-right: 5px;
  accent-color: #00f708;
`

const Table: React.FC = () => {
  const [customers, setCustomer] = useState([{ phone: '', name: '', _id: '' }])
  const [services, setServices] = useState([
    { service: [], idCustomer: '', idSheduling: '' },
  ])
  const [products, setProducts] = useState([
    { product: [], idCustomer: '', idSheduling: '' },
  ])
  const [schedules, setSheduling] = useState([
    { scheduling: false, data: string, hora: string, idCustomer: '', _id: '', professional: string },
  ])

  const handleGetCustomer = useCallback(async () => {
    try {
      const response: any = await api.get(`customer`)
      setCustomer(response.data)
    } catch (error) {
      // Trate o erro conforme necessário
    }
  }, [])

  const handleGetServices = useCallback(async () => {
    try {
      const response: any = await api.get(`services`)
      setServices(response.data)
    } catch (error) {
      // Trate o erro conforme necessário
    }
  }, [])

  const handleGetProducts = useCallback(async () => {
    try {
      const response: any = await api.get(`products`)
      setProducts(response.data)
    } catch (error) {
      // Trate o erro conforme necessário
    }
  }, [])

  const handleGetSheduling = useCallback(async () => {
    try {
      const response: any = await api.get(`schedules`)
      setSheduling(response.data)
    } catch (error) {
      // Trate o erro conforme necessário
    }
  }, [])

  useEffect(() => {
    handleGetSheduling()
    handleGetCustomer()
    handleGetServices()
    handleGetProducts()
  }, [])

  const tableCustomer = (idCustomer: string) => {
    const foundCustomer = customers.find(element => element._id === idCustomer)

    if (foundCustomer) {
      return (
        <>
          <TableData>{foundCustomer.phone}</TableData>
          <TableData>{foundCustomer.name}</TableData>
        </>
      )
    } else {
      return (
        <>
          <TableData> </TableData>
          <TableData> </TableData>
        </>
      )
    }
  }

  const tableServices = (idCustomer: string, idSheduling: string) => {
    const foundServices = services.find(
      element =>
        element.idCustomer === idCustomer &&
        idSheduling === element.idSheduling,
    )
    if (foundServices) {
      return (
        <>
          <TableData>
            <Select>
              {foundServices.service.map((element, index) => (
                <option key={index}>{element}</option>
              ))}
            </Select>
          </TableData>
        </>
      )
    } else {
      return (
        <>
          <TableData>
            <Select> </Select>
          </TableData>
        </>
      )
    }
  }

  const tableProducts = (idCustomer: string, idSheduling: string) => {
    const foundProducts = products.find(
      element =>
        element.idCustomer === idCustomer &&
        idSheduling === element.idSheduling,
    )

    if (foundProducts) {
      return (
        <>
          <TableData>
            <Select>
              {foundProducts.product.map((element, index) => (
                <option key={index}>{element}</option>
              ))}
            </Select>
          </TableData>
        </>
      )
    } else {
      return (
        <>
          <TableData>
            <Select> </Select>
          </TableData>
        </>
      )
    }
  }

  const sheduling = schedules.map((sheduling, index) => (
  <tr key={index} style={{ background: index % 2 === 0 ? '#666360' : '#312E38' }}>
      {tableCustomer(sheduling.idCustomer)}
      <TableData>
        <Checkbox type='checkbox' checked={sheduling.scheduling} />
      </TableData>
      <TableData>{sheduling.data}</TableData>
      <TableData>{sheduling.hora}</TableData>
      <TableData>{sheduling.professional}</TableData>
      {tableServices(sheduling.idCustomer, sheduling._id)}
      {tableProducts(sheduling.idCustomer, sheduling._id)}
    </tr>
  ))

  return (
    <TableContainer>
      <thead>
        <tr>
          <TableHeader>Celular</TableHeader>
          <TableHeader>Nome</TableHeader>
          <TableHeader>Agenda</TableHeader>
          <TableHeader>Data</TableHeader>
          <TableHeader>Hora</TableHeader>
          <TableHeader>Barbeiro</TableHeader>
          <TableHeader>Serviços</TableHeader>
          <TableHeader>Produtos</TableHeader>
        </tr>
      </thead>
      <tbody>{sheduling}</tbody>
    </TableContainer>
  )
}

export default Table
