import React from 'react'
import ScrollUpButton from "react-scroll-up-button";
//樣式
import '../../style/Latest_events/Latest_events_collect.scss'
import { Link, withRouter } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import CardRow from './CardRow'
import Pagination_btn from './Pagination_btn'

import Dropdown_Button from './Dropdown_Button'
import FilterOption from './FilterOption'
import $ from 'jquery'

class Latest_events_collect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      getData: true,
      data_oj: [],
      city: "",
      price: "",
      filter: [],
      // counts:0,
      key: "",
      picture: "",
      activity_name: "",
      location: "",
      event_description: "",
      Introduction: "",
      activity_start_Date: "",
      activity_end_Date: "",
    }
    // console.log(this.state.data_oj)
  }
  componentDidMount() {
    const url = 'http://localhost:3000/latest_events_pages/1'
    this.requestToServer(url, 'GET')
  }

  componentDidUpdate(prevProps) { /* Latest_events_collect.js不再首頁的router上 所以需要withRouter才能用match */
    if (this.props.match.params.page !== prevProps.match.params.page) {
      // console.log(this.props)
      const url = ("http://localhost:3000/Latest_events_pages/" + this.props.match.params.page)
      // console.log(666666666666666)
      this.requestToServer(url, 'GET')
    }
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
          // counts:jsonObject.counts,
        })

      // console.log(jsonObject)
    } catch (error) {
      // Error
      this.setState({ result: error })
      console.log('錯誤訊息', error)
    }

    // fetch(req)
    //   .then(response => {
    //     // 直接轉換JSON格式為物件、字串、數字…
    //     return response.json()
    //   })
    //   .then(jsonObject => {
    //     // jsonObject會是一個JavaScript物件
    //     if (method === 'GET')
    //       this.setState({
    //         data_oj: jsonObject,
    //       })
    //     console.log(jsonObject)
    //   })
    //   .catch(error => {
    //     // Error
    //     this.setState({ result: error })
    //     console.log('錯誤訊息', error)
    //   })

  }

  // regionfilter=(event)=>{ // 傳event效能較好 但Dropdown沒有value屬性
  regionfilter = (value) => () => {
    // console.log(event)
    // console.log(event.currentTarget)
    // console.log(event.currentTarget.value)
    // console.log(event.currentTarget.constructor.name)

    // fetch('http://localhost:3000/Latest_events/'+event.currentTarget.value)
    fetch('http://localhost:3000/Latest_events/' + value)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data_oj: responseJson,
        });
        // console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { data_oj } = this.state
    return (
      <>
        {/* <Navigation_Navber /> */}
        <ScrollUpButton style={{ width: 30, height: 30 }} ToggledStyle={{ right: 10, bottom: 70 }} />

        <Container className="Latest_events_collect_bgc">

          <Dropdown_Button regionfilter={this.regionfilter} />

          <Row>

            <FilterOption regionfilter={this.regionfilter} />

            <Col sm={10}>
              <Row style={{'justify-content':'center'}}>
                {data_oj.map(data => {
                  const pictures = JSON.parse(data.picture) // 我資料庫圖片用陣列存多張,所以data.picture會拿到字串,需要JSON.parse解成陣列
                  return <CardRow
                    key={data.sid}
                    sid={data.sid}
                    activity_name={data.activity_name}
                    event_description={data.event_description}
                    Introduction={data.Introduction}
                    picture={pictures[0]}
                    activity_start_Date={data.activity_start_Date}
                    activity_end_Date={data.activity_end_Date}
                    price={data.price}
                    location={data.location}
                    event_description={data.event_description}
                  />
                })}
              </Row>
            </Col>

          </Row>


        </Container>
        <br />
        <Container className="events_Pagination">

          <Pagination_btn current={this.props.match.params.page} />

        </Container>
        {/* <Footer /> */}
        {/* <CardRow
            /> */}
      </>
    )
  }
}


export default withRouter(Latest_events_collect)