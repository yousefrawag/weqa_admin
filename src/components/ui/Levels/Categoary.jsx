import React, { useState } from 'react';
import useQueryDelete from '../../../services/useQueryDelete';
import Subcategoray from './Subcategoray';
import useQueryupdate from '../../../services/useQueryupdate';
import EditModal from '../../common/popupmdules/EditModal';
import useGetUserAuthentications  from '../../../middleware/GetuserAuthencations';
const Categoary = ({ level, isDropdownVisible, toggleDropdown }) => {
  const { deleteIteam: deleteCategory } = useQueryDelete("category", "mainCategory");
  const { updateiteam } = useQueryupdate("category", "mainCategory");
  const {isOwner , iscanDelete , iscanPut  } = useGetUserAuthentications ("mainCategory")
console.log(iscanDelete  , iscanPut);

  const [isEditVisible, setEditVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handelUpdate = (item) => {
    setSelectedItem(item);
    setEditVisible(true);
  };

  const handelsubmit = (data) => {
    updateiteam({ id: selectedItem._id, data });
    setEditVisible(false);
  };

  return (
    <div className="relative w-full max-w-4xl">
      {/* Horizontal line spanning all subcategories */}

      {/* Subcategories rendered in a row */}
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 relative">
        {level.categories.map((subcategory, index) => (
          <div
            key={index}
            className={`flex flex-col items-center 
              
            border-t-2 border-b-2 shadow-card px-2 pb-2 rounded-lg border-main `}
          >
            {/* Vertical line connecting individual subcategory */}
            <div className="relative mb-4 h-8 w-[2px] bg-main after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-main"></div>

            {/* Subcategory box */}
            <div className="relative w-full max-w-sm">
              <div className="py-2 px-4 bg-main2 shadow-2 rounded-md text-center flex justify-between items-center cursor-pointer">
                <span className="text-white">{subcategory.name}</span>
                {/* Dropdown dots */}
                <div className="relative">
                  
                  <button
                    className="text-white text-bold text-2xl hover:text-gray-200"
                    onClick={() => toggleDropdown(subcategory._id)}
                  >
                    ⋮
                  </button>
                  {isDropdownVisible === subcategory._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                      {
                        isOwner || iscanPut ?   <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handelUpdate(subcategory)}
                      >
                        تعديل
                      </button> : null
                      }
                 {
                 isOwner || iscanDelete ?   <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => deleteCategory(subcategory._id)}
                >
                  حذف
                </button> : null
                 }
                   
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Render sub-subcategories if present */}
            {subcategory.subcategories && subcategory.subcategories.length > 0 && (
              subcategory.subcategories.map((item, idx) => (
                <Subcategoray
                  key={idx}
                  subcategory={item}
                  isDropdownVisible={isDropdownVisible}
                  toggleDropdown={toggleDropdown}
                />
              ))
            )}
          </div>
        ))}
      </div>

      <EditModal
        isVisible={isEditVisible}
        onClose={() => setEditVisible(false)}
        onSubmit={handelsubmit}
        entity="فرع"
        placeholder={selectedItem?.name || ""}
      />
    </div>
  );
};

export default Categoary;