import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <div> 
            {props.user === '' ?
            <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </div> : 
            <div> 
                <h4>Welcome {props.user.first_name} {props.user.last_name}</h4>
                <Link to='/' onClick={() => props.logout()}>Logout</Link>
                <Link to='/profile'>Profile</Link>
                <Link to='/messages'>Messages</Link>
            </div>
            }
            <Link to='/'>Home</Link>
        </div>
    )
}

export default NavBar
