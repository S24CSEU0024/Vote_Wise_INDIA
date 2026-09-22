import { useState } from "react";
import axios from "axios";
import "./Pages.css";

function AIChat() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "ai",
            text:
                "🇮🇳 Hello! I'm VoteWise AI. Ask me about political parties, elections, schemes, manifestos or Indian political history."
        }
    ]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim() || loading) return;

        const userMessage = message;

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text: userMessage
            }
        ]);

        setMessage("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8000/api/ai/chat",
                {
                    message: userMessage
                }
            );

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text:
                        response.data.reply ||
                        response.data.message
                }
            ]);

        } catch (error) {

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    text:
                        "Sorry, VoteWise AI is currently unavailable."
                }
            ]);

        } finally {

            setLoading(false);

        }
    };


    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            sendMessage();
        }

    };


    return (

        <div className="ai-page">

            <div className="ai-header">

                <div className="ai-big-icon">
                    🤖
                </div>

                <div>

                    <h1>
                        VoteWise AI
                    </h1>

                    <p>
                        Your Indian politics assistant
                    </p>

                </div>

            </div>


            <div className="chat-container">

                <div className="chat-messages">

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.role === "user"
                                    ? "message user-message"
                                    : "message ai-message"
                            }
                        >

                            {msg.text}

                        </div>

                    ))}

                    {loading && (

                        <div className="message ai-message">
                            Thinking...
                        </div>

                    )}

                </div>


                <div className="chat-input">

                    <input
                        value={message}
                        onChange={e =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about Indian politics..."
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading}
                    >
                        Send →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AIChat;