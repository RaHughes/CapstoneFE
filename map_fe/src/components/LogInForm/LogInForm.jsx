import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LogInForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }
  
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
  
    onSubmit = async event => {
      event.preventDefault();
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/auth/login/',
        headers: {},
        data: {
          username: this.state.username,
          password: this.state.password,
        },
      }).then(response => localStorage.setItem('access', response.data.access));
      window.location = '/'
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <label> Username: </label>
            <input name='username' value={this.state.username} onChange={this.handleChange}/>
            <label> Password: </label>
            <input name='password' value={this.state.password} onChange={this.handleChange}/>
            <button type='submit'> Login </button>
          </form>
        </div>
      );
    }
  }
  
  export default LogInForm;