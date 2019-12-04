import React, { Component } from 'react';
import {
    Container,
    Button,
    Form,
    Row,
    Col
} from 'react-bootstrap';

import MemberList from './MemberList';

import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Footer from '../Navigation_Navber/Footer'
import Swal from 'sweetalert2'

class Member_Information extends React.Component {
    constructor(props) {
        super(props)
        const Swal = require('sweetalert2')
        // 這個狀態只是決定要不要重新導向
        this.state = {
            email: '',
            password: '',
            name: '',
            id_card: '',
            birthday: '',
            mobile: '',
            address: '',
            users: [],
            error: null,
            redirectToReferrer: false,
        }
    }

    componentDidMount() {
        const sid = localStorage.getItem('member_sid')
        console.log(sid)
        const url = 'http://localhost:3000/users/' + sid
        this.requestToServer(url, 'GET', {})

    }

    putupdateMember = () => {
        if (!this.state.password) {
            // alert('密碼為必填！')
            Swal.fire(
                '',
                '密碼為必填！',
                'warning'
            )
            return
        }
        if (!this.state.name) {
            // alert('姓名為必填！')
            Swal.fire(
                '',
                '姓名為必填！',
                'warning'
            )
            return
        }
        if (!this.state.mobile) {
            // alert('行動電話為必填！')
            Swal.fire(
                '',
                '行動電話為必填！',
                'warning'
            )
            return
        }
        var mobileCheck = /^09\d{2}\-?\d{3}\-?\d{3}$/;
        if (!mobileCheck.test(this.state.mobile)) {
            // alert('行動電話為必填！')
            Swal.fire(
                '',
                '請填寫正確的行動電話！',
                'warning'
            )
            return
        }
        if (!this.state.address) {
            // alert('地址為必填！')
            Swal.fire(
                '',
                '地址為必填！',
                'warning'
            )
            return
        }


        const sid = localStorage.getItem('member_sid')
        const url = 'http://localhost:3000/users/' + sid
        this.requestToServer(
            url,
            'put',
            {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                id_card: this.state.id_card,
                birthday: this.state.birthday,
                mobile: this.state.mobile,
                address: this.state.address,
            },
            Swal.fire(
                '',
                '修改成功！',
                'success'
            )
        )
    }

    requestToServer = (url, method, data = {}, callback) => {
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

        fetch(req)
            .then(response => {
                // 直接轉換JSON格式為物件、字串、數字…
                return response.json()
            })
            .then(jsonObject => {
                // jsonObject會是一個JavaScript物件
                if (method === 'GET')
                    this.setState(
                        {
                            users: jsonObject,
                            email: jsonObject.email,
                            password: jsonObject.password,
                            name: jsonObject.name,
                            id_card: jsonObject.id_card,
                            birthday: jsonObject.birthday,
                            mobile: jsonObject.mobile,
                            address: jsonObject.address,
                        }
                    )
                console.log(jsonObject)
            })
            .catch(error => {
                // Error
                this.setState({ result: error })
                console.log('錯誤訊息', error)
            })
    }

    

    // 可控元件通用
    handleChange = event => {
        this.setState({
            // 物件屬性由計算得來
            [event.target.name]: event.target.value,
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <Col lg={9} >
                    <br />
                    <h1>基本資料</h1>
                    <hr />

                    {/* 電子信箱 */}
                    <Form.Group as={Row} controlId="formGridAddress1">
                        <Form.Label column sm={2}>
                            Email
                            </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                plaintext
                                readOnly
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className="Text_billing_email"
                            />
                        </Col>
                    </Form.Group>

                    {/* 密碼 */}
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                            </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* 姓名 */}
                    <Form.Group as={Row} controlId="">
                        <Form.Label column sm={2}>
                            姓名
                            </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                type="text"
                                placeholder="name"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* 身分證字號 */}
                    <Form.Group as={Row} controlId="formGridAddress1">
                        <Form.Label column sm={2}>
                            身分證字號
                             </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                plaintext
                                readOnly
                                type="text"
                                name="id_card"
                                value={this.state.id_card}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* 出生日期 maybe use datepicker  */}
                    <Form.Group as={Row} controlId="formGridAddress1">
                        <Form.Label column sm={2}>
                            出生年月日
                             </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                plaintext
                                readOnly
                                type="text"
                                placeholder="2019-09-09"
                                name="birthday"
                                value={this.state.birthday}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* 行動電話 */}
                    <Form.Group as={Row} controlId="formGridAddress1">
                        <Form.Label column sm={2}>
                            行動電話
                            </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                type="text"
                                placeholder="0999999999"
                                value={this.state.mobile}
                                name="mobile"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* 地址 */}
                    <Form.Group as={Row} controlId="formGridAddress1">
                        <Form.Label column sm={2}>
                            地址
    </Form.Label>
                        <Col sm={10} className="ml-1">
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="台北市中山區龍江路99巷99號"
                                value={this.state.address}
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <br />
                    <hr />

                    {/* 送出-清除 */}
                    <Form.Group as={Row}>
                        <Col sm={{ span: 4, offset: 2 }}>
                            <Button
                                type="submit"
                                style={{ 'margin-right': 20 }}
                                onClick={this.putupdateMember}
                            >修改</Button>

                        </Col>

                    </Form.Group>
                </Col>

            </>
        );
    }
}

export default Member_Information;