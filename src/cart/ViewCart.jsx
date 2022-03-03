import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Tag, Space, Typography, Row, Col } from 'antd';



const { Text } = Typography;

//-----------------------------component-----------------------------
const ViewCart = () => {
  
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const item = useSelector((state) => state.CardItems.cardData);

  const display = useSelector((state) => state.AddSale.addsale)
  console.log(display)

  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] 
  
  const d = new Date()
  const today = d.getDay()
  const time = d.getHours()
  console.log(day[today] + " " + time )

  let saleStatus

  if(display.length){
    saleStatus = display.filter((ele) => {
      return(
        ele?.startDay == ele?.endDay && ele?.startDay == day[today] && ele?.startTime <= time && time < ele?.endTime
        ||
        ele?.startDay == day[today] && ele?.startTime <= time  
        || 
        ele?.endDay == day[today] && ele?.endTime >= time
        ||
        day?.findIndex((e) => e == ele?.startDay) < today && today < day?.findIndex((e) => e == ele?.endDay)
      )
      
    })

  }
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
let data
if(saleStatus && saleStatus.length){
    data = item.filter((e) => {
    return e.qty > 0
  }).map((val) => {
    return ({
      name: val.rname,
      address: val.address,
      price: `Actual Price : ${val.price}, Adding Discount: ${(val.price - (val.price * val.discount) / 100)}`,
      qty: val.qty,
      amount: (val.price - (val.price * val.discount) / 100 )* val.qty
    })
  })
}
else{
   data = item.filter((e) => {
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
  
}
  

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
    {
      saleStatus && saleStatus.length ? 
      <>
        <Row >
          <Col style={{background: 'green',  margin:'auto',textAlign:"center", borderRadius:15}} span={4} offset={6} >
            <Text style={{color:'white', fontSize:30}} level={1}>Sale is Activated</Text>
            </Col>
       </Row>
       <br />
      </> : null
    }
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