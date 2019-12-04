import React, { Component } from "react";
import $ from 'jquery'
import AOS from 'aos';
import Markdown from './Markdown'

//Bootstrap 標籤
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//css樣式
import '../../style/Blog/css/style.css'
import '../../style/Blog/css/aos.css';

//分頁連結
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"


class Blog_article_comments_post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: "",

      comment: {
        name: "",
        message: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //JQ放這，render之後會觸發
  componentDidMount() {
    AOS.init({
        duration : 750
    })
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };

    /**
   * Form submit handler
   */
  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    fetch("http://localhost:7777", {
      method: "post",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <>                      
        <div className="comment-form-wrap pt-5 pb-5" data-aos='fade-up'>
            <h3 className="mb-5">Leave a comment</h3>
            <form action="#" className="p-5 bg-light" method="post" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label for="name">Name *</label>
                    <input 
                      type="text"
                      className="form-control"
                      id="name" 

                      onChange={this.handleFieldChange}
                      value={this.state.comment.name}
                      placeholder="Leave Your Name"
                      name="name"
                    />
                </div>

                {/* <div className="form-group">
                    <label for="email">Email *</label>
                    <input type="email" className="form-control" id="email" />
                </div> */}

                <div className="form-group">
                    <label for="message">Message</label>
                    <textarea 
                      id="message" 
                      cols="30" 
                      rows="10" 
                      className="form-control"

                      onChange={this.handleFieldChange}
                      value={this.state.comment.message}
                      placeholder="Leave Your Comment"
                      name="message"
                    />
                </div>

                {this.renderError()}

                <div className="form-group">
                    <input 
                      type="submit" 
                      value="Post Comment" 
                      className="btnBlog py-3 px-4 btnBlog-primary" 
                      disabled={this.state.loading}
                    />
                </div>
            </form>
        </div>
      </>
    )
  }
}
export default Blog_article_comments_post