import React from 'react'
import useQueryupdate from '../../../services/useQueryupdate'
import SubsubCategoray from './SubsubCategoray'
import useQueryDelete from '../../../services/useQueryDelete'
import EditModal from '../../common/popupmdules/EditModal'
import { useState } from 'react'
import toast from 'react-hot-toast'
const Subcategoray = ({subcategory , isDropdownVisible  , toggleDropdown}) => {
  const {deleteIteam:deleteCategory} = useQueryDelete("subCategory" , "mainCategory")
  const {updateiteam} = useQueryupdate( "subCategory", "mainCategory")
  const [isEditVisible , setEditVisible] = useState(false)
  const [selectedItem , setSelectedItem]  = useState(null)
  const handelUpdate = (item) =>{
    setSelectedItem(item)
    setEditVisible(true)
  }
 const handelsubmit = (data) =>{
  updateiteam({id:selectedItem._id , data})
  setEditVisible(false)

 } 

  return (
    <div className="mt-4 flex flex-col items-center">
    {/* Vertical line */}
    <div className="h-10 w-[2px] bg-main"></div>

    {/* Horizontal grid for sub-subcategories */}
    <div className="grid gap-6 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 w-full max-w-4xl">
    <div
          
          className="py-2 px-4 bg-white rounded-md text-center w-full max-w-sm"
        >
          <div className='flex justify-between w-full '> 
            <span>{subcategory?.name}</span>
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
          {
            subcategory?.nestSubCategory &&  subcategory?.nestSubCategory.length > 0 && (
              subcategory?.nestSubCategory?.map((nestSub) => {
                return   <SubsubCategoray key={nestSub?._id}  nestSub={nestSub}  isDropdownVisible = {isDropdownVisible}   toggleDropdown = {toggleDropdown}/>
              })
            
            )
          }
          
        </div>
   
      
       
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

export default Subcategoray