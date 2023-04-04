import React, {useEffect, useState} from 'react';
import DesktopChatBot from "../components/DesktopChatBot";
import MobileChatBot from "../components/MobileChatBot";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);

    const createMessage = (content, isFromUser) => {
        const message = {
            content,
            isFromUser
        };
        setMessages((prev) => {
            return [...prev, message];
        });
    }

    const clearMessages = () => {
        setMessages([]);
    }

    const [isMobile, setIsMobile] = useState(false);

    // Function to check if the device is a mobile device
    function isMobileDevice() {
        return true;
        // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    useEffect(() => {
        function handleResize() {
            setIsMobile(isMobileDevice() && window.innerWidth <= 768);
        }

        window.addEventListener('resize', handleResize);

        handleResize(); // Initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="chatbox">
            {/*            check if mobile device or desktop*/}
            {isMobile ?
                <MobileChatBot messages={messages} createMessage={createMessage} clearMessages={clearMessages}/> :
                <DesktopChatBot messages={messages} createMessage={createMessage} clearMessages={clearMessages}/>}
        </div>
    );

};

export default ChatBot;