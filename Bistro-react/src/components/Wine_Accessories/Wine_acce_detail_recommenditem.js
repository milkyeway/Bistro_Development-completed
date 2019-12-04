import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"
import $ from 'jquery'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//分頁連結


class Wine_acce_detail_recommenditem extends React.Component {
    constructor() {
        super()
        this.state = {
          rands: [],
        };
    }
    //JQ放這
    componentDidMount() {
      fetch('http://localhost:3000/Wine_detail/rand')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({
          rands : responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    render() {
      
      if(this.state.rands && !this.state.rands.length) 
        return <></>
      //解構賦值
      const {rands} = this.state
      // console.log(rands);
        return (
          <>
          {rands.map((items)=>
            <div className="recommend_item d-flex flex-column align-items-center">
              <div className="recommend_pic">
                <img src={`http://localhost/bistro/lib/images/acce/test/${items.product_pic}`} alt=""/>
              </div>
              <p>{items.name}</p>
              <span className="recommend_price">{items.price}</span>
              <button className="btn add_cart_btn"><img src="../images/Wine_Accessories/icon-cart_brown.png" alt=""/>加入購物車
              </button>
            </div>
            )}
          </>
        )
        
       // return (<div></div>)
    }
}
export default Wine_acce_detail_recommenditem