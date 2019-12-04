import React, { Component } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import Carousel from '../components/Home/Carousel'
import Footer from '../components/Navigation_Navber/Footer'
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import {
  ListGroup,
  Container,
  Accordion,
  Button,
  Form,
  Card,
  Row,
  Col,
  Table,
  Nav,
  Tab,
  TabContainer,
  Tabs

} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from "react-router-dom"
import '../style/Login_V/Login_V.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)

    const Swal = require('sweetalert2')
    // console.log(props.location)
    // 這個狀態只是決定要不要重新導向
    this.state = {
      users: [],
      error: null,
      redirectToReferrer: false,
      email: '',
      password: '',
    }
  }
  getUsersAndLogin = () => {
    // const url = 'http://localhost:5555/users'
    const url = 'http://localhost:3000/users'
    this.requestToServer(url, 'GET', {}, this.login)
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
            },
            callback
          )
        // console.log(jsonObject)
      })
      .catch(error => {
        // Error
        this.setState({ result: error })
        console.log('錯誤訊息', error)
      })
  }

  login = () => {
    if (!this.state.email) {
      Swal.fire(
        '帳號未填',
        '格式為Email',
        'error'
      )
      // alert('帳號為必填！')
      return
    }

    if (!this.state.password) {
      Swal.fire(
        '密碼記得填寫',
        '',
        'error'
      )
      return
    }

    // console.log(this.state)
    // console.log(typeof this.state.users)

    // 因為node express呈現的資料格式是users包users內的資料,故需要多包一層users ex: this.state.users.user
    // const userFindDataIndex = this.state.users.users.findIndex(
    const userFindDataIndex = this.state.users.findIndex(
      user => user.email === this.state.email
    )
    // console.log(userFindDataIndex)

    if (userFindDataIndex === -1) {
      Swal.fire(
        '尚未註冊的帳號',
        '',
        'error'
      )
      // alert('未註冊的帳號！')
      return
    }

    if (
      // this.state.users.users[userFindDataIndex].password !== this.state.password
      this.state.users[userFindDataIndex].password !== this.state.password
    ) {
      Swal.fire(
        '密碼錯誤',
        '',
        'error'
      )
      // alert('密碼錯誤！')
      return
    }
    else {
      localStorage.setItem('member_sid', this.state.users[userFindDataIndex].member_sid)
      localStorage.setItem('member_name', this.state.users[userFindDataIndex].name)
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: '登入成功',
        text: '三秒後關閉',
        showConfirmButton: true,
        confirmButtonText: '關閉',
        timer: 3000
      })
    }

    this.props.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })

  }

  // 可控元件通用
  handleChange = event => {
    this.setState({
      // 物件屬性由計算得來
      [event.target.name]: event.target.value,
    })
  }


  handleResponse = (data) => {
    console.log(data);
    localStorage.setItem('member_sid', 260)
    localStorage.setItem('member_name', '顏維德')
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: '登入成功',
      text: '三秒後關閉',
      showConfirmButton: true,
      confirmButtonText: '關閉',
      timer: 3000
    })
    setTimeout(function () {
      window.location.href = '/';
    }, 3000);
  }


  handleError = (error) => {
    this.setState({ error });
  }



  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } }
    let { redirectToReferrer } = this.state

    // 作重新導向，回到上一頁(如果有記錄的話)，或是首頁(如果沒記錄的話)
    if (redirectToReferrer) return <Redirect to={from} />
    // console.log(from)
    // console.log(redirectToReferrer)
    return (
      <>
        <Carousel />
        {/* <Container> */}
        <Row>
          <div className='member-wrap' id=''>
            <div className='member-card_title'>
              Bistro 歡迎您</div>
            <input
              type="text"
              value={this.state.email}
              name="email"
              placeholder="帳號"
              onChange={this.handleChange}
              id="member-font"

            />
            <input
              type="password"
              name="password"
              placeholder="密碼"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button onClick={this.getUsersAndLogin} className="loagin_btn">登入</button>

            <div className="social-login" >
              {/* <div className="deco " >使用其他帳號登入</div>
                            <button className="btn fb" >
                                <span className="social-icon fb" >fb</span></button> */}
              {/* <button className="btn" >
                                <span className="" onClick={this.forget } >忘記密碼</span></button> */}
              {/* <a href="https://www.facebook.com/indulgebistrotaipei/"><i className="fab fa-facebook-f Home_Fome_icon_text"></i></a> */}
              <FacebookProvider appId="569550507199326">
                <LoginButton
                  scope="email"
                  onCompleted={this.handleResponse}
                  onError={this.handleError}
                  onClick={this.loginwade}
                  className="social-loginbtn"
                >
                  <div className="social-login_imgarea">
                    <a href="https://www.facebook.com/indulgebistrotaipei/" className="social-login_img">
                      <i className="fab fa-facebook-f Home_Fome_icon_text"></i>
                    </a>
                    {/* <img src={"../../images/Wine_Accessories/icon_fb.svg"} className="social-login_img">
                    </img> */}
                  </div>
                </LoginButton>
              </FacebookProvider>
              {/* <br></br> */}

            </div>
            <div className="register_login">
              <div className="signup-link " ><a>還沒帳號？請</a></div>
              <Link to="/Member_Register" className="load_login"> 註冊</Link>
            </div>

          </div>
        </Row>
        {/* </Container> */}
        <Footer />
      </>
    )
  }
}

export default Login
