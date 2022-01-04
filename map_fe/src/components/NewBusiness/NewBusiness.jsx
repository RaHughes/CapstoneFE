import React, { Component } from 'react';
import './NewBusiness.css'

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
        return ( <form onSubmit={this.handleSubmit} className='nbf'>
            <div className='form-group'>
            <label>Title: </label>
            <input value={this.state.title} onChange={this.handleChange} name='title'></input>
            </div>
            <div className='form-group'>
            <label>Description: </label>
            <input value={this.state.description} onChange={this.handleChange} name='description'></input>
            </div>
            <div className='form-group'>
            <label>Phone Number: </label>
            <input value={this.state.phone_number} onChange={this.handleChange} name='phone_number'></input>
            </div>
            <div className='form-group'>
            <label>Address: </label>
            <input value={this.state.address} onChange={this.handleChange} name='address'></input>
            </div>
            <div className='form-group'>
            <label>Email: </label>
            <input value={this.state.email} onChange={this.handleChange} name='email'></input>
            </div>
            <button type='submit'>Add Business</button>
        </form> );
    }
}
 
export default NewBusiness;