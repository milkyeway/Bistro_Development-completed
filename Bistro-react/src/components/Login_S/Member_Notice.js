import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
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

class Member_Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      getData: true,
      data_oj: [],
      city: "",
      price: "",

      sid: "",
      picture: "",
      activity_name: "",
      location: "",
      Introduction: "",
      activity_start_Date: "",
      activity_end_Date: "",
    }
  }
  componentDidMount() {
    const url = 'http://localhost:3000/latest_events_Limit5'

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
    console.log(data_oj)

    return (
      <>
        <Col lg={9} >
          <br />
          <h1>活動資訊</h1>
          <hr />

          {data_oj.map((item) =>
            <Accordion defaultActiveKey="1">
              {/* {console.log(item.activity_start_Date)} */}
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" style={{ color: "black" }}>
                  {item.activity_name}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className=" " >
                    <p>{item.activity_start_Date}~{item.activity_end_Date}</p>
                    <br />
                    {item.event_description}
                    <hr />
                    <Button className="pull-right mb-3"  variant="warning" onClick={() => { this.props.history.push(`/Latest_events_detail/${item.sid}`) }}>更多消息</Button>
                    {/* <button variant="warning" onClick={() => { this.props.history.push(`/Latest_events_detail/${item.sid}`) }}>更多消息</button> */}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )}
        </Col>

      </>
    );
  }
}

export default withRouter(Member_Notice);