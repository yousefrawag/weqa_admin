import React, { useState } from "react";
 // 🎉 Import Confetti
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useQueryupdate from "../../../../services/useQueryupdate";
import useQuerygetSpacficIteam from "../../../../services/QuerygetSpacficIteam";
import toast from "react-hot-toast";

const statusOptions = [
  { value: "open", label: "مفتوحة", icon: <FaSpinner className="text-yellow-500" /> },
  { value: "closed", label: "مغلقة", icon: <FaCheckCircle className="text-green-500" /> },

];

const TaskStatuts = ({ Ticketid , setShowConfetti }) => {
  const { data } = useQuerygetSpacficIteam("Tickets", "Tickets", Ticketid);
  const currentStatus = data?.data?.status || "فى تقدم";
  const { isLoading, updateiteam } = useQueryupdate("Tickets", "Tickets");



  const handleUpdate = (event) => {
    const status = event.target.value;
    updateiteam(
      { data:{status} , id: Ticketid },
      {
        onSuccess: () => {
          if (status === "open") {
            toast.success("🎉  تم تعديل التذكره بنجاح");
          
          }
          if (status === "closed") {
            toast.success("🚫 تم إغلاق التذكره بنجاح");
          }
         
        },
      }
    );
  };

 

  return (
    <div className="relative w-44">
      {/* 🎉 Confetti Effect */}
      

  

      {/* Status dropdown */}
      <select
    onChange={handleUpdate}
        className="w-full p-2 rounded-lg border bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
   
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskStatuts;
