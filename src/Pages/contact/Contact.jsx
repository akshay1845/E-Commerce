import React from 'react'
import { Button, Card, Typography } from 'antd'
import { useState, useEffect } from 'react'

const { Text } = Typography

const Contact = () => {
  const [data, setData] = useState([])
  console.log(data);
  useEffect(() => {
    get_api()
  }, [])

  //Using asyne & await
  const get_api = async () => {

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data1 = await res.json();

    setData(data1)
      // useEffect(() => {
  //   get_api()
  // }, [])

  //Using asyne & await
  // const get_api = async () => {

  //   const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //   const data = await response.json();

  //   setData(data[0])

  //Using Promise then & catch
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //   .then((resolve) => resolve.json())
  //   .then((json)=>{
  //     console.log("json", json)
  //     setData(json[0])
  //   })
  //   .catch((error)=> console.log("error", error))
  // }
  // }
  }

  return (
    <>
      {/* <Card title="About Us" bordered={true} style={{ width: 800 }}>
      <Text level={1}>Id = {data?.id}</Text><br />
      <Text level={1}> Name = {data?.name}</Text><br />
      <Text level={1}> UserName = {data?.username}</Text><br />
      <Text level={1}> Email = {data?.email}</Text><br />
      <Text level={1}> City = {data?.address?.city}</Text><br />
      <Text level={1}> Zipcode = {data?.address?.zipcode}</Text><br />
      <Text level={1}> phone = {data?.phone}</Text><br />
      <Text level={1}> Website = {data?.website}</Text><br />
      <Text level={1}> Company Name = {data?.company?.name}</Text><br />
    </Card>
      <Button type="primary" onClick={get_api} >Get Data</Button> */}

    </>
  )
}



export default Contact