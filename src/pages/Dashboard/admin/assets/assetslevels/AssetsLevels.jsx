import React from 'react'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
import useQuerygetiteams from '../../../../../services/Querygetiteams'
import CardAsset from '../../../../../components/common/CardAsset'
import AddAssethook from '../../../../../hooks/AddAssethook'
import { useDashboardContext } from '../../../../../context/DashboardProviedr'
import { useState } from 'react'
import Loader from '../../../../../components/common/Loader'
const AssetsLevels = () => {
  const {data , isLoading} = useQuerygetiteams("mainCategoryAssets" , "mainCategoryAssets")
  const {setModuleAddAsset } = useDashboardContext()
    const [isDropdownVisible, setDropdownVisible] = useState(null);
  const toggleDropdown = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };
  if(isLoading){
    return <Loader />
  }
  return (
    <div className='w-full h-full'>
         <div className="flex justify-between w-full">
              <Breadcrumb pageName="فئات الإصول" />
              <button
             onClick={() => setModuleAddAsset(true)}
                className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
                type="button"
              >
                إضافه فئة جديد
              </button>
            </div>
            <div className="p-3  min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 space-x-8">
              {
                data?.data?.data?.map((item) => {
                  const {name , image , _id} = item 
                  return   <CardAsset  isDropdownVisible={isDropdownVisible === _id}
                  toggleDropdown={toggleDropdown} key={_id} id={_id} enddpointDelete="mainCategoryAssets" hasSub={true} tosub={`/Assets-category/${_id}`}  img={image} to={ `/Assets/${_id}/first` } title={name} />

                })
              }
              
             </div>
<AddAssethook endpoint ="mainCategoryAssets" keyName ="mainCategoryAssets"  fectParentKEY =""  ismainLevel = {true} />
    </div>
  )
}

export default AssetsLevels