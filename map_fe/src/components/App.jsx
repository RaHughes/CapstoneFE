import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { Component } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import BusinessList from './BusinessList/BusinessList';
import NavBar from './NavBar/NavBar';
import LogInForm from './LogInForm/LogInForm';
import RegisterUser from './RegisterUser/RegisterUser';
import Profile from './Profile/Profile';
import MessageList from './MessageList/MessageList';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            business: [],
            user: '',
            users: [],
            messages: []
        }
    }

     componentDidMount(){
        this.getBusiness()
        const jwt = localStorage.getItem('access');
        try {
            this.getUser(jwt);
        } catch {
            console.log('Something went wrong')
        }
        this.getMessages()
    }

    async getUser(token) {
        let { user_id } = jwt_decode(token)
        let users = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/auth/user/',
        })
        let loginUser = users.data.filter(user => user.id === user_id)
        console.log(loginUser[0])
        this.setState({
            user: loginUser[0],
            users: users.data
        })
    }

    async getBusiness() {
        let response = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/auth/business/'
        })
        this.setState({
            business: response.data
        })
    }

    async getMessages() {
        let response = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/auth/message/'
        })
        console.log(response.data)
        let userMessages = response.data.filter(message => message.to_userId === this.state.user.id || message.from_userId === this.state.user.id)
        console.log(userMessages)
        this.setState({
            messages: userMessages
        })
    }

    logout = () => {
        localStorage.removeItem('access');
        this.setState({
            user: ''
        })
        window.location = '/'
    }

    registerUser = async user => {
        console.log(user)
        await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/auth/register/',
            data: {
                "username": user.username,
                "role": user.role,
                "password": user.password,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "middle_name": user.middle_name
            },
        });
        window.location = '/'
    };

    render(){
        return(
            <div>
                <NavBar user={this.state.user} logout={this.logout}/>
                <Routes>
                    <Route path='/' exact element={<BusinessList business={this.state.business} users={this.state.users}/>} />
                    <Route path='/login' element={<LogInForm user={this.state.user} />} />
                    <Route path='/register' element={<RegisterUser registerUser={this.registerUser}/>} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/messages' element={<MessageList messages={this.state.messages} user={this.state.user} users={this.state.users}/>} />
                </Routes>
            </div>
        )
    }
}
export default App; 