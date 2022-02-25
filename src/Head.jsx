import { useEffect, useState, useContext } from 'react';
import { Menu, Image, Avatar, Dropdown } from 'antd';
import { HomeOutlined, MailOutlined, ContactsOutlined, LoginOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from './context/Context';
import AddCart from './cart/AddCart';
import './App.css';
import { callApi } from './actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import Sales from './Pages/sales/Sales';


const { Item, Divider } = Menu

//---------------------Component---------------------
const Head = () => {

  const dispatch = useDispatch();

  const [current, setCurrent] = useState('home')
  const [data, setData] = useState([])
  const [apidata, steApidata] = useState([])      // for Fething API Data
  const { account, setAccount } = useContext(Logincontext);

  const navigate = useNavigate()

  const { isAuthenticated, logout, user } = useAuth0()


  const get_item = () => {
    const get_data = localStorage.getItem("auth")
    setAccount(get_data)
  }

  useEffect(() => {
    get_item();
    dispatch(callApi())   //Fetch Api from Redux
  }, [])

  const Apidata = useSelector((state) => state.API_Data);


  const handleClick = (e) => {

    if (e.key === "logout") {
      // localStorage.removeItem("auth")
      // setAccount(false)
      logout()
      navigate('/')
    }
    setCurrent(e.key);
  };

  const dropdown_menu = (
    <Menu style={{position: 'relative'}}onClick={handleClick}>
      <Item key="0">
        <NavLink to="/profile">Profile</NavLink>
      </Item>
      <Divider />
      <Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Item>
    </Menu>
  );

  return (
    <>
      <Image
        className='image'
        src={'logo.png'}
        preview={false} />

      <Menu theme='dark' onClick={handleClick} mode="horizontal">

        {
          isAuthenticated ?
            <>
              <Item key="dash" icon={<HomeOutlined />} >
                <NavLink to="/dash">Dashboard<br /></NavLink>
              </Item>
              {/* <Item key="sales">
              <NavLink to="/sales"><Image className='sale' src = "sale.png" preview={false}></Image><br /></NavLink>
            </Item> */}
            </>
            :
            <Item key="home" icon={<HomeOutlined />} >
              <NavLink to="/">Home<br /></NavLink>
            </Item>
        }
        <Item key="about" icon={<MailOutlined />}>
          <NavLink to="/about">About</NavLink>
        </Item>
        <Item key="contact" icon={<ContactsOutlined />}>
          <NavLink to="/contact">Contact</NavLink>
        </Item>
        {
          isAuthenticated ?
            <Item key="sales" style={{position:"absolute",right:"10%"}}>
              <NavLink to="/sales"><Image className='sale' src="./sale.png" preview={false}></Image><br /></NavLink>
            </Item>
            :
            false
        }
        {
          isAuthenticated ?
            // <Item key="logout" icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }}>
            //   Logout
            // </Item> 
            <Dropdown className="dropdown" overlay={dropdown_menu} trigger={['click']}>
              <a className="ant-dropdown-link" className="dropdown_name" onClick={e => e.preventDefault()} >
                {user?.nickname}<DownOutlined />
              </a>
            </Dropdown>
            :
            <Item key="login" icon={<LoginOutlined />} style={{ marginLeft: 'auto' }}>
              <NavLink to="/login">Login</NavLink>
            </Item>
        }
        {
          isAuthenticated ?
            <AddCart /> :
            false
        }
        {
          isAuthenticated ?
            <Avatar size={40} className="main_avatar">{user?.nickname?.toUpperCase()?.[0]}</Avatar> :
            false
        }
        {/* {
          isAuthenticated ?
            <Item key="sales">
              <NavLink to="/sales"><Image className='sale' src="./sale.png" preview={false}></Image><br /></NavLink>
            </Item>
            :
            false
        } */}
      </Menu>
    </>
  )
}
export default Head;
