import React from 'react';
import './BusinessDetail.css'

function BusinessDetail(props){
        let reviews = props.getReviews(props.business)
        Promise.resolve(reviews)
        console.log(reviews)
        return (<div className='detail'>
                <div className='business'>
                <h2>{props.business.title}</h2>
                <h3>Description: {props.business.description}</h3>
                <h3>Phone Number: {props.business.phone_number}</h3>
                <h3>Email: {props.business.email}</h3>
                </div>
                <div className='reviews'>
                <h2>Reviews: </h2>
                {/* {reviews.map(r => {
                        return <div>
                                <h3>Rating: {r.rating}/5</h3>
                                <h4>{r.text}</h4>
                                </div>
                })} */}
                </div>
                </div>  )
}
 
export default BusinessDetail;