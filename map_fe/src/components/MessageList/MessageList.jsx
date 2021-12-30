import axios from 'axios';
import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            to_userId: '',
            from_userId: this.props.user.id,
            message: '',
            show_modal: false
        }
    }

    toggle_on = () => {
        this.setState({
            show_modal: true
        })
    }

    toggle_off = () => {
        this.setState({
            show_modal: false
        })
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault()
        this.toggle_off()
        let message = {
            to_userId: this.state.to_userId,
            from_userId: this.state.from_userId,
            message: this.state.message
        }
        this.props.sendMessage(message)
        window.location = "/messages"
    }

    render() {
    let toUser = this.props.messages.filter(m => m.to_userId === this.props.user.id)
    console.log(toUser)
    let fromUser = this.props.messages.filter(m => m.from_userId === this.props.user.id)
    console.log(fromUser)
        return(
            <div>
            <button onClick={this.toggle_on}>New Message</button>
            {this.state.show_modal === true && 
                <form onSubmit={this.handleSubmit}>
                    <select onChange={this.handleChange} name='to_userId'>
                        {this.props.users.map(u => {
                            return <option key={Math.random()} value={u.id}>{u.first_name} {u.last_name}</option>
                        })}
                    </select>
                    <input onChange={this.handleChange} name='message' value={this.state.message} />
                    <button type='submit'>Send</button>
                </form>}
            <h3>Inbox</h3>
            {toUser.map(m => {
                let from = this.props.users.filter(u => u.id === m.from_userId)
                    return <div key={Math.random()}>
                        <p>From: {from[0].first_name} {from[0].last_name}</p>
                        <p>Message: {m.message}</p>
                        <button>Reply</button>
                    </div>
                })}
            <h3>Outbox</h3>
            {fromUser.map(m => {
                let to = this.props.users.filter(u => u.id === m.to_userId)
                    return <div key={Math.random()}>
                        <p>To: {to[0].first_name} {to[0].last_name}</p>
                        <p>Message: {m.message}</p>
                        <button>Delete</button>
                    </div>
                })}
            </div>
        )
    }
}

export default MessageList
