import React, { useState, useContext, useEffect } from 'react';
import { Typography } from 'antd';
import { Form, Input, Button } from 'antd';
import { Row, Col, Image, Checkbox } from 'antd';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from '../../context/Context';
import {useAuth0} from '@auth0/auth0-react'

const { Title } = Typography;

//--------------------Component--------------------
const Login = () => {
    // const [form] = Form.useForm();
    // const [input, setInput] = useState([])
    // const { account, setAccount } = useContext(Logincontext); //set account status(Login/Logout)
    const {loginWithRedirect} = useAuth0();

    useEffect(()=>{
        loginWithRedirect()
    },[])


    // const navigate = useNavigate()

    return (
        <>
            {/* {
                isAuthenticated && (JSON.stringify(user, null, 2))
            }
     */}
            {/* <Row className="row_class" gutter={[40, 32]}>

                <Col span={12} className='col1'>
                    <Title level={2} className='title'>Login</Title>

                    <Form
                        style={{ padding: '15px 0' }}
                        form={form}
                        layout="vertical"
                        
                        //Triggered When Form Submitted
                        onFinish={(values) => {
                            const get_email = localStorage.getItem(values.Email)
                            if (get_email === null) {
                                form.resetFields();
                                toast.error("Email Not Found!!!", {
                                    position: "top-center",
                                    autoClose: 2000
                                })
                            } else {
                                const email_obj = JSON.parse(get_email)
                                if (email_obj.password === values.password) {
                                    localStorage.setItem("auth", JSON.stringify(email_obj))
                                    setAccount(email_obj)
                                    navigate('/dash')
                                } else {
                                    form.resetFields(["password"])
                                    toast.error("Password Doesn't Match!!!", {
                                        position: "top-center",
                                        autoClose: 2000
                                    })
                                }
                            }
                        }}
                    >
                        <Form.Item
                            name='Email'
                            label="Email Address:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required'
                                },
                                {
                                    type: 'email',
                                    message: 'Please Enter Valid Email'
                                },
                                {
                                    min: 3,
                                    message: 'Name must be more than 3 Characters'
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Enter Your Email Id" />
                        </Form.Item>
                        
                        <Form.Item
                            label="Password:"
                            name='password'
                            rules={[
                                {
                                    required: true,
                                },
                                { min: 6, message: 'Atleast 6 Characters Required' },
                                {
                                    validator: (_, value) =>
                                        value && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[@#$%^&]/.test(value)
                                            ? Promise.resolve() : Promise.reject("Note: Must use 1 capital, 1 small, 1 Numeric, 1 symbol")
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder='Enter Password'></Input.Password>
                        </Form.Item>
                        <Checkbox >Remember Me</Checkbox>
                        <Form.Item className='btn'>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>

                <Col span={12}>
                    <Image
                        width={500}
                        src={'login.jpg'}
                        preview={false}
                    />
                    <Row>
                        <Col span={24} offset={10}>
                            Don't have an Account<NavLink to="/signup"> SignUp </NavLink>
                        </Col>
                    </Row>
                </Col>
                <ToastContainer />
            </Row > */}
        </>
    );
};
export default Login;


