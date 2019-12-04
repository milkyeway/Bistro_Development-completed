import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
// import '../../style/Wine_accessories/Wine_service_detail.scss'
//分頁連結


class Wine_acce_detail_breadcrumb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
}
    //JQ放這
    componentDidMount(){
    }

    
    render() {
        return (
          <>
            <Row>
              <div className="col-12 d-flex align-items-center bread_crumb mt-3">
              <Link to="/"><img className="bread_img" src="../images/Wine_Accessories/icon-home.png" alt="" /></Link>
              <p> > </p>
              <p><Link to="/Wine_accessories">酒具</Link> > </p>
              <p>{this.props.wendy} > </p>
              <p>{this.props.ruby}</p>
              {/* <p  onClick={this.props.handlefilter(this.props.category_2nd)}><Link to={`/wine-acce-item/${this.props.category_2nd}`}>{this.props.ruby}</Link></p>
              <p onClick={this.props.handlefilter(this.props.category_2nd)}>{this.props.ruby}</p> */}
              </div>
            </Row>
          </>
        )
    }
}
export default Wine_acce_detail_breadcrumb