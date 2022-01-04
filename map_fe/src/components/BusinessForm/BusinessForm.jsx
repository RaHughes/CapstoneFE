import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BusinessForm.css'


class BusinessForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: this.props.business.title,
            ownerId: this.props.business.ownerId,
            description: this.props.business.description,
            phone_number: this.props.business.phone_number,
            address: this.props.business.address,
            email: this.props.business.email,
            edit: false
         }
    }

    toggleFormOn = () => {
        this.setState({
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
            id: parseInt(this.props.business.id),
            title: this.state.title,
            ownerId: parseInt(this.state.ownerId),
            description: this.state.description,
            phone_number: this.state.phone_number,
            address: this.state.address,
            email: this.state.email
        }
        this.props.editBusiness(patch)
        this.toggleFormOff()
        window.location = '/business'
    }
    

    render() { 
        return ( <div>
            <Link className='btn btn-primary' to='/new_business'>Add New Business</Link>
            {this.state.edit === false &&
            <div key={Math.random()} className='business'>
                <h2>{this.props.business.title}</h2>
                <h3>Description: {this.props.business.description}</h3>
                <h3>Phone Number: {this.props.business.phone_number}</h3>
                <h3>Email: {this.props.business.email}</h3>
                <button className='btn btn-primary' onClick={() => this.toggleFormOn()}>Edit</button>
                <button className='btn btn-primary' onClick={() => this.props.deleteBusiness()}>Delete</button>
            </div>}
            {this.state.edit === true && <form onSubmit={this.handleSubmit} className='business'>
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
                <button type='submit' className='btn btn-primary'>Submit</button>
                </form>}
        </div> );
    }
}
 
export default BusinessForm;