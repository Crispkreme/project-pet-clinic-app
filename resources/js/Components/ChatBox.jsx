import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatBox = ({ rootUrl, user }) => {
    const webSocketChannel = `channel_for_everyone`;
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    const scrollToBottom = () => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', (e) => {
                console.log('New message received:', e.message);
                setMessages(prevMessages => [...prevMessages, e.message]);
                setTimeout(scrollToBottom, 0);
            });
    }

    const getMessages = async () => {
        try {
            const response = await axios.get(`${rootUrl}/messages`);
            setMessages(response.data);
            setTimeout(scrollToBottom, 0);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMessages();
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, []);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Chat Box</div>
                    <div className="card-body" style={{ height: "500px", overflowY: "auto" }}>
                        {
                            messages.map((message) => (
                                <Message key={message.id} userId={user.id} message={message} />
                            ))
                        }
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput rootUrl={rootUrl} refreshMessages={getMessages} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
