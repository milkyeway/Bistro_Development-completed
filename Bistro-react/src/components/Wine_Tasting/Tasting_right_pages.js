import React from 'react'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_index.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

import $ from 'jquery'

class Tasting_right_pages extends React.Component {
    constructor() {
        super()
    }
    //JQ放這
    componentDidMount() {
    }

    render() {
        return (
          <>
            <div className="page d-flex justify-content-center">
              <div className="page_num">1</div>
              <div className="page_num">2</div>
              <div className="page_num">3</div>
              <div className="page_num">4</div>
              <div className="page_num">5</div>
            </div>
          </>
        )
    }
}
export default Tasting_right_pages