import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import Loader from '../../../../components/common/Loader'
const UserOverview = () => {
  const {id}  = useParams()
  const {data , isLoading} = useQuerygetSpacficIteam("employee" , "employee" , id)
  const Currentuser = data?.data
if(isLoading) {
  return <Loader />
}  
  return (
    <div className='w-full'>
              {/* wrrap button layout */}
              <div className='w-full flex justify-between items-center'>
              <Breadcrumb  pageName="بيانات المستخدم  "/>
              <Link to="/All-users" className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800" >
                    عودة
                  </Link>
             

          </div>
      {/* wrrap buttons layout */}
 
    <div  className='w-full h-full shadow-md p-5	'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 w-full items-center'>
              <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                    إسم المستخدم
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                    {
                      Currentuser?.username
                    }
                  </p>
              
                </div>
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                    نوع المستخدم
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                    {
                      Currentuser?.type === "admin" ||   Currentuser?.type === "employee"  ? "مسؤل" : "مستخدم تابع لمنشأه"
                    }
                  </p>
              
                </div>
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                    رقم الهوية / الإقامة
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                 {
                  Currentuser?.identity
                 }
                  </p>
              
                </div>
           
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                  الرقم الوظيفى
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                 {
                  Currentuser?.employeeNumber
                 }
                  </p>
              
                </div>
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                    الجنس
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                 {
                  Currentuser?.grander
                 }
                  </p>
              
                </div>
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                  البريد الإلكترونى
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                  {
                  Currentuser?.email
                 }
                  </p>
              
                </div>
                  
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                  الجوال
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                         {
                  Currentuser?.phone
                 }
                  </p>
              
                </div>
                {
                  Currentuser?.building && <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
                 المنشأه التابع لها 
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                           {
                  Currentuser?.building?.name
                 }
                  </p>
              
                </div>
                }
                
              
             
              
             
             
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
              المنطقة
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                               {
                  Currentuser?.address?.area
                 }     
                  </p>
              
                </div>
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
               المدينة
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                               {
                  Currentuser?.address?.city
                 } 
                  </p>
              
                </div>
                <div className="mb-6 flex flex-col  gap-2">
                  <span
                   
                    className="w-full text-lg font-medium text-gray-700 dark:text-white"
                  >
               العنوان
                  </span>
                  <p 
                   className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  rounded-md border border-gray-300 shadow-sm "
                  >
                               {
                  Currentuser?.address?.street
                 } 
                  </p>
              
                </div>
      </div>
    
    
    </div>
  
</div>
  )
}

export default UserOverview