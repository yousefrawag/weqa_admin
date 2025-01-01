import React from 'react'
import useQueryupdate from '../../../services/useQueryupdate'
const SubsubCategoray = ({subcategory}) => {

  return (
    <div className="mt-4 flex flex-col items-center mb-3">
    {/* Vertical line */}
    <div className="h-10 w-[2px] bg-main"></div>

    {/* Horizontal grid for sub-subcategories */}
    <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full max-w-4xl">
    <div
          
          className="py-2 px-4 bg-white rounded-md text-center w-full max-w-sm"
        >
          <span> مركز صحى1 </span>
        </div>
        <div
          
          className="py-2 px-4 bg-white rounded-md text-center main-w-[200px] p-3 max-w-sm"
        >
          <span> مركز صحى 2</span>
        </div>
        <div
          
          className="py-2 px-4 bg-white rounded-md text-center main-w-[200px] p-3 max-w-sm"
        >
          <span> مركز صحى 3</span>
        </div>
     

    </div>
   
  </div>
  )
}

export default SubsubCategoray