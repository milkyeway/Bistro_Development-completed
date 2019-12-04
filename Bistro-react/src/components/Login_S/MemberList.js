import React, { Component } from 'react';
import "../../style/Login_V/emojione.min.css"
import Member_Account from './Member_Account'



import {
    ListGroup,
    Col
} from 'react-bootstrap';
import Navigation_Navber_noImg from '../Navigation_Navber/Navigation_Navber_noImg'
import Footer from '../Navigation_Navber/Footer'


    
class MemberList extends Component {
    render() {
        return (
            <>

                <Col lg={3} style={{ 'margin-bottom': '11rem' }}>
                    <Member_Account />
                    <ListGroup>
                        <ListGroup.Item action href="/Member_Order" >我的訂單</ListGroup.Item>  

                        <ListGroup.Item action href="/Member_Notice">
                            {/* 小紅點關鍵字badge (現在用的是react-bootstrap版本) */}
                            公告通知<span class="badge badge-pill badge-danger " >4</span>
                        </ListGroup.Item>
                        <ListGroup.Item action href="/Member_Information">
                            個人資料
        </ListGroup.Item>
                        <ListGroup.Item action href="/Member_Coupon">
                            我的優惠
        </ListGroup.Item>
                        <ListGroup.Item action href="/Member_Point">
                            會員紅利
        </ListGroup.Item>
                        <ListGroup.Item action href="/Member_Share">
                            文章
        </ListGroup.Item>
                        <ListGroup.Item action href="/Member_Events">
                            活動<span class="badge badge-pill badge-danger " style={{}}>1</span>
                        </ListGroup.Item>
                        <ListGroup.Item action href="/">
                            登出
        </ListGroup.Item>
                    </ListGroup>

                </Col>

            </>
        )
    }
}

export default MemberList;
