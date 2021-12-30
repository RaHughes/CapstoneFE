import React, { Component } from 'react';

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
            role: this.props.user.role
         }
    }
    render() { 
        return ( <div>
            <h2>Your Profile</h2>
            <h3>First Name: {this.props.user.first_name}</h3>
            <h3>Middle Name: {this.props.user.middle_name}</h3>
            <h3>Last Name: {this.props.user.last_name}</h3>
            <h3>Email: {this.props.user.email}</h3>
            <select name='role'>
                <option value='customer'>Customer</option>
                <option value='owner'>Owner</option>
            </select>
        </div> );
    }
}
 
export default Profile;