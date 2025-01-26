import React from 'react'
import useQueryupdate from '../../../services/useQueryupdate'
import useQueryDelete from '../../../services/useQueryDelete'
import EditModal from '../../common/popupmdules/EditModal'
import { useState } from 'react'
const SubsubCategoray = ({nestSub , isDropdownVisible  , toggleDropdown}) => {
  const {deleteIteam:deleteCategory} = useQueryDelete("nestSubCategory" , "mainCategory")
  const {updateiteam} = useQueryupdate( "nestSubCategory", "mainCategory")
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
    <div className="mt-4 flex flex-col items-center mb-3">
    {/* Vertical line */}
    <div className="h-10 w-[2px] bg-main"></div>

    {/* Horizontal grid for sub-subcategories */}
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2  w-full max-w-4xl">
    <div
          
          className="py-2 px-4 bg-white rounded-md text-center w-full max-w-sm"
        >
            <div className='flex justify-between w-full '> 
            <span className='text-black'>{nestSub?.name}</span>
            <div className="relative">
                <button
                  className="text-main text-bold text-2xl hover:text-gray-700"
                  onClick={() => toggleDropdown(nestSub._id)}
                >
                  ⋮
                </button>
                {isDropdownVisible === nestSub._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handelUpdate(nestSub)}
                    >
                      تعديل
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => deleteCategory(nestSub._id)}
                    >
                      حذف
                    </button>
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
        placeholder={selectedItem?.name || ""}
      />
  </div>
  )
}

export default SubsubCategoray