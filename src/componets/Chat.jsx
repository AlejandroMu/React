import { useEffect, useState } from "react";
import stompService from "../utils/socketService"
import Message from "./Message";

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [message , setMessage] = useState('');
    const [to , SetTo] = useState('');

    const [sender , setSendet] = useState('');

    useEffect(() => {
        stompService.subscribe("/messageTo/"+sender, (message) => {
            console.log(message);   
            setMessages((bef) => [...bef, message])
        }).catch(e => console.log(e));

        return () =>{
            stompService.unsubscribe("/messageTo/user1");
        }

    },[sender]);

    return (
        <div>
            <h1>Messages</h1>
            {
                messages.map((m, ind) => {
                    return <Message key={ind} message={m}></Message>
                })
            }
            <input type="text" value={to} onChange={(e) => SetTo(e.target.value)}/>
            <input type="text" value={sender} onChange={(e) => setSendet(e.target.value)}></input>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
            <button onClick={() => {
                fetch("http://localhost:8080/chat?to="+to,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            "sender":sender,
                            "time":0,
                            "type":"text",
                            "content":message
                        })
                    }
                ).catch(e => console.log(e));
            }}>Enviar</button>
        </div>
    );
}

export default Chat;