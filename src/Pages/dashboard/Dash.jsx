import React, { useEffect, useState } from 'react'
import { Card, Input, Button, InputNumber,Skeleton } from 'antd';
import { products } from './Data';
import { Row, Col, Image } from 'antd';
import { NavLink } from 'react-router-dom';
import './data.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/actions';
import { removeToCart } from '../../actions/actions';
import { useAuth0 } from '@auth0/auth0-react';

const { Meta } = Card
const { Search } = Input

//----------------------Component---------------------------------
const Dash = (props) => {

  const [word, setWord] = useState("")      //used in search filter
  let [item, setItem] = useState(products)  //updated(Quantity) products array
  const [click, setClick] = useState(0)     //Maintaining Buttons in card


  const { isAuthenticated, logout } = useAuth0()

  useEffect(() => {                          //Will update Products array on every Button Click
    setProducts()
  }, [click])

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.CardItems.cardData);
  const setProducts = () => {
    setItem(cart)
  }

  //function will be triggered from SEARCH Input
  const get_item = (e) => {
    setWord(e.target.value)
  }

  //Search Filter
  item = products.filter((element) => {
    if (word == null) {
      return element
    } else if (element?.rname?.toLowerCase?.().includes?.(word?.toLowerCase?.())) {
      return element
    }
  }).map((values) =>
    values
  )

  //Function will be Triggered when Add button Clicked
  const add = (added) => {
    const output = dispatch(addToCart(added))
    setClick(click + 1)
  }

  //Function will be Triggered when Remove button Clicked
  const remove = (removed) => {
    // console.log(removed)
    dispatch(removeToCart(removed))
    setClick(click + 1)
  }

  return (
    <>
    
      {isAuthenticated && (
        <>
          {/* Search */}
          <Search placeholder="search your favourites" className='block' onChange={get_item} enterButton />

          <Row gutter={[16, 16]}>
            {
              item.map((val) => {

                return (
                  <Col lg={8} md={12} sm={24}>

                    {/* Card */}
                    <Card
                      hoverable
                      className='cardDetails'

                      cover={
                        <NavLink to={`/view/${val.id}`}>
                          <Image className='product_img' alt="example" src={val.imgdata} preview={false} />
                        </NavLink>
                      }

                      actions=
                      {[
                        ...(val.qty >= 1 ?
                          [<Button className='btn' style={{ background: 'green' }} onClick={() => add(val.id)} type="primary">Add</Button>,
                          <InputNumber value={val.qty} disabled></InputNumber>,
                          <Button className='btn' onClick={() => remove(val.id)} type="danger">Remove</Button>] :

                          [<Button className='btn' onClick={() => add(val.id, val.qty)} type="primary">Add to Cart</Button>])
                      ]}
                    >
                      <Meta title={val.rname} description={`${val.somedata}`} />
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </>
      )

      }




    </>
  )
}

export default Dash


