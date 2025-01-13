import React from 'react'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import LocationFloorSection from '../../../../components/ui/locations/LocationFloorSection'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import { useParams } from 'react-router-dom'
import Loader from '../../../../components/common/Loader'
const LocationOverview = () => {
    const {id} = useParams()
    const {data , isLoading} = useQuerygetSpacficIteam("location" , "location" , id)
    const CurrentLocation = data?.data
  if(isLoading){
    return <Loader />
  }
  return (
    <div>
         <HeadPagestyle  to={"/locations"} pageName={"بيانات الموقع"}  title={"عوده"}/>
         <div className='w-full h-full grid grid-cols-1 gap-2 xl:grid-cols-2	 shadow-md p-5	'>
            <div className="mb-6 flex flex-col  gap-2">
            <span
                htmlFor="name"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
            >
                    إسم الموقع
            </span>
            <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
            
            >
              {
                CurrentLocation?.name
              }
            </p>
        
            </div>
            <div className="mb-6 flex flex-col  gap-2">
            <span
                htmlFor="name"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
            >
                   إحداثيات / خطوط الطول
            </span>
            <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
            
            >
               {
                CurrentLocation?.location?.longitude
               }
            </p>
        
            </div>
            <div className="mb-6 flex flex-col  gap-2">
            <span
                htmlFor="name"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
            >
                   إحداثيات / خطوط العرض
            </span>
            <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
            
            >
               {
                CurrentLocation?.location?.latitude
               }
            </p>
        
            </div>
        
        
            <div className="mb-6 flex flex-col  gap-2">
            <span
                htmlFor="name"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
            >
                نوع الموقع
            </span>
            <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
            
            >
              {
                CurrentLocation?.kind === "outdoor"  ? "خارجى" :"داخلى"
              }
            </p>
        
            </div>

        
            <div className="mb-6 flex flex-col  gap-2">
            <span
                htmlFor="name"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
            >
                المنشأه التابع لها
            </span>
            <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
            
            >
                {
                CurrentLocation?.building?.name
              }
            </p>
        
            </div>

        </div>
        <LocationFloorSection CurrentLocation={CurrentLocation} />
    </div>
       
  )
}

export default LocationOverview