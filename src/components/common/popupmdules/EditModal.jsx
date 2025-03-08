import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";

const EditModal = ({ isVisible, onClose, onSubmit, entity, placeholder }) => {
      const Levels = ["هيكل جديد" , "هيكل فرعى" , "هيكل فرعى ثالث" , "هيكل فرعى رابع"]
      const [Currentlevel , SetCurrentLevel] = useState("هيكل جديد")
  
  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      onSubmit(data);
      toast.success(`تم تعديل بنجاح ${data.name}`)
    } catch (error) {
      toast.error("هناك خطأ فى الإضافة يرجى مراجعه البيانات ")
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded-md shadow-lg w-full max-w-md"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="mb-5 p-3">
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full'>
          {
            Levels.map((item) => {
              return    <button
              key={item}
              onClick={() => SetCurrentLevel(item)}
              className={`block text-white  ${Currentlevel === item ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
              type="button"
            >
                {item}
            </button>
            })
          }
        </div>
        <RenderAddlevel Currentlevel={Currentlevel} placeholder={placeholder} />
        </div>
    
      </form>
    </div>
  );
};

export default EditModal;
