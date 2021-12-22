import React, { Component } from 'react';

class NewBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user,
            title: '',
            description: '',
            address: '',
            phone_number: '',
            email: ''
         }
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault()
        let newBusiness = {
            title: this.state.title,
            ownerId: this.state.user.id,
            description: this.state.description,
            phone_number: this.state.phone_number,
            address: this.state.address,
            email: this.state.email
        }
        this.props.addBusiness(newBusiness)
    }

    render() { 
        return ( <form onSubmit={this.handleSubmit}>
            <label>Title: </label>
            <input value={this.state.title} onChange={this.handleChange} name='title'></input>
            <label>Description: </label>
            <input value={this.state.description} onChange={this.handleChange} name='description'></input>
            <label>Phone Number: </label>
            <input value={this.state.phone_number} onChange={this.handleChange} name='phone_number'></input>
            <label>Address: </label>
            <input value={this.state.address} onChange={this.handleChange} name='address'></input>
            <label>Email: </label>
            <input value={this.state.email} onChange={this.handleChange} name='email'></input>
            <button type='submit'>Add Business</button>
        </form> );
    }
}
 
export default NewBusiness;