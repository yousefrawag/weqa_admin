import React from 'react'
import Breadcrumb from './Breadcrumbs/Breadcrumb'
import { Link } from 'react-router-dom'
const HeadPagestyle = ({pageName , title , to , iscanAdd , isOwner}) => {
  // const {iscanAdd , isOwner} = GetuserAuthencations(key)
  // console.log("canadd from head" , iscanAdd);
  
  return (
    <div className='flex justify-between w-full mb-10'>
    <Breadcrumb pageName={pageName} />
    {
      iscanAdd || isOwner  ? <Link to={to} className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800" type="button">
      {title}
      </Link>  : null
    }
   
    </div>
  )
}

export default HeadPagestyle