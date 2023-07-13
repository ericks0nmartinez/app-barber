import { SectionCheckbox } from './styles'
import React, { useCallback, useState, useEffect } from 'react'
import api from '../../services/api'
import Checkbox from '../Checkbox'

const Products: React.FC = () => {
  const [products, setProduct] = useState([
    { name: 'Tenis' },
    { name: 'Gel' },
    { name: 'Boné' },
    { name: 'Cerveja' },
    { name: 'Pomada cabelo' },
    { name: 'refri' },
  ])

  const handlerGetProducts = useCallback(async () => {
    try {
      const getProducts: any = await api.get('barber-products')
      setProduct(getProducts.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleProduct = useCallback(async product => {
    const idCustomer = localStorage.getItem('clientId')
    const idSheduling = localStorage.getItem('shedulingId')
    const getProduct = await api.get(`products/${idCustomer}`)

    if (getProduct.data.length === 0) {
      //se não estiver agendando, criar
      const postProdutc = await api.post('products', {
        status: true,
        idCustomer: idCustomer,
        finalyProduct: false,
        product: [product],
        idSheduling: idSheduling
      })
      localStorage.setItem('productId', postProdutc.data._id)
    } else {
      let productAdds = getProduct.data[0].product
      localStorage.setItem('productId', getProduct?.data[0]?._id)

      !productAdds.includes(product)
        ? productAdds.push(product) //Adicionar quando encontra item igual no array, pois foi clicado no checkbox
        : productAdds.splice(productAdds.indexOf(product), 1) //Remove quando encontra item igual no array, pois foi clicado no checkbox

      await api.patch(`products/${getProduct.data[0]._id}`, {
        status: true,
        finalyProduct: false,
        product: productAdds,
      })
    }
  }, [])

  useEffect(() => {
    handlerGetProducts()
  }, [])
  return (
    <>
      <h3>Produtos</h3>
      <SectionCheckbox>
        {products.map((product, index) => {
          return (
            <Checkbox
              key={index}
              name='product'
              nameLabel={product.name}
              type='checkbox'
              onChange={() => handleProduct(product.name)}
            />
          )
        })}
      </SectionCheckbox>
    </>
  )
}

export default Products
