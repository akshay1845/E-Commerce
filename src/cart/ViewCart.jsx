import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Tag, Space, Typography } from 'antd';

const { Text } = Typography;

//-----------------------------component-----------------------------
const ViewCart = () => {
  
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const item = useSelector((state) => state.CardItems.cardData);
//Table Columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

  ];
//Table Data
  const data = item.filter((e) => {
    return e.qty > 0
  }).map((val) => {
    return ({
      name: val.rname,
      address: val.address,
      price: val.price,
      qty: val.qty,
      amount: val.price * val.qty
    })
  })

  //Total Amount
  let sum = 0
  let total_qty = 0
  const total_amount = () => {
    data.map(e => {
      sum += e.amount
      setPrice(sum)
      total_qty += e.qty
      setQuantity(total_qty)
    })
  }
  
  useEffect(() => {
    total_amount()
  }, [data])

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell ><Text strong></Text> </Table.Summary.Cell>
              <Table.Summary.Cell ><Text strong></Text> </Table.Summary.Cell>
              
              <Table.Summary.Cell ><Text strong>Total</Text> </Table.Summary.Cell>
              <Table.Summary.Cell ><Text strong>{quantity}</Text>  </Table.Summary.Cell>
              <Table.Summary.Cell ><Text strong>{price}</Text> </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )
        }
      />


    </>
  )
}

export default ViewCart