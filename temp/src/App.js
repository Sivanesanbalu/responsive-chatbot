import { useState, useEffect, useRef } from 'react';

const App = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [currentText, setCurrentText] = useState("");
    const [typing, setTyping] = useState(false);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track current topic
    const topics = ["Topic 1", "Topic 2", "Topic 3"]; // Define your topics here
    const chatContainerRef = useRef(null);

    const getResponse = async () => {
        if (!value.trim()) {
            setError("Error! Please enter something.");
            return;
        }
        setError("");

        // Add the user's question to chat history
        setChatHistory(oldChatHistory => [
            ...oldChatHistory,
            { role: "user", parts: [value] },
        ]);

        // Clear the input value
        setValue("");
        setTyping(false);

        // Check if the user finished the current topic
        if (isTopicFinished(value)) {
            // Move to the next topic
            setCurrentTopicIndex(prevIndex => (prevIndex + 1) % topics.length);
            // Display the next topic in chat history
            setChatHistory(oldChatHistory => [
                ...oldChatHistory,
                { role: "topic", parts: [topics[(currentTopicIndex + 1) % topics.length]] }, // Show the next topic
            ]);
        }

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({ message: value }),
                headers: { 'Content-Type': 'application/json' },
            };

            const response = await fetch('http://localhost:8000/gemini', options);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.text();

            // Add the model's response to chat history
            startTypingEffect(data);
        } catch (error) {
            console.error(error);
            setError("Something went wrong! Please try again later.");
        }
    };

    const isTopicFinished = (input) => {
        // Logic to determine if the user has finished the current topic
        // This could be based on specific keywords or user prompts
        // For example, check if the input includes "finish" or "done"
        return input.toLowerCase().includes('finish') || input.toLowerCase().includes('done');
    };

    const startTypingEffect = (text) => {
        setCurrentText("");
        setTyping(true);
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setCurrentText(prev => prev + text[index]);
                index++;
            } else {
                clearInterval(typingInterval);
                setTyping(false);
                // Add the model's response to the chat history after typing effect
                setChatHistory(oldChatHistory => [
                    ...oldChatHistory,
                    { role: "model", parts: [text] },
                ]);
            }
        }, 10);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getResponse();
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, currentText]);

    return (
        <div className="app">
            <h1 className="title">ROVISA</h1>
            <div className="search-result" ref={chatContainerRef}>
                {chatHistory.map((chatItem, index) => (
                    <div key={index}>
                        <p className={`answer ${chatItem.role}`}>
                            {chatItem.parts}
                        </p>
                    </div>
                ))}
                {typing && chatHistory.length > 0 && (
                    <p className={`answer model`}>
                        {currentText}
                    </p>
                )}
            </div>
            <div className="input-container">
                <input
                    value={value}
                    placeholder="Ask me anything"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="fixed-size-input"
                />
                <button onClick={getResponse}>Ask Me</button>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;
