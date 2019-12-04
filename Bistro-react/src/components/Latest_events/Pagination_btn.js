/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link,withRouter } from "react-router-dom"
import Pagination from 'rc-pagination';
import '../../style/Latest_events/Pagination_btn.scss'

import 'rc-pagination/assets/index.css';

class Pagination_btn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, // 目前頁數
      total:1, //總比數
    };
    // console.log("1111111111111111")

  }
  onChange = (page) => {
    // console.log("page: ",page);
    this.setState({
      current: page,
    });

    this.props.history.push(`/Latest_events_pages/${page}`) // 連到目前頁數
  }

  componentDidMount() {
    this.setState({
      total:this.props.counts*10,
      // current:this.props.match.params.page
    });
    // console.log(this.props.counts)
    // console.log("33333333333333333")
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
          data_oj: jsonObject.rows,
          counts:jsonObject.counts,
        })

    } catch (error) {
      // Error
      this.setState({ result: error })
      console.log('錯誤訊息', error)
    }
  }

  render() {
    // console.log(this.props.counts)
    // console.log("current ",this.state.current)
    // this.setState({current:this.props.match.params.page})
    // console.log("222222222222222222")
    // console.log("this.props.match.params.page ",this.props.match.params.page)
    return (
      <div>
        {/* <Link to={{pathname:`/Latest_events_pages/${this.state.current}`}}> */}
        <Pagination
          onChange={this.onChange}
          current={this.state.current}
          total={50}
          showLessItems
          showTitle={false}
        />
        {/* </Link> */}
      
      </div>
    );
  }
}
export default withRouter(Pagination_btn)