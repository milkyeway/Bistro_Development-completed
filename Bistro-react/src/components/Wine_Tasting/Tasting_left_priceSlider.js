import React from 'react'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
//css樣式
import '../../style/Wine_Tasting/Wine_Tasting_index.scss'
//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

import $ from 'jquery'

const useStyles = makeStyles({
  root: {
    width: 300,
    color: "black"
  },
});

function valuetext(value) {
  // console.log(value)
  return value;
}

export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([100, 8000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="left_menu_price">
      <Typography id="range-slider" gutterBottom className="price-area d-flex justify-content-around align-items-center">
        <div class="price-text">PRICE</div>
        <div id="price-range">${value[0]} – ${value[1]}</div>
      </Typography>
      <Slider
        id="price-slider"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={100}
        max={8000}
      />
    </div>
  );
}