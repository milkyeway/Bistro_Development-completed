import React, { Component } from 'react';
import {
  ListGroup,
  Container,
  Accordion,
  Button,
  Form,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import MemberList from '../Login_S/MemberList';
import Footer from '../../components/Navigation_Navber/Footer'



class Member_Point extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      getData: true,
      data_oj: []
    }
  }
  componentDidMount() {
    //文章列表開始
    
    const url='http://localhost:3000/Member_Point/'+localStorage.getItem("member_sid")
    this.requestToServer(url, 'GET')
    
    
    // this.getblog(member_sid, 'GET') 
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
    // console.log('maphere', data_oj )
    // const newData_oj = data_oj.map((item) =>
 data_oj.map((item) =>
    // localStorage.SetItem('member_point',this.state.point)
    localStorage.setItem('member_point', item.point)
        // console.log('item.point='+item.point )
    ) 
    return (
      <>
        <Col lg={12}  >
          <br />
          {data_oj.map((item) =>

          <h1>會員等級:{item.level}</h1>
          )}
          <hr />
          <Card style={{ width: '100%', 'background-image': 'linear-gradient(90deg,#f6dcb9,#eda894)' }}>
            <Card.Body>
              <Row>
                <Col >
                {data_oj.map((item) =>
                  <Card.Text className="text-center" style={{ 'border-right': '1px solid #FFF' }}>
                    <h5>可使用紅利</h5>
                    <p style={{ 'color': 'red' }} >{item.point}</p>
                    {/* localStorage.SetItem('member_point',{item.point}); */}
                    
                  </Card.Text>
                  )
                  }
                </Col>
                <Col lg={6}  >
                {data_oj.map((item) =>
                  <Card.Text className="text-center" >
                    <h5>已使用紅利</h5>
                    <p>{item.used}點</p>
                 
                  </Card.Text>
                  )}
                </Col>
              </Row>

            </Card.Body>
          </Card>
         
        </Col>
      </>
    );
  }
}

export default Member_Point; 