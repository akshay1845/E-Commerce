import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { products } from './Data';
import { Card, Image } from "antd";
import { Row, Col } from 'antd';
import './view.css'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const { Meta } = Card

const View = () => {
    const { id } = useParams();
    const [data, setData] = useState("")
    console.log(data)

    const get_item_details = () => {
        const pro = products.filter((ele) => {
            return ele.id == id ? ele : false
        })
        console.log(pro)

        setData(pro[0])
        // console.log(pro)
    }
    useEffect(() => {
        get_item_details()
    }, [id])

    return (
        <>
            {
                data ?
                    <Row justify="space-around" align="middle">
                        <Col span={2}>
                            <DemoBox value={50}>{<Image alt="example" src={data.imgdata} width={500} preview={false} />}</DemoBox>
                            <DemoBox value={120}>{data.rname}</DemoBox>
                        </Col>
                        <Col span={2}>
                            
                            <DemoBox value={50}>{data.address}</DemoBox>
                            <DemoBox value={50}>{<Image alt="example" src={data.delimg} width={150} preview={false} />}</DemoBox>
                            <DemoBox value={50}>{data.somedata}</DemoBox>
                            <DemoBox value={50}>{data.price}₹ Only</DemoBox><DemoBox value={50}>{data.rating}</DemoBox>
                            <DemoBox value={50}>{<Image alt="example" src={data.arrimg} width={50} preview={false} />}</DemoBox>
                        </Col>
                    </Row> :
                    ""
            }
        </>
    )
}

export default View