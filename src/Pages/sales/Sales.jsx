import React, { useState } from 'react'
import { Button, Card, Typography, Modal, Row, Col, Select, Table, TimePicker, Alert, message } from 'antd'
import './sales.css'

const { Option } = Select

const Sales = () => {
  const [visible, setVisible] = useState(false)
  const [display, setDisplay] = useState([])

  const [val, setVal] = useState({
    startDay: "",
    startTime: "",
    endDay: "",
    endTime: "",
  })

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

  ];

  const validation = () => {

    if (val.startDay && val.endDay && val.startTime && val.endTime) {

      // if (val?.startDay === val?.endDay) {
      //   if (val?.startTime >= val?.endTime) {
      //     message.error("Enter Valid Range!!!")
      //   }
      //   else if (val?.startTime <= display?.[display?.length - 1]?.endTime) {
      //     message.error("Youe time is conflicting!")
      //   }
      //   else {
      //     setVisible(false)
      //     setDisplay([...display, val])
      //   }
      // }

      // else if (display.length) {
      //   const a = display.filter((x) => {
      //     return (
      //       day?.findIndex((e) => e == x?.startDay) <= day?.findIndex((e) => e == val?.endDay) && x?.startTime <= val?.endTime &&
      //       day?.findIndex((e) => e == val?.endDay) <= day?.findIndex((e) => e == x?.endDay)
      //       ||
      //       val?.endDay == x?.StartDay && x?.startTime <= val?.endTime

      //     )
      //   })
      //   console.log(a)

      //   const v = display.filter((x) => {

      //     return (
      //       day?.findIndex((e) => e == x?.startDay) <= day?.findIndex((e) => e == val?.startDay) && val?.startTime <= x?.endTime &&
      //       day?.findIndex((e) => e == x?.endDay) >= day?.findIndex((e) => e == val?.startDay)
      //       ||
      //       day?.findIndex((e) => e == x?.startDay) >= day?.findIndex((e) => e == val?.startDay) && val?.startTime <= x?.endTime &&
      //       day?.findIndex((e) => e == x?.endDay) <= day?.findIndex((e) => e == val?.startDay)
      //     )
      //   })
      //   console.log("v = " + v)

      //   if (a.length) {
      //     message.error("Your time is conflicting!")
      //   }
      //   else if (v.length) {
      //     message.error("You've already sale in this region")
      //   }
      //   else {
      //     setVisible(false)
      //     setDisplay([...display, val])
      //   }
      // }
      if(display.length){

        if(val.startDay == val.endDay && val.startTime >=val.endTime){
          message.error("Not valid!!!")
        }
        else if(day?.findIndex((e) => e == val?.startDay) < day?.findIndex((e) => e == val?.endDay)){
          const a = display.filter((x) => {
                return (
                  val?.startDay == x?.endDay && val?.startTime < x?.endTime
                  ||
                  day?.findIndex((e) => e == x?.startDay) < day?.findIndex((e) => e == val?.startDay) && 
                  day?.findIndex((e) => e == val?.startDay) < day?.findIndex((e) => e == x?.endDay) 
                )
              })
          console.log(a)
        }
      }
      else {
        setVisible(false)
        setDisplay([...display, val])
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
    </>
  )
}

export default Sales