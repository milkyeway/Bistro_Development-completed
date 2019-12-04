import React, { Component } from 'react';
import "../../style/Login_V/Login_V.scss"
import { Row } from 'react-bootstrap';


class Member_account extends Component {
    render() {
        return (
            <>
                <div>
                    <Row className="justify-content-md-center" style={{ margin: '20px' }}>
                        <div className="user-menu mobile" >
                            <div className="profile-shot" >
                                <div className="user-photo" >
                                    <img src={"../images/user0.png"} alt="" style={{ width: 56, height: 56 }} />
                                </div>
                            </div>
                            <div className="name" style={{color:'black'}}>
                               <h3>Hi! {localStorage.getItem('member_name')} </h3> 
                                </div>
                            <div className="d-flex follow-info align-items-center" >
                                {/* <div className=""> */}
                                <div className="profile-menu" >
                                </div>
                            </div>
                        </div>

                    </Row>
                </div>

            </>
        )
    }
}

export default Member_account; 