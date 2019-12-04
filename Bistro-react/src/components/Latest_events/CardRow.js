import React from 'react'
import { Card, CardDeck,Button, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import '../../style/Latest_events/CardRow.scss'
import parse from 'html-react-parser';
import $ from 'jquery'

class CardRow extends React.Component{
constructor(props){
    super(props)
    this.state = {
    }
   
}

componentDidMount() {
    $(function(){
        var len = 45; // 超過50個字以"..."取代
        $(".card-title").each(function(i){
            if($(this).text().length>len){
                $(this).attr("title",$(this).text());
                var text=$(this).text().substring(0,len-1)+"...";
                $(this).text(text);
            }
        });
    });
}
render(){
    // console.log(this.props.picture)
    // console.log(this.props.activity_name)
    return(
       <>

    <Col xl={4} lg={6} md={6} sm={12} >
        <CardDeck style={{height:'27rem','marginBottom':'20px'}}>
                    <Card className="events_Card_border">
                    {/* <Link to={{pathname:`/Latest_events_detail/${this.props.sid}`,state:this.props}}> */}
                    <Link to={{pathname:`/Latest_events_detail/${this.props.sid}`}}>
                    {/* <Link to={{pathname:`/Latest_events_detail`,state:this.props}}> */}
                        <Card.Img  style={{'height':'10rem'}} variant="top" src={`http://localhost/bistro/lib/images/activity/uploads/${this.props.picture}`} /> {/* $是樣板字串 塞變數用的 不是Jquery的$ */ }
                    </Link>
                        <Card.Body> 
                            <Card.Title>{this.props.activity_name}</Card.Title>
                            <Card.Text>
                            <p className="py-2">{this.props.activity_start_Date} ~ {this.props.activity_end_Date}</p>
                            {this.props.event_description}
                            {/* {parse(`${this.props.Introduction}`)} */}
      </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        {/* <Link to={{pathname:`/Latest_events_detail`,state:this.props}}> */}
                        <Link to={{pathname:`/Latest_events_detail/${this.props.sid}`}}>
                            <Button variant="outline-warning">熱銷中</Button>
                        </Link>
                        </Card.Footer>
                    </Card>
         </CardDeck>
    </Col>
     
     </>
    )
  }
}



export default CardRow