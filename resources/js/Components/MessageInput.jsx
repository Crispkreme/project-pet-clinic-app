import React, { useState } from "react";
import axios from "axios";

const MessageInput = ({ rootUrl, refreshMessages }) => {
    const [message, setMessage] = useState("");

    const messageRequest = async (text) => {
        try {
            await axios.post(`${rootUrl}/message`, { text });
            refreshMessages(); // Call to refresh messages after sending
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        messageRequest(message);
        setMessage(""); // Clear input field after sending
    };

    return (
        <div className="input-group">
            <input 
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Message..."
                value={message}
            />
            <div className="input-group-append">
                <button onClick={sendMessage} className="btn btn-primary" type="button">Send</button>
            </div>
        </div>
    );
};

export default MessageInput;
