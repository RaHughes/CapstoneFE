import React from 'react';

function MessageList(props) {

    let toUser = props.messages.filter(m => m.to_userId === props.user.id)
    console.log(toUser)
    let fromUser = props.messages.filter(m => m.from_userId === props.user.id)
    console.log(fromUser)

    return(
        <div>
            <h3>Inbox</h3>
            {toUser.map(m => {
                let from = props.users.filter(u => u.id === m.from_userId)
                return <div key={Math.random()}>
                    <p>From: {from[0].first_name} {from[0].last_name}</p>
                    <p>Message: {m.message}</p>
                </div>
            }) }
            <h3>Outbox</h3>
            {fromUser.map(m => {
                let to = props.users.filter(u => u.id === m.to_userId)
                return <div key={Math.random()}>
                    <p>To: {to[0].first_name} {to[0].last_name}</p>
                    <p>Message: {m.message}</p>
                </div>
            })}
        </div>
    )
}

export default MessageList
