import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {
    Container,
    Button,
    Form,
    Row,
    Col
} from 'react-bootstrap';
import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Navigation_bg from '../Navigation_Navber/Navigation_bg'
import Footer from '../../components/Navigation_Navber/Footer'
import '../../style/Login_s/Login_s.scss'
import Swal from 'sweetalert2'

import DatePicker from 'react-date-picker';
import ReCAPTCHA from "react-google-recaptcha";

class Member_Register extends React.Component {
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

            date: new Date(),
            robot: false,

        }
    }

    passRobot = () => {
        this.setState({ robot: true })
    }
    clickMember = () => {
        if (!this.state.robot) {
            Swal.fire(
                '',
                '請勾選驗證碼',
                'warning'
            )
            return
        }
        // 檢查寫這裡
        if (!this.state.email) {
            // alert('密碼為必填！')
            Swal.fire(
                '',
                'EMAIL為必填！',
                'warning'
            )
            return
        }

        var emailCheck = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!emailCheck.test(this.state.email)) {
            // alert('請填寫正確的身分證字號')
            Swal.fire(
                '',
                '請填寫正確的信箱',
                'warning'
            )
            return
        }

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
        if (!this.state.id_card) {
            // alert('身分證字號為必填！')
            Swal.fire(
                '',
                '身分證字號為必填！',
                'warning'
            )
            return
        }

        var re = /^[A-Za-z]{1}[1-2]{1}\d{8}$/;
        if (!re.test(this.state.id_card)) {
            // alert('請填寫正確的身分證字號')
            Swal.fire(
                '',
                '請填寫正確的身分證字號',
                'warning'
            )
            return
        }

        if (!this.state.birthday) {
            // alert('出生日期為必填！')
            Swal.fire(
                '',
                '出生日期為必填！',
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



        const url = 'http://localhost:3000/users/?email=' + this.state.email + '&id_card=' + this.state.id_card
        this.requestToServer(url, 'GET', {}, this.click)
        //如果有找到就不要讓他post
    }

    postAddMember = () => {
        if (!this.state.birthday) {
            // alert('密碼為必填！')
            Swal.fire(
                '',
                '未成年不得加入會員！',
                'error'
            )
            return
        }
        const url = 'http://localhost:3000/users'
        this.requestToServer(
            url,
            'post',
            {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                id_card: this.state.id_card,
                birthday: this.state.birthday,
                mobile: this.state.mobile,
                address: this.state.address,
            },
            // this.signup
            // alert('註冊成功!')
            this.success()
        )
    }

    success = () => {
        Swal.fire(
            '',
            '註冊成功！',
            'success'
        )
        setTimeout(function () {
            window.location.href = 'http://localhost:8000/Login_register';
        }, 1000) //登錄成功 1秒回首頁
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
                console.log(jsonObject)
                if (method === 'GET') {
                    this.setState({
                        users: jsonObject
                    }, callback)
                }

            })
            .catch(error => {
                // Error
                this.setState({ result: error })
                console.log('錯誤訊息', error)
            })
    }

    click = () => {

        const userFindEmailIndex = this.state.users.findIndex(
            user => user.email === this.state.email
        )

        console.log('userFindEmailIndex', userFindEmailIndex)

        if (userFindEmailIndex !== -1) {
            // alert('已註冊的帳號！')
            Swal.fire(
                '',
                '已註冊的帳號！',
                'error'
            )
            return
        }

        const userFindIdCardIndex = this.state.users.findIndex(
            user => user.id_card === this.state.id_card
        )

        console.log('userFindIdCardIndex', userFindIdCardIndex)

        if (userFindIdCardIndex !== -1) {
            // alert('已註冊的身分證！')
            Swal.fire(
                '',
                '已註冊的身分證！',
                'error'
            )
            return
        }

        this.postAddMember()

    }

    // 可控元件通用
    handleChange = event => {
        this.setState({
            // 物件屬性由計算得來
            [event.target.name]: event.target.value,
        })
    }
    handleResetClick = (e) => {
        this.setState({
            email: '',
            password: '',
            name: '',
            id_card: '',
            birthday: '',
            mobile: '',
            address: '',
        })
    }

    onChange = date => {
        const newdate = new Date()
        const teens = newdate.getFullYear()

        const year = date.getFullYear()

        let month = date.getMonth() + 1

        if (month < 10) month = '0' + month

        let day = date.getDate()

        if (day < 10) day = '0' + day

        // 算到日期的未成年,但有閏年誤差
        // var birth = year + '-' + month + '-' + day;
        // birth = Date.parse(birth.replace('/-/g', "/"));
        // if (birth) {
        //     const year = 1000 * 60 * 60 * 24 * 365;
        //     var now = new Date();
        //     var birthday = new Date(birth);
        //     var age = parseInt((now - birthday) / year);
        // }

        // if (age < 18) {
        //     Swal.fire(
        //         '',
        //         '未成年不得加入會員！',
        //         'error'
        //     )
        //     return 
        // }
        if (teens - year < 18) {
            console.log(teens - year)
            Swal.fire(
                '',
                '未成年不得加入會員！',
                'error'
            )
            return
        }

        this.setState({ date, birthday: year + '-' + month + '-' + day }, () => { console.log(this.state) })
    }

    render() {


        return (
            <>
                <Navigation_Navber_noImg />
                <Navigation_bg/>
                <div>
                    <Container>
                        <br />
                        <h1>註冊</h1>
                        <hr />
                        {/* 電子信箱 */}
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    autocomplete="off"
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* 密碼 */}
                        <Form.Group as={Row} controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Password
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    autocomplete="off"
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
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    value={this.state.name}
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* 性別 */}
                        {/* <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    性別
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="男性"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        value={this.state.m_sex}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="女性"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        value={this.state.m_sex}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset> */}

                        {/* 身分證字號 */}
                        <Form.Group as={Row} controlId="formGridAddress1">
                            <Form.Label column sm={2}>
                                身分證字號
                             </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="A123456789"
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
                            <Col sm={10}>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="2019-09-09"
                                    name="birthday"
                                    value={this.state.birthday}
                                    onChange={this.handleChange}
                                /> */}
                                <DatePicker
                                    format="yyyy-MM-dd"
                                    maxDate={new Date()}
                                    clearIcon
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />
                            </Col>
                        </Form.Group>

                        {/* 行動電話 */}
                        <Form.Group as={Row} controlId="formGridAddress1">
                            <Form.Label column sm={2}>
                                行動電話
                            </Form.Label>
                            <Col sm={10}>
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
                            <Col sm={10}>
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
                        <Form.Group>
                            <Col sm={10} className="d-flex justify-content-center" style={{ margin: '0 auto' }}>
                                <ReCAPTCHA
                                    sitekey="6LeVNcUUAAAAANM53wjArH8f0pSC_RYbl_1vxzFx"
                                    onChange={this.passRobot}
                                />
                            </Col>
                        </Form.Group>
                        {/* 送出-清除 */}
                        <Form.Group as={Row}>
                            <Col sm={{ span: 4, offset: 2 }} className="d-flex justify-content-center" style={{ margin: '0 auto' }}>
                                <Button
                                    type="submit"
                                    style={{ 'margin-right': 20 }}
                                    onClick={this.clickMember}
                                >送出</Button>
                                <Button type="submit2"
                                    onClick={this.handleResetClick}
                                >重填</Button>
                                {/* 想設一個清除可是不清楚寫法 */}
                            </Col>
                        </Form.Group>



                    </Container>
                </div>
                <Footer />
            </>
        );
    }
}

export default Member_Register;