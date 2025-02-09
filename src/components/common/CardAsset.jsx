import React, { useState } from 'react'
import image from "../../images/icon/aweqa_Icon-1.png"
import { Link } from 'react-router-dom'
import useQueryDelete from '../../services/useQueryDelete'
import SmailLoader from './Loader/SmailLoader'
import EditCagorayassetHook from '../../hooks/EditCagorayassetHook'
import { useDashboardContext } from '../../context/DashboardProviedr'
import useGetUserAuthentications  from '../../middleware/GetuserAuthencations'
const CardAsset = ({id ,to , ismainLevel , img , title ,tosub , item ,  enddpointDelete , isDropdownVisible ,toggleDropdown , hasSub , keydelete}) => {
    const {deleteIteam , isLoading} = useQueryDelete(enddpointDelete , keydelete )
   const [mdoule , setModule] = useState(false)
   const {isOwner, iscanAdd, iscanDelete, iscanPut} = useGetUserAuthentications ("mainCategoryAssets")

       
  return (
         <div
        
               className="w-full flex items-center justify-center p-5 lg:w-[250px] relative rounded-md border rounded-[10px] border-stroke bg-white h-[250px] shadow-default dark:border-strokedark dark:bg-boxdark flex justify-start flex-col border-main focus:outline-none focus:bg-[#804DB8]/20 dark:focus:bg-[#804DB8]/20 dark:border-main"
           >
             <div className="absolute top-2 left-3">
                <button
                  className="text-2xl font-bold dark:text-main text-main hover:text-gray-700"
                  onClick={() => toggleDropdown(id)}
                >
                  ⋮
                </button>
              {
                isLoading ? <SmailLoader /> : isDropdownVisible && <div className="absolute p-2 left-2 mt-2 w-32 bg-white shadow-lg rounded-md z-2">
                {
               isOwner || iscanAdd ?   hasSub && <Link   to={tosub} className="text-md text-main2 font-medium dark:text-black flex items-end justify-end">إضافة فرع اخر</Link> : null
                } 
                {
                  isOwner || iscanPut ?   <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={()=> setModule(true)}
                >
                  تعديل
                </button> : null
                }
              {
                iscanDelete || isOwner ?   <button
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              onClick={() => deleteIteam(id)}
              >
                حذف
              </button> : null
              }
              
              </div>
              }
                 
             
              </div>
               <img src={img} alt='icon-category' className='w-full h-[60%] object-cover	rounded-[10px]' />
                  <div className='flex items-center justify-center flex-col gap-2 mt-5'>
              
                  <Link   to={to} className="text-md text-main2 font-medium dark:text-white">{title}</Link>
                  </div>
                  <EditCagorayassetHook ismainLevel={ismainLevel} item={item} mdoule ={mdoule} setModule={setModule} endpoint={enddpointDelete} id={id} fectParentKEY={enddpointDelete === "categoryAssets" ? "mainCategoryAssets": "categoryAssets" } keyName={keydelete}/>
          </div>
        
  )}


export default CardAsset