import React from 'react'
//滑動漸顯
import AOS from 'aos';
//Email
import axios from 'axios';
import { Email, Item, Span, A, renderEmail } from 'react-html-email'
//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../style/HomeContainer_News/Home_Fome.scss'

class Home_Fome extends React.Component {
    componentDidMount() {
        AOS.init({
            duration: 1000
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        };        
    }
    handleSubmit = (e) => {
        console.log('333')
        console.log(this.state)
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:3000/send",
            data: this.state
        }).then((response) => {
            if (response.data.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {
        this.setState({ name: '', email: '', message: '' })
    }
    render() {
        return (
            <>
                <div className="Home_Fome_bg position-relative">
                    <Container className="mg-auto position-absolute Home_Fome_container">
                        <Row className="d-flex mg-auto" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                            <Col lg={4} md={12} sm={12} data-aos='fade-up' className="d-flex flex-column align-items-start">
                                <div className="Home_Fome_text d-flex flex-column mb-auto">
                                    <p>官方客服</p>
                                    <p>Email：service@iii.com.tw</p>
                                    <p>LINE：請搜尋＠Bistro</p>
                                </div>
                                <div className="Home_Fome_icon d-flex">
                                    <a href="https://www.facebook.com/indulgebistrotaipei/"><i className="fab fa-facebook-f Home_Fome_icon_text"></i></a>
                                    <a href="https://www.youtube.com/watch?v=4619_NQHasI"><i className="fab fa-youtube Home_Fome_icon_text"></i></a>
                                    <a href="tel:+886-910570160"><i className="fas fa-phone Home_Fome_icon_text"></i></a>
                                    <a href="https://www.instagram.com/explore/tags/bistro/?hl=zh-tw"><i className="fab fa-instagram Home_Fome_icon_text"></i></a>
                                </div>
                            </Col>
                            <Col lg={8} md={12} sm={12} data-aos='fade-up'>
                                <from id="contact-form" onSubmit={this.handleSubmit} className="Home_Fome_input d-flex flex-column" method="POST">
                                    <div className="form-group">
                                        <label htmlFor="name" style={{color:"var(--main-white)" }}>Name</label>
                                        <input type="text" className="form-control Home_Fome_inputname w-100 Home_Fome_textCND"
                                            id="name" placeholder="Name" value={this.state.name} onChange={this.onChangeEmail} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" style={{color:"var(--main-white)"}}>Email address</label>
                                        <input type="email" className="form-control Home_Fome_inputname w-100 Home_Fome_textCND"
                                            id="email" aria-describedby="emailHelp" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} />
                                    </div>
                                    <div className="form-group">
                                        <label className="input_Message" htmlFor="message" style={{color:"var(--main-white)"}}>Message</label>
                                        <textarea className="form-control Home_Fome_inputname w-100" rows="5" id="message" value={this.state.message} placeholder="Message" onChange={this.onChangeEmail} />
                                    </div>
                                    {/* <button type="submit" className="Home_Fome_input_btn">Submit</button> */}
                                    <input type="button"  className="Home_Fome_input_btn" value="Submit"  onClick={this.handleSubmit} />
                                </from>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
    onChangeEmail = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
}
export default Home_Fome
