import React, { Component } from 'react';
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.user.id,
            username: this.props.user.username,
            email: this.props.user.email,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            middle_name: this.props.user.middle_name,
            role: this.props.user.role,
            show_modal: false
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            id: this.state.id,
            first_name: this.state.first_name,
            middle_name: this.state.middle_name,
            last_name: this.state.last_name,
            email: this.state.email,
            role: this.state.role
        }
        this.props.editUser(user)
        this.toggle_off()
        window.location = '/profile'
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

    render() { 
        return (
        <div>{ this.state.show_modal === false && <div className='profile'>
            <h2>Your Profile</h2>
            <h3>First Name: {this.props.user.first_name}</h3>
            <h3>Middle Name: {this.props.user.middle_name}</h3>
            <h3>Last Name: {this.props.user.last_name}</h3>
            <h3>Email: {this.props.user.email}</h3>
            <h3>Role: {this.props.user.role}</h3>
            <button className='btn btn-primary' onClick={this.toggle_on}>Edit</button> </div>}
            {this.state.show_modal === true && 
            <form onSubmit={this.handleSubmit} className='profile'>
                <div className='form-group'>
                <label>First Name: </label>    
                <input name='first_name' onChange={this.handleChange} value={this.state.first_name} />
                </div>
                <div className='form-group'>
                <label>Middle Name: </label>    
                <input name='middle_name' onChange={this.handleChange} value={this.state.middle_name} />
                </div>
                <div className='form-group'>
                <label>Last Name: </label>    
                <input name='last_name' onChange={this.handleChange} value={this.state.last_name} />
                </div>
                <div className='form-group'>
                <label>Email: </label>    
                <input name='email' onChange={this.handleChange} value={this.state.email} />
                </div>
                <div className='form-group'>
                <label>Role: </label>
                <select name='role' onChange={this.handleChange} value={this.state.role}>
                    <option value='customer'>Customer</option>
                    <option value='owner'>Owner</option>
                </select>
                </div>
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>}
        </div> );
    }
}
 
export default Profile;