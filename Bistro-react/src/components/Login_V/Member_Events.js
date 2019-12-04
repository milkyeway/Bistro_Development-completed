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



class Member_Events extends Component {
  constructor() {
    super();
    this.state = {
     pagename: 'Member_Events',
    };
   
  }
  render() {
    return (
      <>
            <Col lg={9}  >
              <br />
              <h1>預定的活動</h1>
              <hr />

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  活動
                                            </Accordion.Toggle>

                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>標題 </th>
                        <th>地址</th>
                        <th>活動時間</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>品酒沙龍</td>
                        <td>信義區</td>
                        <td>2019-01-01</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>歷史紅酒會</td>
                        <td>台北市民權東路三段191巷8號B1</td>
                        <td>2019-01-01</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>品酒三部曲</td>
                        <td>大安區</td>
                        <td>已過期</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>

              </Card>
</Col>
      </>
    );
  }
}

export default Member_Events; 