import { SectionCheckbox } from './styles'
import React, { useCallback, useState, useEffect } from 'react'
import api from '../../services/api'
import Checkbox from '../Checkbox'

const Services: React.FC = () => {
  const [services, setServices] = useState([{ name: 'Degrade' }])

  const handlerGetServices = useCallback(async () => {
    try {
      const getServices: any = await api.get('barber-services')
      setServices(getServices.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleService = useCallback(async service => {
    const idCustomer = localStorage.getItem('clientId')
    const idSheduling = localStorage.getItem('shedulingId')
    const getService = await api.get(`services/${idCustomer}`)

    if (getService.data.length === 0) {
      //se não estiver agendando, criar
      const postService = await api.post('services', {
        status: true,
        idCustomer: idCustomer,
        finalyService: false,
        service: [service],
        idSheduling: idSheduling
      })
      localStorage.setItem('servicesId', postService.data._id)
    } else {
      let serviceAdds = getService?.data[0].service
      localStorage.setItem('servicesId', getService?.data[0]?._id)

      !serviceAdds.includes(service)
        ? serviceAdds.push(service) //Adicionar quando não encontra item igual no array, pois foi clicado no checkbox
        : serviceAdds.splice(serviceAdds.indexOf(service), 1) //Remove quando encontra item igual no array, pois foi clicado no checkbox

      await api.patch(`services/${getService?.data[0]?._id}`, {
        status: true,
        finalyService: false,
        service: serviceAdds,
      })
    }
  }, [])

  useEffect(() => {
    handlerGetServices()
  }, [])

  return (
    <>
      <h3>Serviços</h3>
      <SectionCheckbox>
        {services.map((service, index) => {
          return (
            <Checkbox
              key={index}
              name='service'
              nameLabel={service.name}
              type='checkbox'
              onChange={() => {
                handleService(service.name)
              }}
            />
          )
        })}
      </SectionCheckbox>
    </>
  )
}

export default Services
