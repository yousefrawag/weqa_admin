import React from 'react'
import useQueryupdate from '../../../services/useQueryupdate'
import useQueryDelete from '../../../services/useQueryDelete'
import EditModal from '../../common/popupmdules/EditModal'
import { useState } from 'react'
import useGetUserAuthentications  from '../../../middleware/GetuserAuthencations'
const SubsubCategoray = ({nestSub , isDropdownVisible  , toggleDropdown}) => {
  const {deleteIteam:deleteCategory} = useQueryDelete("nestSubCategory" , "mainCategory")
  const {updateiteam} = useQueryupdate( "nestSubCategory", "mainCategory")
  const {isOwner , iscanDelete , iscanPut  } = useGetUserAuthentications ("mainCategory")

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
    <div className="flex w-full flex-col items-center mb-">
    {/* Vertical line */}
    <div className="relative mb-4 h-8 w-[2px] bg-main after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-main"></div>
    {/* Horizontal grid for sub-subcategories */}
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 w-full max-w-2xl">
    <div
          
          className="py-2 px-4 w-full bg-blue-700 shadow-2 rounded-md text-center flex justify-between items-center cursor-pointer"
        >
            <div className='flex justify-between w-full '> 
            <span className='text-white'>{nestSub?.name}</span>
            <div className="relative">
                <button
                  className="text-white text-bold text-2xl hover:text-gray-200"
                  onClick={() => toggleDropdown(nestSub._id)}
                >
                  ⋮
                </button>
                {isDropdownVisible === nestSub._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                    {
                    isOwner ||  iscanPut ?  <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handelUpdate(nestSub)}
                    >
                      تعديل
                    </button> : null
                    }
                   {
                   isOwner || iscanDelete ?  <button
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => deleteCategory(nestSub._id)}
                  >
                    حذف
                  </button> : null
                   }
            
                  </div>
                )}
              </div>
            </div>
        </div>
     
     

    </div>
    <EditModal 
        isVisible={isEditVisible}
        onClose={() => setEditVisible(false)}
        onSubmit={handelsubmit}
        entity="فرع"
        placeholder={selectedItem}
      />
  </div>
  )
}

export default SubsubCategoray