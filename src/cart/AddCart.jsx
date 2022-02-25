import React from 'react'
import {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Badge,Avatar,Image } from 'antd'
import { useSelector } from 'react-redux'
import '../cart/main.css'

const AddCart = () => {
    const { cardData } = useSelector((state)=>state.CardItems);
    
    return (
        <>
            <NavLink to="/viewCart">
                <Badge count={cardData?.filter((e) => e.qty>0)?.length} className="cart">
                    <Image className="img" src="cart.jpg" preview={false}/>
                </Badge>
            </NavLink>
        </>
    )
}

export default AddCart