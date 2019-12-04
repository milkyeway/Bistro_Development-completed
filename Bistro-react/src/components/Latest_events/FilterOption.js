import React from 'react'
//樣式
import '../../style/Latest_events/FilterOption.scss'
import { Card, Col, Row, Form ,Container  } from 'react-bootstrap'
import $ from 'jquery'

class FilterOption extends React.Component{
constructor(){
    super()
}

componentDidMount() {
    // SORT選項中：
    // 價格由低至高&由高至低的CHECKBOX不可以同時被點選（邏輯錯誤）
    // $("#price_low").click(function() {
    //   if(this.checked) {
    //     $("#price_high").attr("disabled","disabled")
    //     $("label[for='price_high']").css("color","var(--frame-color)")
    //   }else{
    //     $("#price_high").removeAttr("disabled")
    //     $("label[for='price_high']").css("color","var(--text-color)")
    //   }
    // });
    // $("#price_high").click(function() {
    //   if(this.checked) {
    //     $("#price_low").attr("disabled","disabled")
    //     $("label[for='price_low']").css("color","var(--frame-color)")
    //   }else{
    //     $("#price_low").removeAttr("disabled")
    //     $("label[for='price_low']").css("color","var(--text-color)")
    //   }
    // });
}

render(){
    return(
       <>
        

        <Col sm={2} className=" FilterOption ">
    <div className="events_FilterOption pt-4">
            <Card bg="light" style={{ minWidth: '10rem' }}>
                <Card.Header>選擇城市</Card.Header>
                <Card.Body>
                <Card.Text>
                <fieldset>
                    <Form.Group as={Row}>
                    <Container>
                    <Row>
                    <Col sm={12}>
                        <Form.Check
                        type="radio"
                        label="全部"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        defaultChecked
                        value=""
                        // onClick={this.props.regionfilter}
                        onClick={this.props.regionfilter('')}
                        />
                        <Form.Check
                        type="radio"
                        label="台北"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        value="台北"
                        // onClick={this.props.regionfilter}
                        onClick={this.props.regionfilter('台北')}
                        />
                        <Form.Check
                        type="radio"
                        label="新北"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        value="新北"
                        onClick={this.props.regionfilter('新北')}
                        />
                        <Form.Check
                        type="radio"
                        label="桃園"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios4"
                        value="桃園"
                        onClick={this.props.regionfilter('桃園')}
                        />
                        <Form.Check
                        type="radio"
                        label="台中"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios5"
                        value="台中"
                        onClick={this.props.regionfilter('台中')}
                        />
                        <Form.Check
                        type="radio"
                        label="新竹"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios6"
                        value="新竹"
                        onClick={this.props.regionfilter('新竹')}
                        />
                        <Form.Check
                        type="radio"
                        label="台南"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios7"
                        value="台南"
                        onClick={this.props.regionfilter('台南')}
                        />
                        <Form.Check
                        type="radio"
                        label="高雄"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios8"
                        value="高雄"
                        onClick={this.props.regionfilter('高雄')}
                        />
                        <Form.Check
                        type="radio"
                        label="其他"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios9"
                        value="其他"
                        onClick={this.props.regionfilter('其他')}
                        />
                    </Col>
                    </Row>
                    </Container>
                    </Form.Group>
                </fieldset>
                </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            {/* <Card bg="light" style={{ minWidth: '10rem' }}>
                <Card.Header>排序</Card.Header>
                <Card.Body>
                <Card.Text>
                <fieldset>
                    <Form.Group as={Row}>
                    
                    <Col sm={12}>
                        <Form.Check
                        type="radio"
                        label="人氣熱門"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        />
                        <Form.Check
                        type="radio"
                        label="價格(低到高)"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        />
                        <Form.Check
                        type="radio"
                        label="價格(高到低)"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        />
                        
                    </Col>
                    </Form.Group>
                </fieldset>
                </Card.Text>
                </Card.Body>
            </Card> */}
    </div>
        </Col>
        {/* <div id="left_menu_sort">
            <div className="menu_menu_tit">
              <p>SORT</p>
              <div className="plus-minus-sort">
                <img src="../images/Wine_Accessories/plus.png" className="plus-sort" alt="" />
                <img src="../images/Wine_Accessories/minus.png" className="minus-sort" alt="" />
              </div>
            </div>
            <div className="sort_option">
              <input type="checkbox" name="best" id="best" value="best" />
              <label for="best">最佳推薦</label>
            </div>
            <div className="sort_option">
              <input type="checkbox" name="hot" id="hot" value="hot" />
              <label for="hot">人氣熱門</label>
            </div>
            <div className="sort_option">
              <input
                type="checkbox"
                name="price_low"
                id="price_low"
                value="price_low"
              />
              <label for="price_low">價格（低至高）</label>
            </div>
            <div className="sort_option">
              <input
                type="checkbox"
                name="price_high"
                id="price_high"
                value="price_high"
              />
              <label for="price_high">價格（高至低）</label>
            </div>
            <div className="sort_option">
              <input 
                type="checkbox" 
                name="combo" 
                id="combo" 
                value="combo" 
                />
              <label for="combo">精選組合</label>
            </div>
          </div> */}
     </>
    )
  }
}



export default FilterOption