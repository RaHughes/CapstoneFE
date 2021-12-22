import React from 'react';
import { Link } from 'react-router-dom';

function BusinessList(props) {
        return ( <div>
            {props.business.length !== 0 ?  props.business.map(business => {
                let owner = props.users.filter(user => user.id === business.ownerId)
                return (
                     <div key={Math.random()}>
                        <h2>{business.title}</h2>
                        {/* <h3>Owner: {owner[0].first_name} {owner[0].last_name}</h3>  */}
                        <h3>Description: {business.description}</h3>
                        <h3>Phone Number: {business.phone_number}</h3>
                        <h3>Email: {business.email}</h3>
                    </div> 
                )
            }) : <p>loading</p>}
        </div> );

}
 
export default BusinessList;