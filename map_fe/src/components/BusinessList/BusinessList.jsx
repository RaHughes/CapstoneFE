import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessList.css'

function BusinessList(props) {
        return ( <div className='bList container'>
            <div className='row'>
            {props.business.length !== 0 ?  props.business.map(business => {
                return (
                     <div className='card col-lg-4' key={Math.random()}>
                        <h2>{business.title}</h2>
                        <h3>Description: {business.description}</h3>
                        <h3>Phone Number: {business.phone_number}</h3>
                        <h3>Email: {business.email}</h3>
                        <Link className='btn btn-primary'onClick={() => props.setDetail(business)} to='/detail'>Learn More</Link>
                    </div> 
                )
            }) : <p>loading</p>}
        </div>
        </div> );

}
 
export default BusinessList;