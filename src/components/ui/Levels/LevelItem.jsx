import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import authFetch from "../../../utils/axiosAuthfetch";
import useQueryDelete from "../../../services/useQueryDelete";
import Categoary from "./Categoary";
import EditModal from "../../common/popupmdules/EditModal";
import useQueryupdate from "../../../services/useQueryupdate"
const LevelItem = ({ level }) => {
  const { deleteIteam } = useQueryDelete("mainCategory", "mainCategory");
const {updateiteam} = useQueryupdate("mainCategory" , "mainCategory")

  // State to track dropdown visibility
  const [isDropdownVisible, setDropdownVisible] = useState(null);
  const [isEditVisible, setEditVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handelUpdate = (item) =>{
    setSelectedItem(item)
    setEditVisible(true)
  }
  const handelsubmit = (data) =>{
    updateiteam({id:selectedItem._id , data})
    setEditVisible(false)
  }
  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Parent category */}
      <div className="relative w-full max-w-sm">
        <div className="py-2 px-4 bg-white shadow-md rounded-md text-center flex justify-between items-center cursor-pointer">
          <span>{level.name}</span>
          {/* Dropdown dots */}
          <div className="relative">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => toggleDropdown(level._id)}
            >
              ⋮
            </button>
            {isDropdownVisible === level._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handelUpdate(level)}
                >
                  تعديل
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => deleteIteam(level._id)}
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render subcategories */}
      {level.categories && level.categories.length > 0 && (
        <div className="mt-4 flex flex-col items-center">
          {/* Vertical line connecting parent to subcategories */}
          <div className="h-10 w-[2px] bg-main"></div>

          {/* Container for horizontal connections and subcategories */}
       <Categoary  level ={level}  isDropdownVisible ={isDropdownVisible} toggleDropdown ={toggleDropdown} />
        </div>
      )}

     
      <EditModal 
        isVisible={isEditVisible}
        onClose={() => setEditVisible(false)}
        onSubmit={handelsubmit}
        entity="هيكل"
        placeholder={selectedItem?.name || ""}
      />
    </div>
  );
};

export default LevelItem;
