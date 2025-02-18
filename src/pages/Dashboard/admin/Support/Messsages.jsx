import React, { useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import image from "../../../../images/user/user-03.png";
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam';
import Loader from '../../../../components/common/Loader';
import "../../../../css/style.css"
const arabicTimeAgo = (date) => {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
    return timeAgo;
};

const Messages = ({ Ticketid, messages, setMessages }) => {
    const { data, isLoading } = useQuerygetSpacficIteam("Tickets", "Tickets", Ticketid);
    const messagesEndRef = useRef(null); // Reference for auto-scrolling

    // Auto-scroll to the last message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // Runs whenever messages change

    useEffect(() => {
        if (data?.data?.messages) {
            setMessages(data?.data?.messages);
        }
    }, [data]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-4 h-[400px] overflow-y-auto space-y-4">
            {messages?.map((item, i) => (
                <div
                    key={`message-${i}-${item?.createdAt}`}
                    className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-500 ease-in-out ${i === messages.length - 1 ? 'fade-in' : ''}`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <img src={item?.senderId?.image} alt="user" className="w-10 h-10 object-cover rounded-full" />
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{item?.senderId?.username}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {arabicTimeAgo(item?.createdAt)}
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item?.text}</p>
                </div>
            ))}
            {/* Ref to scroll to the last message */}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Messages;
