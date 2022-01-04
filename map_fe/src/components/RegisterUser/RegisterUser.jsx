import axios from 'axios';
import React, { Component } from 'react';
import './RegisterUser.css'

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            role: 'customer',
            first_name: '',
            last_name: '',
            middle_name: '',
            email: ''
         }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = async(event) => {
        event.preventDefault()
        let newUser = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            middle_name: this.state.middle_name,
            email: this.state.email
        }
        this.props.registerUser(newUser)
    }

    render() { 
        return ( <div>
            <form onSubmit={this.handleSubmit} className='registerForm'>
                <div className='form-group'>
                <label>Username: </label>
                <input onChange={this.handleChange} name='username'/>
                </div>
                <div className='form-group'>
                <label>Password: </label>
                <input onChange={this.handleChange} name='password'/>
                </div>
                <div className='form-group'>
                <label>Role: </label>
                <select onChange={this.handleChange} name='role'>
                    <option value='customer'>Customer</option>
                    <option value='owner'>Owner</option>
                </select>
                </div>
                <div className='form-group'>
                <label>First Name: </label>
                <input onChange={this.handleChange} name='first_name'/>
                </div>
                <div className='form-group'>
                <label>Last Name: </label>
                <input onChange={this.handleChange} name='last_name'/>
                </div>
                <div className='form-group'>
                <label>Middle Name: </label>
                <input onChange={this.handleChange} name='middle_name'/>
                </div>
                <div className='form-group'>
                <label>Email: </label>
                <input onChange={this.handleChange} name='email'/>
                </div>
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
        </div> );
    }
}
 
export default RegisterUser;