import React from "react";
// import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";



function valuetext(value) {
  // console.log(value)
  return value;
}

export default function RangeSlider(props) {
  // const classes = useStyles();
  // const [value, setValue] = React.useState([300, 2000]);
  // console.log(props);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   console.log(event.target);
  //   console.log(newValue);
  // };
  const arr = ["夜間叫車", "附停車位", "DJ駐點", "無障礙空間"];

  return (
    <div className="r_filter_wrap">
      <div className="special-needs-area">
      <p className="price-text">Special Needs</p>
        <div className="service_wrap">
        {arr.map((element) => {
          return (
            <div className="s_service">
              <input
                type="checkbox"
                // edge="end"
                value={element}
                onChange={props.s_service}
                // checked={props.service.indexOf(element) >= 0 ? "checked" : ""} //陣列用includes  字串用indexOf
              />
              <label>{element}</label>
            </div>
          );
        })}
        </div>
      </div>
      {/* <label>Female</label>
        <input
          type="checkbox"
          value="female"
          onChange={this.s_service}
          checked={this.state.service}
        /> */}
      <div id="Dining_bar_price">
        <Typography
          id="range-slider"
          gutterBottom
          className="price-area d-flex"
          // className="price-area d-flex justify-content-around align-items-center"
        >
          <div class="price-text">PRICE</div>
          <div id="price-range">
            ${props.price[0]} – ${props.price[1]}
          </div>
        </Typography>
        <Slider
          id="bar-price-slider"
          value={props.price}
          onChangeCommitted={(event, value) => props.handleChange(event, value)}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          min={300}
          max={2000}
        />
      </div>

    </div>
  );
}
