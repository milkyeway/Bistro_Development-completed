import React from 'react';
import axios from 'axios';

class Appemail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:3002/send",
            data: this.state
        }).then((response) => {
            if (response.data.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {

        this.setState({ name: '', email: '', message: '' })
    }

    render() {
        return (
            <from id="contact-form" onSubmit={this.handleSubmit.bind(this)} className="Home_Fome_input d-flex flex-column" method="POST">

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control Home_Fome_inputname w-100"
                        id="name" placeholder="Name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control Home_Fome_inputname w-100"
                        id="email" aria-describedby="emailHelp" placeholder="Name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                </div>
                <div className="form-group">
                    <label className="input_Message" htmlFor="message">Message</label>
                    <textarea className="form-control Home_Fome_inputname w-100" rows="5" id="message" value={this.state.message}  placeholder="Message" onChange={this.onMessageChange.bind(this)} />
                </div>

                <button type="submit" className="Home_Fome_input_btn">Submit</button>
            </from>

            <div className="App">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({ name: event.target.value })
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onMessageChange(event) {
        this.setState({ message: event.target.value })
    }
}

export default Appemail;