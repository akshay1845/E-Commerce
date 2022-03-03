import React, { useEffect, useState } from 'react'
import { Button, Card, Typography, Modal, Row, Col, Select, Table, TimePicker, Alert, message } from 'antd'
import './sales.css'
import { useDispatch, useSelector } from 'react-redux'
import { sale, removeSale } from '../../actions/actions'
import { useAuth0 } from '@auth0/auth0-react';


const { Option } = Select

const Sales = () => {
  const [visible, setVisible] = useState(false)

  const [val, setVal] = useState({
    startDay: "",
    startTime: "",
    endDay: "",
    endTime: "",
  })

  const { isAuthenticated } = useAuth0()


  const dispatch = useDispatch();
  const display = useSelector((state) => state.AddSale.addsale)
  console.log(display)


  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const columns = [
    {
      title: 'Start Day',
      dataIndex: 'startDay',
      key: 'startDay',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Day',
      dataIndex: 'endDay',
      key: 'endDay',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => 
      <Button onClick={() => delete1(record)} type="danger">DELETE</Button>
    }

  ];
  const delete1 = (e) => {
    console.log("record" + JSON.stringify(e))
    dispatch(removeSale(e))
  }

  const validation = () => {

    if (val.startDay && val.endDay && val.startTime && val.endTime) {

      if(display && display.length) {

        if (val?.startDay == val?.endDay && val?.startTime >= val?.endTime) {
          message.error("Not valid!!!")
        }
        // else if (day?.findIndex((e) => e == val.startDay) > day?.findIndex((e) => e == val?.endDay)) {
        //   message.error("your sale must end in particular week!!! (HINT : before :- saturday 23)")
        // }
        else {
          const a = display.filter((x) => {
            return (
              x?.startDay == x?.endDay && x?.startTime >= x?.endTime 
              ||
              val?.startDay == x?.endDay && val?.startTime < x?.endTime
              ||
              val?.endDay == x?.startDay && val?.endTime > x?.startTime
              ||

              day?.findIndex((e)=> e == val?.startDay) < day?.findIndex((e) => e == x?.startDay) && day?.findIndex((e) => e == x?.endDay) < day?.findIndex((e) => e == val?.endDay)
              ||
              // day?.findIndex((e) => )
              day?.findIndex((e) => e == x?.startDay) < day?.findIndex((e) => e == val?.startDay) &&
              day?.findIndex((e) => e == val?.startDay) < day?.findIndex((e) => e == x?.endDay)
              ||
              day?.findIndex((e) => e == x?.startDay) < day?.findIndex((e) => e == val?.endDay) &&
              day?.findIndex((e) => e == val?.endDay) < day?.findIndex((e) => e == x?.endDay)
              // ||
              // // day?.findIndex((e) => e == x?.startDay) <= day?.findIndex((e) => e == val?.startDay) && val?.startTime <= x?.endTime &&
              // // day?.findIndex((e) => e == x?.endDay) >= day?.findIndex((e) => e == val?.startDay)
              // // ||
              // day?.findIndex((e) => e == x?.startDay) >= day?.findIndex((e) => e == val?.startDay) && val?.startTime <= x?.endTime &&
              // day?.findIndex((e) => e == x?.endDay) <= day?.findIndex((e) => e == val?.startDay)

            )
          })
          console.log("inside validation" + JSON.stringify(a))
          if (a.length) {
            message.error("You've already a sale!!!")
          }
          else {
            setVisible(false)
            dispatch(sale(val))

          }
        }
      }
      else {
        setVisible(false)
        dispatch(sale(val))
        // setDisplay(addsale)
      }
    }
    else {
      message.error("Please Enter All the fields")
    }
  }

  const Display_sell = () => {
    return (
      <>
        <Table
          pagination={false}
          columns={columns}
          dataSource={display}
        />
      </>
    )
  }

  return (
    <>
    {
      isAuthenticated && (
      <>
        <Button type="primary"
        className='btn1' onClick={() => {
          setVisible(true)
        }}>
        Add New SALE
      </Button>
      <br />

      <Display_sell />

      <Modal
        title="SALE"
        centered
        destroyOnClose={true}
        maskClosable={false}
        visible={visible}
        onOk={() => {
          validation()
        }}
        onCancel={() => setVisible(false)}
        style={{ height: 700, marginTop: 70 }}
      >
        <Row>
          <Col span={12}>
            <Select placeholder="Select Start Day" onChange={(e) => setVal({ ...val, startDay: e.value })} labelInValue="startDay">
              {day.map((e) =>
                <Option value={e}>{e}</Option>
              )}
            </Select>
          </Col>
          <Col span={12}>
            <Select placeholder="Select End Day" onChange={(e) => setVal({ ...val, endDay: e.value })} labelInValue="endDay">
              {day.map((e) =>
                <Option value={e}>{e}</Option>
              )}
            </Select>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col span={12}>
            <TimePicker placeholder='select start Time' format="HH" showNow={false} onChange={(e, time) => setVal({ ...val, startTime: time })} />
          </Col>
          <Col span={12}>
            <TimePicker placeholder='select End Time' format="HH" showNow={false} onChange={(e, time) => setVal({ ...val, endTime: time })} />
          </Col>
        </Row>
      </Modal>
      </>)  
    }
      
    </>
  )
}

export default Sales