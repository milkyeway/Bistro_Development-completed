import React, { Component, Link } from 'react';
import {
    ListGroup,
    Container,
    Accordion,
    Button,
    Form,
    Card,
    Row,
    Col,
} from 'react-bootstrap';
import MemberList from './MemberList';

import Navigation_Navber_noImg from '../../components/Navigation_Navber/Navigation_Navber_noImg'
import Footer from '../../components/Navigation_Navber/Footer'

class Member_Order_allstore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            getData: true,
            data_oj: [],
            city: "",
            price: "",

            product_sid: "",
            product_qty: "",
            product_price: "",
            name: "",
            rv_time:"",
            booktime: "",
        }
    }
    componentDidMount() {
        const sid = localStorage.getItem('member_sid')
        console.log(sid)
        const url = 'http://localhost:3000/order_list_detail_allstore/' + sid

        this.requestToServer(url, 'GET')
    }
    requestToServer = async (url, method, data = {}) => {
        // GET方法不有body，先設定出樣版物件
        const requestTemplate = new Request(url, {
            method: method,
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })

        let req = requestTemplate

        // 如果不是GET再加上body
        if (method !== 'GET')
            req = new Request(requestTemplate, { body: JSON.stringify(data) })

        try {
            const response = await fetch(req)
            const jsonObject = await response.json()
            if (method === 'GET')
                this.setState({
                    data_oj: jsonObject,
                })

            // console.log(jsonObject)
        } catch (error) {
            // Error
            this.setState({ result: error })
            console.log('錯誤訊息', error)
        }
    }
    render() {
        const { data_oj } = this.state

        return (
            <>
                {data_oj.map((item) =>
                  <tbody>
                    <tr>
                        {/* <td>{item.product_sid}</td> */}
                        <td>{item.name}
                        <br/>
                        預約時間
                        <br/>
                        {item.rv_time}
                        </td>
                        <td>{item.product_qty}</td>
                        <td>{item.product_price}</td>
                        <td>{item.product_qty * item.product_price}</td>
                        {/* <td></td>                        */}
                    </tr>
                    </tbody>
                )}
            </>
        );
    }
}

export default Member_Order_allstore;