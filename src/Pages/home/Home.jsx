import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

const Home = () => {
  const {isAuthenticated,user} = useAuth0()

  const navigate = useNavigate()

  

  return (
    <>
    <div >Home</div> 
  {
    isAuthenticated && (navigate('dash'))
  }
    </>
  )
}

export default Home