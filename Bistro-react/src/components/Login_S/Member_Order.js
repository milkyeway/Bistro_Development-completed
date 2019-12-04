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
    Table,

} from 'react-bootstrap';
import MemberList from './MemberList';
import Member_account from './Member_Account'
import Member_Order_accessories from './Member_Order_accessories'
import Member_Order_activity from './Member_Order_activity'
import Member_Order_allstore from './Member_Order_allstore'
import Member_Order_list_easy from './Member_Order_list_easy'
import Member_Order_wine_goods from './Member_Order_wine_goods'
import Navigation_Navber from '../Navigation_Navber/Navigation_Navber'
import Footer from '../Navigation_Navber/Footer'

class Member_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            getData: true,
            data_oj: [],

            order_date: "",
            total: "",
            order_id: "",
            testsid: "",
        }
    }
    componentDidMount() {
        const sid = localStorage.getItem('member_sid')
        this.setState.testsid = sid
        console.log(this.testsid)
        console.log(sid)
        const url = 'http://localhost:3000/order_list_easy/' + sid
        console.log(sid)
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

        return (
            <>
                {/* {const sid = localStorage.getItem('member_sid')
            if(sid==1){

            }} */}
                <Col lg={9}  >
                    <br />
                    <h1>訂單</h1>
                    <hr />
                    {data_oj.map((item) =>
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" style={{ color: "black" }}>
                                    訂單:717
                            </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    {/* <th>商品編號</th> */}
                                                    <th>商品名稱</th>
                                                    <th>數量</th>
                                                    <th>單價</th>
                                                    <th>總額</th>
                                                    {/* <th>預約時間</th> */}
                                                </tr>
                                            </thead>
                                            <Member_Order_accessories />
                                            <Member_Order_wine_goods />
                                            <Member_Order_activity />
                                            <Member_Order_allstore />


                                            <tbody>
                                                <tr>
                                                    {/* <td></td> */}
                                                    <td>訂單時間
                                                    <br />
                                                        {item.order_date}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>訂單總額
                                                    <br />
                                                        {item.total}</td>
                                                    {/* <td></td> */}
                                                </tr>
                                            </tbody>

                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    )}
                    {localStorage.getItem('member_sid') == 1 ?
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" style={{ color: "black" }}>
                                    訂單:716
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>商品名稱</th>
                                                    <th>數量</th>
                                                    <th>單價</th>
                                                    <th>總額</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>DIVA系列 波爾多紅酒杯</td>
                                                    <td>2</td>
                                                    <td>1700</td>
                                                    <td>3400</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>Mikasa 紋飾紅酒杯</td>
                                                    <td>2</td>
                                                    <td>1400</td>
                                                    <td>2800</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>法國艾斯莊園 奧秘 律沙克-聖愛濃紅酒</td>
                                                    <td>10</td>
                                                    <td>1600</td>
                                                    <td>16000</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>2019 小聚酒市 新竹冬儲酒展</td>
                                                    <td>10</td>
                                                    <td>350</td>
                                                    <td>3500</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>第一屆 續攤：廟埕葡萄酒辦桌</td>
                                                    <td>4</td>
                                                    <td>2500</td>
                                                    <td>10000</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>訂單時間
                                                <br />
                                                        2019-12-23 01:30:15
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        訂單總額
                                                    <br />
                                                        35700</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        : ''}
                    {localStorage.getItem('member_sid') == 1 ?

                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" style={{ color: "black" }}>
                                    訂單:715
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table responsive>
                                            <thead>
                                                <tr>

                                                    <th>商品名稱</th>
                                                    <th>數量</th>
                                                    <th>單價</th>
                                                    <th>總額</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>14度傾斜系列白酒杯</td>
                                                    <td>3</td>
                                                    <td>1400</td>
                                                    <td>4200</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>義大利 瑪翠酒莊 巴蒂歐拉紅酒</td>
                                                    <td>20</td>
                                                    <td>880</td>
                                                    <td>17600</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>訂單時間
                                                <br />
                                                        2019-12-16 13:29:35
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        訂單總額
                                                    <br />
                                                        21800</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        : ''}
                </Col>

            </>
        );
    }
}

export default Member_Order; 