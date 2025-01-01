import React from 'react'
import useQueryupdate from '../../../services/useQueryupdate'
import SubsubCategoray from './SubsubCategoray'
const Subcategoray = ({subcategory}) => {

  return (
    <div className="mt-4 flex flex-col items-center">
    {/* Vertical line */}
    <div className="h-10 w-[2px] bg-main"></div>

    {/* Horizontal grid for sub-subcategories */}
    <div className="grid gap-6 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 w-full max-w-4xl">
    <div
          
          className="py-2 px-4 bg-white rounded-md text-center w-full max-w-sm"
        >
          <span>مستشفى القاهره</span>
           <SubsubCategoray />
        </div>
        <div
          
          className="py-2 px-4 bg-white rounded-md text-center w-full max-w-sm"
        >
          <span>مستشفى القاهره</span>
        </div>
        <div
          
          className="py-2 px-4 bg-white rounded-md text-center w-full max-w-sm"
        >
          <span>مستشفى القاهره</span>
        </div>
       
    </div>
   
 
   
  </div>
  )
}

export default Subcategoray