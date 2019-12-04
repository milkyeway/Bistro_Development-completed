import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom"
import {

  Accordion,

  Card,
  Row,
  Col,
  Table
} from 'react-bootstrap';

class Member_Share extends Component {
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
    const url = 'http://localhost:3000/blog_Limit5'

    this.requestToServer(url, 'GET')
    
    const member_sid='http://localhost:3000/member_blog_favorites/'+localStorage.getItem("member_sid")
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

      console.log(jsonObject)
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
        <Col lg={12}  >
          <br />
          <h1>訂閱的文章</h1>
          <hr />
          
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              主題
                                            </Accordion.Toggle>
            <Card.Body>
              <Accordion defaultActiveKey="1">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>標題 </th>
                      <th>連結</th>
                      <th>最後回應時間</th>
                    </tr>
                  </thead>
                  {data_oj.map((item) =>
                    <tbody>
                      <tr>
                        <td>.</td>
                        <td> {item.title}</td>
                        <td><a href={`/Blog_article/${item.sid}`}>Read More</a></td>
                        <td>{item.updatedAt.replace("T", " ").replace(".000Z", " ")}</td>
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
{/* <Link to="/Blog_article/"> */ }
export default Member_Share; 