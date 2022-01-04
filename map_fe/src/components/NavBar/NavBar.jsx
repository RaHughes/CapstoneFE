import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

function NavBar(props) {
    return (
        <div className='navbar'> 
            <h1>Small Business</h1>
            {props.user === '' ?
            <div className='btns'>
            <Link className='btn btn-primary' to='/'>Home</Link>
            <Link className='btn btn-primary' to='/login'>Login</Link>
            <Link className='btn btn-primary' to='/register'>Register</Link>
            </div> : 
            <div className='btns'> 
                <h4 className='welcome'>Welcome {props.user.first_name} {props.user.last_name}</h4>
                <Link className='btn btn-primary' to='/'>Home</Link>
                <Link className='btn btn-primary' to='/' onClick={() => props.logout()}>Logout</Link>
                <Link className='btn btn-primary' to='/profile'>Profile</Link>
                <Link className='btn btn-primary'to='/messages'>Messages</Link>
                {props.user.role === 'owner' && 
                <Link className='btn btn-primary' to='/business'>My Business</Link>}
            </div>
            }
        </div>
    )
}

export default NavBar
