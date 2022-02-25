import { Button, Card, Typography, Modal, Row, Col, Select, Table, TimePicker, Alert } from 'antd'
import React, { useState, useEffect } from 'react'
import './about.css'

// const { Text } = Typography
const { Option } = Select

const About = () => {
  // const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [display, setDisplay] = useState([])


  // console.log(display)

  const [val, setVal] = useState({
    startDay: "",
    startTime: "",
    endDay: "",
    endTime: "",
  })
  // const a = val?.starTime === val?.endTime
  // console.log("time=" + a)


  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // const v =day.findIndex((e) =>  e == "Saturday")
  // console.log(v)

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
      if (val?.startDay === val?.endDay) {
        if (val?.startTime >= val?.endTime) {
          alert("Enter Valid Range!!!")
          // <Alert type="error" showIcon />
        }
        else if (val?.startTime <= display?.[display?.length - 1]?.endTime) {
          alert("Youe time is conflicting!")
          // <Alert message="Youe time is conflicting!" type="error" showIcon />
        }
        else {
          setDisplay([...display, val])
        }
      }
      // else if(display?.length && val?.startDay == display?.[display?.length-1]?.endDay)
      // {
      //   if(val?.startTime <= display?.[display?.length-1]?.endTime){
      //     alert("Your time is conflicting!")
      //     // <Alert message="Youe time is conflicting!" type="error" showIcon />
      //   }
      //   else {
      //     setDisplay([...display, val])
      //   }

      // }
      else if (display.length) {
        const a = display.filter((x) => {
          return (
            day?.findIndex((e) => e == x?.startDay) <= day?.findIndex((e) => e == val?.endDay) && x?.startTime <= val?.endTime &&
            day?.findIndex((e) => e == val?.endDay) <= day?.findIndex((e) => e == x?.endDay)
            ||
            val?.endDay == x?.StartDay && x?.startTime <= val?.endTime

          )
        })
        console.log(a)
        // const b = display.filter((x) => {
        //   return (
        //     val?.endDay == x?.StartDay && x?.startTime <= val?.endTime
        //   )
        // }      
        // )
        // console.log("b =" +b)
        const v = display.filter((x) => {

          return (
            day?.findIndex((e) => e == x?.startDay) <= day?.findIndex((e) => e == val?.startDay) && val?.startTime <= x?.endTime &&
            day?.findIndex((e) => e == x?.endDay) >= day?.findIndex((e) => e == val?.startDay)
            ||
            day?.findIndex((e) => e == x?.startDay) >= day?.findIndex((e) => e == val?.startDay) && val?.startTime <= x?.endTime &&
            day?.findIndex((e) => e == x?.endDay) <= day?.findIndex((e) => e == val?.startDay)
          )
        })
        console.log("v = " + v)

        if (a.length) {
          alert("Your time is conflicting!")
        }
        else if (v.length) {
          alert("You've already sale in this region")
        }
        else {
          setDisplay([...display, val])
        }
      }
      // else if(display?.length && 
      //         day?.findIndex((e) =>  e == display?.[display?.length-1]?.startDay) <= day?.findIndex((e) =>  e == val?.startDay) && 
      //         day?.findIndex((e) =>  e == display?.[display?.length-1]?.endDay) >= day?.findIndex((e) =>  e == val?.startDay)
      //         || 
      //         day?.findIndex((e) =>  e == display?.[display?.length-1]?.startDay) >= day?.findIndex((e) =>  e == val?.startDay) && 
      //         day?.findIndex((e) =>  e == display?.[display?.length-1]?.endDay) <= day?.findIndex((e) =>  e == val?.startDay))
      //         {
      //           alert("You've already sale in this region")
      //   // <Alert message="You've already sale in this region" type="error" showIcon />
      // }
      else {
        setDisplay([...display, val])
      }
    }
    else {
      alert("PLease Enter all the Fields!!")
    }
    // const { startDay, startTime , endDay ,  endTime} = display[0];
    // console.log("aaaa"+startDay)

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
        style={{ margin: 'auto', display: 'block' }} onClick={() => {
          setVisible(true)
        }}>
        sale
      </Button>
      <br />

      <Display_sell />

      <Modal
        title="SALE"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false)
          validation()
        }}
        onCancel={() => setVisible(false)}
        destroyOnClose={true}
        style={{ height: 700 }}
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

      {/* {modal} */}
    </>
  )
}

export default About