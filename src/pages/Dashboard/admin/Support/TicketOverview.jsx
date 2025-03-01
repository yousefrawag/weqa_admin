import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPaperclip, FaImage, FaFileAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../../../components/common/Loader";
import useQueryadditeam from "../../../../services/Queryadditeam";
import Messsages from "./Messsages";
import TaskStatuts from "./TaskStatuts";
import Breadcrumb from "../../../../components/common/Breadcrumbs/Breadcrumb";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import UploadSupportImages from "../../../../hooks/UploadSupportImages";
import axios from "axios";
const TicketOverview = () => {
  const { Ticketid } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loaddingfiles , setLoadingfiles] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.userState.userinfo);
  const token = localStorage.getItem("token") || "";

  // CONNECT TO SOCKET.IO AND GET THE NEW MESSAGES
  useEffect(() => {
    const socketConnection = io("http://localhost:3000", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socketConnection.on("connect", () => {
      toast.success("Connected to server");
      socketConnection.emit("joinRoom", { ticketId: Ticketid });
    });

    socketConnection.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(socketConnection);
    return () => socketConnection.disconnect();
  }, [Ticketid, token]);

  // SEND MESSAGES TO SOCKET.IO
  const handleMessage = (e) => {
    e.preventDefault();
    if (!message && images.length === 0 && pdfs.length === 0) {
      toast.error("Message content or file is required");
      return;
    }

    const data = {
      text: message,
      ticketId: Ticketid,
      userId: user._id,
      pdf:pdfs[0]?.view ? pdfs[0]?.view: "",
      image:images[0]?.view ? images[0]?.view: "",
   
    };

    if (socket && socket.connected) {
      socket.emit("sendMessage", data);
      setMessage("");
      setImages([]);
      setPdfs([]); // Clear files after sending
    } else {
      toast.error("Failed to connect to server");
    }
  };

  //SEND FILES TO CLOUDINARY AND GET THE UR 
  const handleFileChange = async (event) => {
    console.log("File input change event fired:", event)
    const file = event.target.files[0];
    console.log("hello");
    console.log(file);
    setShowDropdown(false);

    if (!file) {
      toast.error("No file selected");
      return;
    }
    setLoadingfiles(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "weqa1234"); 
    formData.append("folder", "images"); 
    // Validate file type
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Unsupported file type. Please upload an image or PDF.");
      return;
    }


    const type = file.type.startsWith("image/") ? "image" : "pdf";
 
    try {
      const uploadedUrl = await axios.post(
        "https://api.cloudinary.com/v1_1/dllrrsz02/image/upload",
        formData,
        { headers: { "Accept": "application/json" } }
      );
      
  
  
  
      if (uploadedUrl) {
        if (type === "image") {
          setImages((prev) => [...prev, { file, view: uploadedUrl.data?.url}]);
        } else {
          setPdfs((prev) => [...prev, { file, view: uploadedUrl.data.url }]);
        }
        toast.success("File uploaded successfully");
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      setLoadingfiles(false)
      toast.error("هناك خطاء فى تحميل المرفقات")
    }finally {
      setLoadingfiles(false)
    }
  
  };



  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <Breadcrumb pageName="فريق دعم وقاء" />
        <TaskStatuts Ticketid={Ticketid} />
      </div>
      <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <Messsages Ticketid={Ticketid} messages={messages} setMessages={setMessages} />

        <form onSubmit={handleMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
          {(images.length > 0 || pdfs.length > 0) && (
            <UploadSupportImages loaddingfiles={loaddingfiles} images={images} setImages={setImages} pdfs={pdfs} setPdfs={setPdfs} />
          )}
          <div className="flex gap-4"></div>
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-gray-300 hover:bg-gray-400 text-black p-3 rounded-full"
            >
              <FaPaperclip size={20} />
            </button>
            {showDropdown && (
              <div className="absolute w-[150px] bottom-12 right-0 bg-white shadow-md rounded-lg p-2">
                <label htmlFor="upload-image" className="flex items-center gap-2 p-2 hover:bg-main hover:text-white w-full">
                  <input onChange={handleFileChange} type="file"  id="upload-image" hidden accept="image/*" />
                  <FaImage /> إرفاق صوره
                </label>
                <label htmlFor="upload-file" className="flex cursor-pointer items-center gap-2 p-2 hover:bg-main hover:text-white w-full">
                  <input onChange={handleFileChange}  type="file"  id="upload-file" accept="application/pdf" hidden />
                  <FaFileAlt /> إرفاق ملف
                </label>
              </div>
            )}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-full border outline-none"
              placeholder="أكتب رسالتك هنا ..."
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
              <FaPaperPlane size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketOverview;