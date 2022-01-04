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
import apiKey from './key';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            business: [],
            userBusiness: '',
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
        let userBusiness = ''
        response.data.forEach(b => {
            if(b.ownerId === this.state.user.id) {
                userBusiness = b
            }
        })
        this.setState({
            business: response.data,
            userBusiness: userBusiness
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

    editUser = async user => {
        await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8000/api/auth/user/${user.id}`,
            data: {
                "first_name": user.first_name,
                "middle_name": user.middle_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role
            }
        })
    }

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

    getReviews = async(business) => {
        let queryUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search/phone?phone=${business.phone_number}`
        let response = await axios({
            method: 'GET',
            url: queryUrl,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Authorization": `Bearer ${apiKey}`
            }
        })
        let bId = response.data.businesses[0].id
        let queryUrl2 = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${bId}/reviews`
        let reviews = await axios({
            method: 'GET',
            url: queryUrl2,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Authorization": `Bearer ${apiKey}` 
            }
        })
        return reviews.data.reviews
    }

    setDetail = (b) => {
        console.log(b)
        this.setState({
            bd: b
        })
    }

    render(){
        return(
            <div>
                <NavBar user={this.state.user} logout={this.logout}/>
                <Routes>
                    <Route path='/' exact element={<BusinessList business={this.state.business} users={this.state.users} setDetail={this.setDetail}/>} />
                    <Route path='/login' element={<LogInForm user={this.state.user} />} />
                    <Route path='/register' element={<RegisterUser registerUser={this.registerUser}/>} />
                    <Route path='/profile' element={<Profile user={this.state.user} editUser={this.editUser}/>} />
                    <Route path='/messages' element={<MessageList messages={this.state.messages} user={this.state.user} users={this.state.users} sendMessage={this.sendMessage} />} />
                    <Route path='/business' element={<BusinessForm user={this.state.user} business={this.state.userBusiness} editBusiness={this.editBusiness} deleteBusiness={this.deleteBusiness}/>} />
                    <Route path='/new_business' element={<NewBusiness addBusiness={this.addBusiness} user={this.state.user}/>} />
                    <Route path='/detail' element={<BusinessDetail business={this.state.bd} getReviews={this.getReviews}/>} />
                </Routes>
            </div>
        )
    }
}
export default App; 