import React from 'react'
import useQueryDelete from '../../../services/useQueryDelete'
import Subcategoray from './Subcategoray';
import useQueryupdate from '../../../services/useQueryupdate'
import EditModal from '../../common/popupmdules/EditModal';
import { useState } from 'react';
const Categoary = ({level , isDropdownVisible ,toggleDropdown }) => {
    // SERVICE HOOKS DELETE AND UPDATE
    const { deleteIteam: deleteCategory } = useQueryDelete("category", "mainCategory");
    const {updateiteam} = useQueryupdate("category" , "mainCategory")

  // handel edit item   
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
  //END  handel edit item 
  return (
    <div className="relative w-full max-w-4xl">
    {/* Horizontal line spanning all subcategories */}
    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-main"></div>

    {/* Subcategories rendered in a row */}
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 relative">
      {level.categories.map((subcategory, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Vertical line connecting individual subcategory */}
          <div className="h-6 w-[2px] bg-main"></div>

          {/* Subcategory box */}
          <div className="relative w-full max-w-sm">
            <div
              className="py-2 px-4 bg-white shadow-md rounded-md text-center flex justify-between items-center cursor-pointer"
             
            >
              <span>{subcategory.name}</span>
              {/* Dropdown dots */}
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => toggleDropdown(subcategory._id)}
                >
                  ⋮
                </button>
                {isDropdownVisible === subcategory._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handelUpdate(subcategory)}
                    >
                      تعديل
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => deleteCategory(subcategory._id)}
                    >
                      حذف
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Render sub-subcategories if present */}
          {subcategory.subcategories && subcategory.subcategories.length > 0 && (
            subcategory.subcategories.map((item) => {
              return  <Subcategoray  subcategory={item} isDropdownVisible = {isDropdownVisible} toggleDropdown ={toggleDropdown}/>
            })
      
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
  )
}

export default Categoary