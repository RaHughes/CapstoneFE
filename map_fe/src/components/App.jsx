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
import BusinessForm from './BusinessForm/BusinessForm';
import NewBusiness from './NewBusiness/NewBusiness';
import BusinessDetail from './BusinessDetail/BusinessDetail';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            business: [],
            user: '',
            users: [],
            messages: [],
            bd: ''
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
        this.setState({
            messages: response.data
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

    editBusiness = async business => {
        console.log(business)
        await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8000/api/auth/business/${business.id}`,
            data: {
                "title": business.title, 
                "ownerId": parseInt(business.ownerId),
                "description": business.description,
                "phone_number": business.phone_number,
                "address": business.address,
                "email": business.email
            },
        });
        window.location = '/'
    }

    deleteBusiness = async business => {
        await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/auth/business/${business.id}`
        })
        window.location = '/'
    }

    addBusiness = async business => {
        await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/auth/business/',
            data: {
                "title": business.title,
                "ownerId": parseInt(business.ownerId),
                "description": business.description,
                "phone_number": business.phone_number,
                "address": business.address,
                "email": business.email
            }
        })
        window.location = '/'
    }

    sendMessage = async message => {
        await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/auth/message/',
            data: {
                "to_userId": parseInt(message.to_userId),
                "from_userId": parseInt(message.from_userId),
                "message": message.message
            }
        })
        this.getMessages()
    }

    setDetail = (b) => {
        console.log(b)
        this.setState({
            bd: b
        })
        window.location = '/detail'
    }

    render(){
        return(
            <div>
                <NavBar user={this.state.user} logout={this.logout}/>
                <Routes>
                    <Route path='/' exact element={<BusinessList business={this.state.business} users={this.state.users} setDetail={this.setDetail}/>} />
                    <Route path='/login' element={<LogInForm user={this.state.user} />} />
                    <Route path='/register' element={<RegisterUser registerUser={this.registerUser}/>} />
                    <Route path='/profile' element={<Profile user={this.state.user}/>} />
                    <Route path='/messages' element={<MessageList messages={this.state.messages} user={this.state.user} users={this.state.users} sendMessage={this.sendMessage} />} />
                    <Route path='/business' element={<BusinessForm user={this.state.user} business={this.state.business} editBusiness={this.editBusiness} deleteBusiness={this.deleteBusiness}/>} />
                    <Route path='/new_business' element={<NewBusiness addBusiness={this.addBusiness} user={this.state.user}/>} />
                    <Route path='/detail' element={<BusinessDetail business={this.state.bd} />} />
                </Routes>
            </div>
        )
    }
}
export default App; 