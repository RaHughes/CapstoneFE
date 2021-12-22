import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BusinessForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userBusiness: {},
            title: '',
            ownerId: '',
            description: '',
            phone_number: '',
            address: '',
            email: '',
            edit: false
         }
    }

    toggleFormOn = (b) => {
        this.setState({
            userBusiness: b,
            edit: true
        });
    };

    toggleFormOff = () => {
        this.setState({
            edit: false
        });
    };

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async(event) => {
        event.preventDefault()
        let patch = {
            id: parseInt(this.state.userBusiness.id),
            title: this.state.title,
            ownerId: parseInt(this.props.user.id),
            description: this.state.description,
            phone_number: this.state.phone_number,
            address: this.state.address,
            email: this.state.email
        }
        this.props.editBusiness(patch)
        this.toggleFormOff()
    }
    

    render() { 
        return ( <div>
            <Link to='/new_business'>Add New Business</Link>
            {this.props.business.map(b => {
                if(b.ownerId === this.props.user.id) {
                    return <div key={Math.random()}>
                        <h2>{b.title}</h2>
                        <h3>Description: {b.description}</h3>
                        <h3>Phone Number: {b.phone_number}</h3>
                        <h3>Email: {b.email}</h3>
                        <button onClick={() => this.toggleFormOn(b)}>Edit</button>
                        <button onClick={() => this.props.deleteBusiness(b)}>Delete</button>
                    </div>
                }
            })}
            {this.state.edit === true && <form onSubmit={this.handleSubmit}>
                <label>Title: </label>
                <input defaultValue={this.state.userBusiness.title} onChange={this.handleChange} name='title'></input>
                <label>Description: </label>
                <input defaultValue={this.state.userBusiness.description} onChange={this.handleChange} name='description'></input>
                <label>Phone Number: </label>
                <input defaultValue={this.state.userBusiness.phone_number} onChange={this.handleChange} name='phone_number'></input>
                <label>Address: </label>
                <input defaultValue={this.state.userBusiness.address} onChange={this.handleChange} name='address'></input>
                <label>Email: </label>
                <input defaultValue={this.state.userBusiness.email} onChange={this.handleChange} name='email'></input>
                <button type='submit'>Submit</button>
                </form>}
        </div> );
    }
}
 
export default BusinessForm;