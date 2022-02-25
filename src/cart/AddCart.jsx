import React from 'react'
import {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { Badge,Avatar,Image } from 'antd'
import { useSelector } from 'react-redux'
import '../cart/main.css'

const AddCart = () => {
    // const [counter,setCounter] = useState(0)
    const { cardData } = useSelector((state)=>state.CardItems);

    // useEffect(() =>{
    //     console.log("counter :", counter)
    //     setcounter()
    // },[cardData])

    // const setcounter = ()=>{
    //     console.log("cardData :", cardData)
    //     const counter = cardData.filter((e) => e.qty>0)
    //     console.log(counter)
    //     setCounter(counter.length)
    // }
    
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