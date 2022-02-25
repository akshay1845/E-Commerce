import React from 'react';
import {Card,Typography,Button,Image, Row, Col} from 'antd'
import {useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';

const {Text} = Typography

//---------------------Component---------------------
const Profile = () => {

    const Apidata = useSelector((state) => state.API_Data);

    const {isAuthenticated,user} = useAuth0()

  return (
    <>
    {/* <Card title="Profile" bordered={true} style={{ width: 800 }}>
      <Text level={1}>Id = {Apidata[0]?.id}</Text><br />
      <Text level={1}> Name = {Apidata[0]?.name}</Text><br />
      <Text level={1}> UserName = {Apidata[0]?.username}</Text><br />
      <Text level={1}> Email = {Apidata[0]?.email}</Text><br />
      <Text level={1}> City = {Apidata[0]?.address?.city}</Text><br />
      <Text level={1}> Zipcode = {Apidata[0]?.address?.zipcode}</Text><br />
      <Text level={1}> phone = {Apidata[0]?.phone}</Text><br />
      <Text level={1}> Website = {Apidata[0]?.website}</Text><br />
      <Text level={1}> Company Name = {Apidata[0]?.company?.name}</Text><br />
    </Card><br /> */}
    {
      isAuthenticated && (
        <>
        <Row >
          <Col span={4}>
            <Image src={user.picture} preview={false}></Image><br />
          </Col>
          <Col span={4}>
            <Text level={4}> Name = {user.nickname}</Text><br />
            <Text level={1}> Email = {user.email}</Text><br />
          </Col>
          
        </Row>
        {/* {user.email_verified}  ? <Text level={1}> EmailStatus =Not verifed</Text><br /> : <Text level={1}> EmailStatus = verifed</Text><br /> */} 
        </>
      )
    }
    </>
  )
}

export default Profile