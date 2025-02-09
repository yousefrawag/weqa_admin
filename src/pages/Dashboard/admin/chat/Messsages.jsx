import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import image from "../../../../images/user/user-03.png";

const arabicTimeAgo = (date) => {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
    return timeAgo;
};

// 🔹 Fake Chat Data
const fakeMessages = [
    {
        _id: "1",
        senderID: {
            name: "أحمد",
            imageURL: image
        },
        content: "مرحبًا! كيف حالك؟",
        createdAt: new Date(Date.now() - 60000) // 1 min ago
    },
    {
        _id: "2",
        senderID: {
            name: "محمد",
            imageURL: image
        },
        content: "أنا بخير، ماذا عنك؟",
        createdAt: new Date(Date.now() - 300000) // 5 mins ago
    },
    {
        _id: "3",
        senderID: {
            name: "سارة",
            imageURL: image
        },
        content: "هل انتهيت من المشروع؟",
        createdAt: new Date(Date.now() - 7200000) // 2 hours ago
    }
];

const Messages = ({ chatID }) => {
    return (
        <div className="p-4 h-[400px] overflow-y-auto space-y-4">
            {fakeMessages.map((item) => (
                <div key={item?._id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <img src={item?.senderID?.imageURL} alt="user" className="w-10 h-10 rounded-full" />
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{item?.senderID?.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {arabicTimeAgo(item?.createdAt)}
                        </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item?.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;
