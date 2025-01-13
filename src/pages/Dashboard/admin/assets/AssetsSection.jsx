import React from 'react'
import { Link } from 'react-router-dom'
import { MdDomainAdd } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

const AssetsSection = () => {
  return (
    <div className='w-full min-h-screen '>
        <div className=' w-full h-full grid grid-cols-1 gap-5 items-center lg:grid-cols-3'>
        <Link 
             to="/Assets-levels"
                  className={cardstyle}
              >
                    <TbCategoryPlus />
                     <div className='flex items-center justify-center flex-col gap-2'>
                    
                     <span className="text-md text-main2 font-medium dark:text-white">فئات الإصول</span>
                     </div>
                   
        </Link>
        <Link 
             to="/assets-levels"
                  className={cardstyle}
              >
                  <MdDomainAdd />
                     <div className='flex items-center justify-center flex-col gap-2'>
                    
                     <span className="text-md text-main2 font-medium dark:text-white">جميع الإصول</span>
                     </div>
                   
        </Link>
     
        <Link 
             to="/assets-levels"
                  className={cardstyle}
              >
                <TbCategoryPlus />
                     <div className='flex items-center justify-center flex-col gap-2'>
                    
                     <span className="text-md text-main2 font-medium dark:text-white">إضافة أصل</span>
                     </div>
                   
        </Link>
        </div>
 
    </div>
  )
}
const cardstyle = "w-full rounded-md border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex justify-start flex-col border-main focus:outline-none focus:bg-[#804DB8]/20 dark:focus:bg-[#804DB8]/20 dark:border-main"
export default AssetsSection