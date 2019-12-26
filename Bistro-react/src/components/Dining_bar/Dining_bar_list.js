import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";
import "../../style/Dining_bar/Dining_bar_list.scss";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  InfoWindow,
  InfoBox
} from "@react-google-maps/api";

import { ReactComponent as Heart } from "../../images/like_white.svg";
import Map from "./Map.json";
import { Card, Button } from "react-bootstrap";
import Dining_bar_detail from "./Dining_bar_detail";
import Dining_bar_filter from "./Dining_bar_filter";
import Loading from "./Loading";
import $ from "jquery";

// import StoreList from "./page/StoreList";

class Dining_bar_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idtext: "",
      animation: "",
      latlng: { lat: 25.041588, lng: 121.543808 },
      getData: true,
      data: [],
      alldata: [],
      city: "",
      type: [],
      mylike: false,
      service: [],
      filtertoggle: true,
      price: [300, 2000],
      showmap: true
    };
  }

  // 點擊座標
  handleInfo = (arr) => () => {
    this.setState({
      // latlng: {
      //   lat: parseFloat(arr.latlng.split(",")[0]),
      //   lng: parseFloat(arr.latlng.split(",")[1])
      // },
      idtext: arr.sid
    });
  };
  //列表hover時觸發地圖infowindow
  // showInfo = (e) => {
  //   this.setState({
  //     hover: true
  //   });
  // };
  //同上觸發彈跳座標事件
  boundmarker = (arr) => (e) => {
    // console.log(e.target);
    // console.log(arr.sid);
    setTimeout(() => {
      this.setState({
        latlng: {
          lat: parseFloat(arr.latlng.split(",")[0]),
          lng: parseFloat(arr.latlng.split(",")[1])
        },
        animation: 1,
        idtext: arr.sid
      });
    }, 400);
  };
  //移開列表座標停止跳動
  stopbound = (arr) => {
    // console.log(this.state.idtext);
    if (this.state.idtext) {
      //如果有值才設定
      this.setState(
        {
          animation: "",
          idtext: ""
        }
        // console.log(this.state.idtext)
      );
    }
  };

  //篩選地區或餐廳type(只選單一的狀況)
  searchPlace = async (value) => {
    //控制
    let m_id = localStorage.getItem("member_sid");
    // let searchdata = { value, m_id };
    try {
      const response = await fetch(
        `http://localhost:3000/Dining_pub_inquiry/` + value,
        {
          method: "GET"
        }
      );
      const json = await response.json();
      // console.log(json);

      this.setState({
        city: value.indexOf("市") > 0 ? value : this.state.city, //確定送進來的是地區才存狀態
        type: value.indexOf("市") > 0 ? this.state.type : value, //確定送進來的是餐廳type才存狀態
        getData: !this.state.getData,
        data: json.info,
        alldata: json.info,
        likedata: json.mylike,
        price: [300, 2000],
        service: []
      });
      if (!response.ok) {
        throw Error(response);
      }
    } catch (error) {
      console.log(error);
    }

    // this.doFiliter(value);
  };

  // 篩選地區跟餐廳type(複選的狀況)
  doFiliter = (...[value]) => {
    // console.log(...[value]);

    //如果傳得值是餐廳類型
    if (value.indexOf("市") < 0 && this.state.city === "") {
      //傳的類型如果重複把陣列裡重複的值(餐廳類型)丟出，不然就新加入陣列
      if (this.state.type.includes(value)) {
        let a = this.state.type.filter((element) => {
          return value !== element;
        });
        this.searchPlace(a);
      } else {
        this.searchPlace([...[...this.state.type], value]);
      }
      return;
    }
    //如果先傳地區(單選)時
    if (value.indexOf("市") > 0 && this.state.type.length === 0) {
      this.searchPlace(value);
      return;
    }
    //如果先傳餐廳類型再傳地區時
    if (
      value !== false &&
      (this.state.type.length !== 0 || this.state.city !== "")
    ) {
      //同第一個判斷確認state裡面已有餐廳狀態要排除
      //然後裡面用"市"確定傳進來是地點還是餐廳類型，確定type是有排除或是要新增進陣列
      let myfilter, type;
      if (this.state.type.includes(value)) {
        myfilter = this.state.type.filter((element) => {
          return value !== element;
        });
        type = value.indexOf("市") > 0 ? this.state.type : [...myfilter];
      } else {
        myfilter = this.state.type.map((element) => {
          return element;
        });
        type = value.indexOf("市") > 0 ? this.state.type : [value, ...myfilter];
      }

      let place = value.indexOf("市") > 0 ? value : this.state.city;
      try {
        fetch(
          `http://localhost:3000/Dining_pub_inquiry/` + place + "/" + type,
          {
            method: "GET"
          }
        )
          .then((response) => response.json())
          .then((json) => {
            if (json.length !== 0) {
              this.setState({
                city: place, //確定送進來的是地區才存狀態
                type: type, //確定送進來的是餐廳type才存狀態
                getData: !this.state.getData,
                data: json.info,
                alldata: json.info,
                price: [300, 2000],
                service: ""
              });
            } else {
              alert("無符合資料");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //我的最愛 todo 判斷新增還是刪除改資料表
  love = (event) => {
    let member_sid = localStorage.getItem("member_sid");
    if (member_sid === null) {
      alert("請先登入");
    } else {
      fetch("http://localhost:3000/Dining_bar_favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: member_sid,
          storeId: this.state.idtext,
          mylike: +localStorage.getItem("barLike").includes(this.state.idtext)
            ? true
            : false
          // localStorage裡的資料有沒有包含要傳的數字，有代表要刪掉沒有代表要新增
        })
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === null) {
            alert("若未登入您的最愛店家無法登入");
          } else {
            let love_store = json.map((filter) => {
              return filter.product_id;
            });
            // console.log(typeof love_store[0]);
            localStorage.setItem("barLike", love_store);
            this.setState({ getData: !this.state.getData }); //, sendlike()
          }
        });
    }
  };
  //撈出所有資料跟最愛的店，並存入localstorage
  componentDidMount() {
    if (this.state.getData) {
      //從localstorage取id
      // localStorage.getItem("member_sid") ||
      // localStorage.setItem("member_sid", 0);
      localStorage.getItem("barLike") || localStorage.setItem("barLike", []);
      let m_id = localStorage.getItem("member_sid") || 0;
      // console.log(m_id);
      //讓動畫去跑
      setTimeout(() => {
        fetch(`http://localhost:3000/Dining_pub_inquiry/` + m_id, {
          method: "GET"
        })
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              data: json.info,
              alldata: json.info
              // likedata: json.mylike
            });
            console.log(json);
            if (json.mylike !== undefined) {
              let love_store = json.mylike.map((filter) => {
                return filter.product_id;
              });
              localStorage.setItem("barLike", love_store);
            }
          });
      }, 2000);

      //等待動畫
      var cnt = document.getElementById("count");
      var water = document.getElementById("water");
      var percent = cnt.innerText;
      var interval;
      interval = setInterval(function() {
        percent++;
        cnt.innerHTML = percent;
        water.style.transform = "translate(0" + "," + (100 - percent) + "%)";
        if (percent === 100) {
          clearInterval(interval);
        }
      }, 60);
    }
  }
  //用路徑傳遞商家詳細資料route
  console = (props) => (event) => {
    window.pageYOffset = event.pageY;
    // console.log(window.pageYOffset);
    // console.log(window);
    // console.log(event.pageY);
    // console.log(event);
    this.props.history.state = props;
  };
  // 手機板篩選toggle
  showfilter = () => {
    let m_filter = document.getElementsByClassName("m_filter")[0];
    let web_filter = document.getElementsByClassName("web-filter")[0];

    $(".filter_btn.btn.btn-primary").hide();
    $(".icon-cross-area").show();

    // if (this.state.filtertoggle) {
    //   m_filter.style.display = "block";
    //   web_filter.style.display = "none";
    //   // m_filter.style.display = "flex";
    //   // place_filter.style.display = "block";
    // } else {
    //   m_filter.style.display = "none";
    //   web_filter.style.display = "block";
    //   // place_filter.style.display = "";
    // }
    this.setState({ filtertoggle: !this.state.filtertoggle });
  };

  // 判斷今天日期跟資料庫的時間
  handleTime = (arr) => {
    let today = new Date().getDay();
    let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    switch (week[today]) {
      case "Monday":
        return `星期一:${arr.Monday}`;
      case "Tuesday":
        return `星期二:${arr.Tuesday}`;
      case "Wednesday":
        return `星期三:${arr.Wednesday}`;
      case "Thursday":
        return `星期四:${arr.Thursday}`;
      case "Friday":
        return `星期五:${arr.Friday}`;
      case "Saturday":
        return `星期六:${arr.Saturday}`;
      case "Sunday":
        return `星期日:${arr.Sunday}`;
      default:
        return "未提供";
    }
  };
  // 篩選價格
  priceFilter = (event, value) => {
    // let myfilter = (value) => {   };
    let price_arr = this.state.alldata.slice();
    let a = price_arr.filter((element) => {
      return value[0] < +element.how_much && +element.how_much < value[1]; //待測試組合寫貌似有bug
    });
    if (a.length > 0) {
      this.setState({
        data: a,
        price: value
      });
    } else {
      alert("無符合資料");
    }
  };
  //副篩選功能
  s_service = (event) => {
    //如果點選時資料已用價格篩選(有篩選過就用已篩選的繼續篩)
    let service_arr;
    // let subFilter = {
    //   type: this.state.type,
    //   city: this.state.city,
    //   service: this.state.service
    // };
    // fetch("http://localhost:3000/Dining_pub_inquiry/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ subFilter })
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log(json);
    //   });
    if (
      this.state.price[0] !== 300 ||
      this.state.price[1] !== 2000 ||
      this.state.city !== "" ||
      this.state.type.length !== 0
    ) {
      console.log(654);
      service_arr = this.state.data.slice();
    } else {
      console.log(777);
      service_arr = this.state.alldata.slice();
    }
    //篩選的資料是否先前已點過，點過(true)就回傳
    let a = service_arr.filter((element) => {
      if (this.state.service.indexOf(event.target.value) >= 0) {
        return element.service.indexOf(event.target.value) < 0;
      } else {
        return element.service.indexOf(event.target.value) >= 0;
      }
    });
    console.log(this.state.service);
    console.log(a);
    //判斷副篩選傳的值是勾選還是取消，已在篩選條件裡就丟掉，沒有就加入
    if (a.length > 0) {
      if (this.state.service.indexOf(event.target.value) >= 0) {
        this.setState(
          {
            data: a,
            service: this.state.service.filter((element) => {
              return element !== event.target.value;
            }) //[event.target.value, ...this.state.service]
          },
          console.log(this.state.service)
        );
      } else {
        this.setState(
          {
            data: a,
            // service: [event.target.value, ...this.state.service]
            service: ""
          },
          console.log(this.state.service)
        );
      }
    } else {
      alert("無符合資料");
    }
  };
  //mapToggle 顯示地圖並改變列表css
  mapToggle = () => {
    console.log(this.state.showmap);
    if (this.state.showmap) {
      let cardWrap = document.getElementsByClassName("card-wrap")[0];
      cardWrap.className = "flow_card";
      // console.log(cardWrap.style);
      // console.log(cardWrap);
    } else {
      let cardWrap = document.getElementsByClassName("flow_card")[0];
      cardWrap.className = "card-wrap";
    }

    this.setState({ showmap: !this.state.showmap });
  };

  cross = () => {
    // $(".icon-cross-area").click(function() { });
    console.log(this.state.filtertoggle);
    // $(this).hide();

    if (!this.state.filtertoggle) {
      $(".filter_btn").show();
      $(".icon-cross-area").hide();
      $(".m_filter").hide();
      $(".web_type").hide()
      this.setState({ filtertoggle: !this.state.filtertoggle });
    } else {
      $(".filter_btn").hide();
      $(".icon-cross-area").show();
      $(".m_filter").show();
      $(".web_type").show()
      this.setState({ filtertoggle: !this.state.filtertoggle });
    }
  };

  render() {
    let k = 0;
    // console.log(this.state);
    if (this.state.data.length === 0) return <Loading />;
    return (
      <Router>
        <div className="d-flex filter-wrap">
          <Button className="filter_btn" onClick={this.cross}>
            <img
              className="dining_bar_icon"
              src="images/dining_bar/filter.svg"
              alt="篩選"
            />
            <span>篩選</span>
          </Button>
          <div className="icon-cross-area" onClick={this.cross}>
            <img
              className="icon-cross"
              src="../images/Wine_Accessories/icon-cancel.png"
            />
          </div>
          <Dining_bar_filter
            doFiliter={this.doFiliter}
            city={this.state.city}
            data={this.state.data}
            type={this.state.type}
            price={this.state.price}
            priceFilter={this.priceFilter}
            mapToggle={this.mapToggle}
            showmap={this.state.showmap}
            s_service={this.s_service}
            service={this.state.service}
          />
        </div>
        <div className="maplist">
          {/* 左邊card */}
          <div className="card-wrap">
            {this.state.data.map((arr, i) => (
              <Card
                key={i}
                onMouseLeave={this.stopbound}
                onMouseEnter={this.boundmarker(arr)}
              >
                <Card.Img
                  variant="top"
                  src={`images/${arr.preview_pic}`}
                  style={{
                    overflow: "hidden",
                    objectFit: "cover"
                  }}
                />
                <Card.Body>
                  <Card.Title>{arr.name}</Card.Title>
                  <h6>{arr.address}</h6>
                  <h6>營業時間: {this.handleTime(arr)}</h6>
                  <Button
                    variant="primary"
                    as={Link}
                    to={{
                      pathname: `/Dining_bar_detail/${arr.sid}`,
                      state: arr
                    }}
                    onClick={this.console(arr)}
                  >
                    {/* <Link to="/Dining_bar_detail" /> */}
                    預約店家
                  </Button>
                  <span>${arr.how_much}</span>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Switch>
            <Route
              path="/Dining_bar_detail/:id?"
              exact
              component={Dining_bar_detail}
            />
          </Switch>

          {/* 右邊地圖 依照狀態出現或消失 */}
          {this.state.showmap ? (
            <LoadScript
              key={k++}
              id="script-loader"
              googleMapsApiKey="AIzaSyAadMvzelzRIjMSAZyGh8UoUpckWI-8Q6w"
              // {...other props}
            >
              <GoogleMap
                id="marker-example"
                // mapContainerStyle={{
                //   height: "100vh",
                //   width: "60%"
                // }}
                zoom={8}
                center={
                  this.state.latlng || { lat: 25.041588, lng: 121.543808 }
                }
                options={{ styles: Map }}
                onDrag={this.stopbound}
              >
                <MarkerClusterer
                  key={k--}
                  options={{
                    imagePath:
                      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                  }}
                  minZoom={7}
                  // onClick={this.showInfo}
                >
                  {(clusterer) =>
                    this.state.data.map((arr, i) => (
                      <>
                        <Marker
                          key={arr.sid}
                          animating={true}
                          animation={
                            arr.sid === this.state.idtext
                              ? this.state.animation
                              : ""
                          }
                          // animation="google.maps.Animation.BOUNCE"
                          clusterer={clusterer}
                          position={{
                            lat: parseFloat(arr.latlng.split(",")[0]),
                            lng: parseFloat(arr.latlng.split(",")[1])
                          }}
                          title={arr.name}
                          onClick={this.handleInfo(arr)}
                        />
                        <InfoBox
                          key={arr.name}
                          position={{
                            lat: parseFloat(arr.latlng.split(",")[0]),
                            lng: parseFloat(arr.latlng.split(",")[1])
                          }}
                          options={{
                            isHidden:
                              this.state.idtext === arr.sid ? false : true,
                            boxClass: arr.name,
                            closeBoxURL: "",
                            enableEventPropagation: true,
                            disableAutoPan: true
                          }}
                        >
                          {/* <Card key={arr.sid} style={{ width: "15rem" }}> */}
                          {/* <Card.Img
                              variant="top"
                              src={`images/${arr.preview_pic}`}
                            /> */}
                          <div className="card" style={{ width: "12rem" }}>
                            <img
                              className="card-img-top"
                              src={`images/${arr.preview_pic}`}
                              style={{
                                overflow: "hidden",
                                objectFit: "cover",
                                height: "13rem"
                              }}
                            />
                            {/* <Card.Body key={arr.sid}> */}
                            {/* <Card.Title variant="bottom" key={k++}>
                                {arr.name}
                              </Card.Title> */}
                            <div class="card-body">
                              <h5>{arr.name}</h5>
                              {arr["日式"] === "1" ? (
                                <img
                                  alt="日式餐廳"
                                  src="images/dining_bar/japan.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["西式"] === "1" ? (
                                <img
                                  alt="西式餐廳"
                                  src="images/dining_bar/western.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["義式"] === "1" ? (
                                <img
                                  alt="義式餐廳"
                                  src="images/dining_bar/pizza.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["漢堡店"] === "1" ? (
                                <img
                                  alt="漢堡店"
                                  src="images/dining_bar/hamburger.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["lounge_bar"] === "1" ? (
                                <img
                                  alt="lounge_bar"
                                  src="images/dining_bar/glass.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["運動酒吧"] === "1" ? (
                                <img
                                  alt="運動酒吧"
                                  src="images/dining_bar/dart.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["夜店舞廳"] === "1" ? (
                                <img
                                  alt="夜店舞廳"
                                  src="images/dining_bar/dancing.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {arr["居酒屋"] === "1" ? (
                                <img
                                  alt="居酒屋"
                                  src="images/dining_bar/barbecue.svg"
                                  className="dining_bar_icon"
                                />
                              ) : (
                                ""
                              )}
                              {/* <Card.Link href="#" key={arr.sid}>
                                  Card Link
                                </Card.Link> */}
                              <Heart
                                className="dining_bar_icon"
                                alt="favorite"
                                style={{ cursor: "pointer" }}
                                onClick={this.love}
                                fill={
                                  +localStorage
                                    .getItem("barLike")
                                    .includes(arr.sid)
                                    ? "#ff0000"
                                    : "#ffffff"
                                }
                                stroke="black"
                              />
                              {/* // </Card.Body> */}
                              {/* // </Card> */}
                            </div>
                          </div>
                        </InfoBox>
                      </>
                    ))
                  }
                </MarkerClusterer>
              </GoogleMap>
            </LoadScript>
          ) : (
            ""
          )}
        </div>
      </Router>
    );
  }
}
export default withRouter(Dining_bar_list);
