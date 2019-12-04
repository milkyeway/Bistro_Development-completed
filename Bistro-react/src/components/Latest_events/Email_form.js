import React from 'react';
import Rodal from 'rodal';
import '../../style/Latest_events/Email_form.scss'

// include styles
// import 'rodal/lib/rodal.css';
import '../../../node_modules/rodal/lib/rodal.css';
import $ from 'jquery'

class Email_form_copy extends React.Component {
    focus = () => this.textInput.focus();
    constructor(props) {
        super(props);
        this.state = { 
            visible: false ,
            name:"",
            email:"",

        };
    }
    handleClick() {
        // 使用原生的 DOM API 获取焦点
        // this.refs.myInput.focus();
      }
    handleChange=(e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]:e.target.value,
            [e.target.email]:e.target.value
        })
      }

    componentDidMount(){
        // $("input").blur();
        // $("input").focus(function(){
        //     console.log("123")
        //     $(this).css({
        //         // "border":"red",
        //         // "border":"2px",
        //         // "border":"solid",
        //         // "background":"red",
        //     })
        // });

    }
    // inputOnFocus = ()=> {
    //     console.log("123")
    //     this.setState({
    //       isShowCheckBox:true
    //     })
    //   }
    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.show.bind(this)}><i class="fas fa-envelope"></i></button>

                <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
                    {/* <div>Content</div> */}
                    <form action="MAILTO:info@businesslawadvice.com?subject=Let's Get Started" method="post"
                        enctype="text/plain" class="form" id="form1">

                        <div>
                            <div>
                                <p className="">收件人</p>
                                <p className="animated bounce ani">{this.props.organizer}</p>
                                {/* <p className="">{this.props.organizer}</p> */}
                            </div>
                            <br/>
                            <i class="fas fa-user" style={{ marginRight: '12px' }}></i>
                            <input type="text" id="name" name="name" placeholder="稱謂" size="18" value={this.state.name} autoFocus onChange={this.handleChange} />
                            {/* <input type="text" id="text" placeholder="稱謂" ref={ input => this.textInput = input }/> */}
       {/* <input type="text" name="text" placeholder="稱謂" size="15"  onFocus={this.inputOnFocus }/> */}
                            <br />


                            <i class="fas fa-envelope" style={{ marginRight: '10px' }}></i>
                            <input type="email" id="email" name="email" pattern=".+@globex.com" placeholder="信箱" size="18" value={this.state.email} onChange={this.handleChange} onKeyDown={()=>this.setState({email:this.state.email.toLowerCase()})} />
                            <br />

                            <br />
                            <i class="fas fa-pencil-alt" style={{ marginRight: '10px' }}></i>
                            <textarea name="" id="" cols="20" rows="5" placeholder="問題描述"></textarea>
                        </div>

                        <div class="submit animated delay-0.3s bounceInLeft">
                        {/* <div class="submit"> */}
                            <input type="submit" value="送出" id="button-blue" />
                            <div class="ease"></div>
                        </div>

                    </form>
                </Rodal>
            </div>
        )
    }
}
export default Email_form_copy