import React, { Component } from "react";
import {
  ButtonToolbar,
  DropdownButton,
  Dropdown,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import RangeSlider from "./RangeSlider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class Dining_bar_filter extends Component {
  constructor(props) {
    super(props);
  }

  mysrc = (value) => {
    switch (value) {
      case "日式":
        return "images/dining_bar/japan.svg";
      case "西式":
        return "images/dining_bar/western.svg";
      case "義式":
        return "images/dining_bar/pizza.svg";
      case "漢堡店":
        return "images/dining_bar/hamburger.svg";
      case "夜店舞廳":
        return "images/dining_bar/dancing.svg";
      case "lounge_bar":
        return "images/dining_bar/glass.svg";
      case "運動酒吧":
        return "images/dining_bar/dart.svg";
      default:
        return "";
    }
  };

  render() {
    let arr = [
      "日式",
      "西式",
      "義式",
      "漢堡店",
      "夜店舞廳",
      "lounge_bar",
      "運動酒吧"
    ];
    let place_arr = [
      "台北市",
      "新北市",
      "桃園市",
      "新竹市",
      "台中市",
      "台南市",
      "高雄市"
    ];

    return (
      <>
        {/* 網頁版篩選 */}
        <div className="web-filter">
          <Dropdown>
            <DropdownButton
              id="dropdown-basic-button"
              title={this.props.city ? this.props.city : "選擇地區"}
            >
              {place_arr.map((place, i) => {
                return (
                  <Dropdown.Item
                    key={i}
                    onClick={() => this.props.doFiliter(place)}
                  >
                    {place}
                  </Dropdown.Item>
                );
              })}
              {/* <Dropdown.Item onClick={() => this.props.doFiliter("新北市")}>
                新北市
              </Dropdown.Item> */}
            </DropdownButton>
          </Dropdown>
          {/* 標籤button */}
          <>
            <ButtonToolbar>
              <div className="d-flex">
                {arr.map((value, i) => {
                  return (
                    <ToggleButtonGroup key={i} type="checkbox">
                      <ToggleButton
                        onClick={() => this.props.doFiliter(`${value}`)}
                      >
                        {`${value}`}
                        <img
                          alt="日式餐廳"
                          src={this.mysrc(value)}
                          className="dining_bar_icon"
                        />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                })}
              </div>
            </ButtonToolbar>
          </>
        </div>

        {/* 手機板篩選 */}
        <div className="m_filter">
          <RangeSlider
            handleChange={this.props.priceFilter}
            price={this.props.price}
            s_service={this.props.s_service}
            service={this.props.service}
          />
          {/* 地圖toggle顯示 */}
        </div>
        <FormControl>
          <FormControlLabel
            value="start"
            control={<Switch />}
            label={this.props.showmap ? "關閉地圖" : "開啟地圖"}
            labelPlacement="start"
            onChange={this.props.mapToggle}
          />
        </FormControl>
      </>
    );
  }
}

export default Dining_bar_filter;
