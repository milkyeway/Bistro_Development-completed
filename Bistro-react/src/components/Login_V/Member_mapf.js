import React, { Component } from 'react';
import {
  ListGroup,
  Container,
  Accordion,
  Button,
  Form,
  Card,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import MemberList from '../Login_S/MemberList';
import Footer from '../Navigation_Navber/Footer'



class Member_mapf extends Component {
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
     let barLike=localStorage.getItem('barLike');
    if (barLike === undefined) {
    let barLike=localStorage.setItem('barLike','');
    //  var fornem= new Array();
    // fornem=barLike.split(','); //字元分割
    // var fornems=fornem.toString
  // console.log(fornem.length+'barLike')

    const url='http://localhost:3000/member_allstorefav/'+barLike
    // const url='http://localhost:3000/member_allstorefav/'+fornems
    this.requestToServer(url, 'GET')
    // console.log(url+'url')
    } else {
     
  // console.log(fornem.length+'barLike')

    const url='http://localhost:3000/member_allstorefav/'+barLike
    // const url='http://localhost:3000/member_allstorefav/'+fornems
    this.requestToServer(url, 'GET')
    }
   
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
    return (
      <>
     <Col lg={12}  >
          <br />
          <h1>喜好店家</h1>
          <hr />
          
          <Card bg="dark" text="white" >
            <Accordion.Toggle as={Card.Header} eventKey="0">
              
                                            </Accordion.Toggle>
            <Card.Body>
              <Accordion defaultActiveKey="1">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th></th>
                      <th>店家名稱 </th>
                      <th>電話</th>
                      <th>地址</th>
                    </tr>
                  </thead>
                  {data_oj.map((item) =>
                    <tbody>
                      <tr>
                        <td>.</td>
                        <td> {item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  }
}
        {/* {data_oj.map((item) =>
                    <tbody>
                      <tr>
                       
                        <td> 商家名稱:{item.name}</td>
                        <td>商家電話:{item.phone}</td>
                        <td>商家地址:{item.address}</td>
                      </tr>
                    </tbody>
                  )} */}
    

         


export default Member_mapf; 