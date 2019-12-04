import React from "react";
import Slider from "react-slick";
import { Card } from 'react-bootstrap'
import '../../style/Latest_events/Swiper_loop_mode.scss'

import { BrowserRouter as Router, Link } from "react-router-dom"

// https://react-slick.neostack.com/docs/example/as-nav-for

export default class Swiper_loop_mode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      data_oj: [],
      sid: "",
      activity_name: "",
      Introduction: "",
      picture: "",
      location: "",
      activity_start_Date: "",
      activity_end_Date: "",
      price: "",
      key: "",
      event_description: "",
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3000/events_rand'
    this.requestToServer(url, 'GET')

    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
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
          activity_name: jsonObject[0].activity_name,
          picture: jsonObject[0].picture,
          activity_start_Date: jsonObject[0].activity_start_Date,
          activity_end_Date: jsonObject[0].activity_end_Date,
        })
      // console.log(jsonObject)
      // console.log(jsonObject)
      // console.log(data_oj)
    } catch (error) {
      // Error
      this.setState({ result: error })
      console.log('錯誤訊息', error)
    }

  }

  render() {
    const { data_oj } = this.state
    return (
      <div>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {data_oj.map(data => {

            const pictures = JSON.parse(data.picture)

            {/* return <Link to={{pathname:`/Latest_events_detail/${data.sid}`}} target="_blank"  key={data.sid}> */ }
            return <Link to={{ pathname: `/Latest_events_detail/${data.sid}` }} key={data.sid}>
              <Card className="swiper_Card_border">
                <Card.Img variant="top" src={`http://localhost/bistro/lib/images/activity/uploads/${pictures[0]}`} />
                <Card.Body>
                  <Card.Title> {data.activity_name}</Card.Title>
                  <Card.Text>
                    <p> {data.activity_start_Date} ~  {data.activity_end_Date}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          })}

        </Slider>
      </div>
    );
  }
}