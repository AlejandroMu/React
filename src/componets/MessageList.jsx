import React, { useState } from "react";
import Message from "./Message";

const MessageList = ({messages, to, sender}) => {
    const messageFilter = messages.filter((m) => m.recipient === to);
    const [message , setMessage] = useState('');
    const [messageList, setMessageList] = useState(messageFilter);

    const addMessage = () => {
        const newMessage ={
            "from":sender,
            "recipient":to,
            "time":Date.now(),
            "type":"text",
            "content":message
        }

        setMessageList((bef) => [...bef, newMessage]);
        fetch("http://localhost:8080/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newMessage)
            }
        ).then(r => r.json())
        .catch(e => console.log(e));
    }

    return (
        <div>
            <h1>Messages</h1>
            {
                messageList.map((m, ind) => {
                    return <Message key={ind} message={m}></Message>
                })
            }
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button onClick={addMessage}>Enviar</button>
        </div>
    );
}

export default MessageList;