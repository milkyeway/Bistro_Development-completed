import React from 'react'
//樣式
import '../../style/Latest_events/Dropdown_Button.scss'
import { Dropdown, DropdownButton, Row  } from 'react-bootstrap'

class Dropdown_Button extends React.Component{
constructor(){
    super()
}

render(){
    return(
       <>
        <Row className="events_dropdown_row">
        <DropdownButton id="dropdown-basic-button" title="選擇城市" variant="warning">
                <Dropdown.Item href="#/action-1" onClick={this.props.regionfilter('')}>全部</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={this.props.regionfilter('台北')}>台北</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={this.props.regionfilter('新北')}>新北</Dropdown.Item>
                <Dropdown.Item href="#/action-4" onClick={this.props.regionfilter('桃園')}>桃園</Dropdown.Item>
                <Dropdown.Item href="#/action-5" onClick={this.props.regionfilter('台中')}>台中</Dropdown.Item>
                <Dropdown.Item href="#/action-6" onClick={this.props.regionfilter('新竹')}>新竹</Dropdown.Item>
                <Dropdown.Item href="#/action-7" onClick={this.props.regionfilter('台南')}>台南</Dropdown.Item>
                <Dropdown.Item href="#/action-8" onClick={this.props.regionfilter('高雄')}>高雄</Dropdown.Item>
                <Dropdown.Item href="#/action-9" onClick={this.props.regionfilter('其他')}>其他</Dropdown.Item>
        </DropdownButton>
        {/* <DropdownButton id="dropdown-basic-button" title="排序" variant="warning">
                <Dropdown.Item href="#/action-1">人氣熱門</Dropdown.Item>
                <Dropdown.Item href="#/action-2">價格(低到高)</Dropdown.Item>
                <Dropdown.Item href="#/action-3">價格(高到低)</Dropdown.Item>
              
        </DropdownButton> */}
        </Row>
     </>
    )
  }
}



export default Dropdown_Button