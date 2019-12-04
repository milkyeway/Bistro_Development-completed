import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink, Switch,Redirect } from "react-router-dom"

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Login_Page extends React.Component {
    // componentDidMount() {

    // }
    constructor(props) {
      super(props)
      console.log(props)
   // console.log("location:" + JSON.stringify(props.location))

      // 這個狀態只是決定要不要重新導向
      this.state = {
        users: [],
        error: null,
        redirectToReferrer: false,
        username: '',
        password: '',
      }
    }
    getUsersAndLogin = () => {
      console.log('click');
      // const url = 'http://localhost:5555/users'
      const url = 'http://localhost:8000/users'
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
          console.log(jsonObject)
        })
        .catch(error => {
          // Error
          this.setState({ result: error })
          console.log('錯誤訊息', error)
        })
    }
  
    login = () => {
      if (!this.state.username) {
        alert('帳號為必填！')
        return
      }
  
      if (!this.state.password) {
        alert('密碼為必填！')
        return
      }
      // console.log(this.state)
      // console.log(typeof this.state.users)
  
      // 因為node express呈現的資料格式是users包users內的資料,故需要多包一層users ex: this.state.users.user
      // const userFindDataIndex = this.state.users.users.findIndex(
      const userFindDataIndex = this.state.users.findIndex(
        user => user.username === this.state.username
      )
      console.log(userFindDataIndex)
  
      if (userFindDataIndex === -1) {
        alert('未註冊的帳號！')
        return
      }
  
      //如果索引值找到的密碼!==現在輸入的密碼
      if (
        // this.state.users.users[userFindDataIndex].password !== this.state.password
        this.state.users[userFindDataIndex].password !== this.state.password
      ) {
        alert('密碼錯誤！')
        return
      }else{
        const sid=this.state.users[userFindDataIndex].member_sid
        localStorage.setItem('member_sid',sid)
        console.log('click2');

      }
     
  
      this.props.authenticate(() => {
        this.setState({ redirectToReferrer: true })
      })
    }
    
  
    // 可控元件通用
    handleChange = event => {
      this.setState({
        // 物件屬性由計算得來
        [event.target.name]: event.target.value
      })
      
    }
    render() {
     let { from } = this.props.location.state || { from: { pathname: '/' } }
     //console.log('from:' + JSON.stringify(from))
      // let { from } = { from: { pathname: '/Member_Information' } }
    //  this.from =  { pathname: '/Member_Information' } ;
   let { redirectToReferrer } = this.state

    // 作重新導向，回到上一頁(如果有記錄的話)，或是首頁(如果沒記錄的話)
    if (redirectToReferrer) return <Redirect to={from} />
        return (
            
            <>
       
            <div className="warn">
                
                <div className="login">
                
                <h4 >登入</h4>
                
                </div>
                
                <div id="login-detail" className="login-tab login-title " >
                    
                    <form className="form-signin" >

                        <div className="form-label-group" >
                        {/* <FontAwesome
                            name='user-circle'
                            style={{ fontSize: "1rem", "margin-right": "1rem"}}
                        />   */}
                         <input 
                         type="text" 
                         placeholder="帳號" 
                         required="required" 
                         autofocus="autofocus"
                         className="line-style inputCell"
                         value={this.state.username}
                         name="username"
                         onChange={this.handleChange}  />
                        </div>
                        <div class="form-label-group" >
                        {/* <FontAwesome
                            name='key'
                            style={{ fontSize: "1rem" , "margin-right": "1rem" }}
                        />  */}
                        <input
                        type="password" 
                        placeholder="密碼" 
                        required="required" 
                        className="line-style inputPassword"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        /></div>
                        <div className="centered" >
                                {/* <Link to="Member_Information">
                                <button onClick={this.getUsersAndLogin}>登入</button>
                                </Link> */}
                                <button onClick={this.getUsersAndLogin}>登入</button>
                        </div>
                        <div className="social-login" >

                            <div className="deco" >使用其他帳號登入</div>
                            <button className="btn fb" >
                                <span className="social-icon fb" >fb</span></button>
                            <button className="btn line" ><span className="social-icon line"
                                    >line</span>
                            </button>
                            
                        </div>
                        <div className="signup-link" ><a>還沒帳號？請註冊</a></div>
                        <Link to="Member_Register"> 註冊</Link>
                        {/* <Link to="./Member_Information3"> 註冊</Link> */}
                        
                        <div className="centered" >註冊即代表同意
                        
                            <a href="/Home" target="_blank" className="blue-link" >使用條款</a>
                            跟<a href="/Home" target="_blank" className="blue-link" >隱私權政策</a></div>
                    </form>

                </div>

            </div>
         
                </>
            
        )
    }
}
export default Login_Page



