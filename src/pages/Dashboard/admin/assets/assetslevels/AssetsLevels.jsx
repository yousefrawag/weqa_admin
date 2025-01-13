import React from 'react'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
const AssetsLevels = () => {
  return (
    <div className='w-full h-full'>
         <div className="flex justify-between w-full">
              <Breadcrumb pageName="فئات الإصول" />
              <button
             
                className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
                type="button"
              >
                إضافه فئة جديد
              </button>
            </div>

    </div>
  )
}

export default AssetsLevels