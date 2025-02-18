import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../../components/common/Loader";
import useQueryadditeam from "../../../../services/Queryadditeam";
import Messsages from "./Messsages"; 
import TaskStatuts from "./TaskStatuts";
import Breadcrumb from "../../../../components/common/Breadcrumbs/Breadcrumb";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const TicketOverview = () => {
  const { Ticketid } = useParams();
  const [socket, setSocket] = useState(null);
  const { addIteam, isLoading } = useQueryadditeam("messages", "messages");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.userState.userinfo);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const socketConnection = io("http://localhost:3000", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    socketConnection.on("connect", () => {
      toast.success("connecting")
      console.log("Socket connected!");
      socketConnection.emit("joinRoom", { ticketId: Ticketid });
    });
  
    socketConnection.on("receiveMessage", (newMessage) => {
      console.log("🆕 New message received:", newMessage); // 🔍 Debug log
      toast.success("New message received!");
  
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        console.log("Updated messages state:", updatedMessages);
        return updatedMessages;
      });
    });
  
    setSocket(socketConnection);
  
    return () => {
      socketConnection.disconnect();
    };
  }, [Ticketid, token]);
  

  const handleMessage = (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("يجب إضافه محتوى الرسالة");
      return;
    }

    const data = {
      text: message,
      ticketId: Ticketid,
      userId: user._id,
    };

    if (socket && socket.connected) {
      socket.emit("sendMessage", data);
      setMessage(""); // Clear the input
    } else {
      toast.error("فشل الاتصال بالسيرفر");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <Breadcrumb pageName="التواصل مع الفريق" />
        <TaskStatuts Ticketid={Ticketid} />
      </div>
      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <Messsages Ticketid={Ticketid} messages={messages} setMessages={setMessages} />
        <form onSubmit={handleMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
        
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="اكتب رسالتك هنا..."
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition duration-300">
              <FaPaperPlane size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketOverview;
