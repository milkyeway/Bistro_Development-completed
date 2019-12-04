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
    Modal
} from 'react-bootstrap';
import MemberList from '../Login_S/MemberList';



class Member_Card extends Component {
    render() {
        return (
        
            <Card  style={{ width: '18rem','background-color': 'rgb(148, 181, 163)'}}>
            <Card.Body>
              <Card.Title>會員註冊折價券</Card.Title>
              <Card.Text>
               <h1 className="text-center">100元</h1>    
                <p>
              非特價單品消費滿1000元可折抵100元</p>
              </Card.Text>
              <Button variant="primary">使用</Button>
            </Card.Body>
          </Card>
       
        );
    }
}

export default Member_Card; 