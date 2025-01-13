import React, { useState } from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import useQueryadditeam from '../../../../services/Queryadditeam'
import toast from 'react-hot-toast'
import Wrapbtn from '../../../../components/common/Wrapbtn'
import GetEsbilshDropdown from '../../../../components/ui/locations/GetEsbilshDropdown'
import InputFiled from '../../../../components/common/InputFiled'
import FloorsSection from '../../../../components/ui/locations/FloorsSection'
import Loader from '../../../../components/common/Loader'
const AddLocations = () => {
  // react hooks && custome fetch and add
 
  const {addIteam} =  useQueryadditeam("location" , "location")
   // react hooks && custome fetch and add

    const navigate = useNavigate()
    const [floors, setFloors] = useState([]);
    const [loading , setLoading] = useState(false)

  
    const handleSubmit =  (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
 
        data.floors = floors
      
        const longitude = data.longitude
        const latitude = data.latitude
        data.location = {
            longitude , 
            latitude
        }
      setLoading(true)
      try {
         addIteam(
          data,
          {
            onSuccess: () => {
              toast.success('تم إضافه الموقع بنجاح');
              navigate('/locations');
            },
          }
        );
      } catch (error) {
        setLoading(false)
        toast.error('هناك خطأ في إضافة الموقع');
      }finally {
        setLoading(false)
      }
    };
  if(loading){
    return <Loader />
  }  
  return (
    <div className='w-full h-full'>
        <Breadcrumb  pageName="إضافه موقع"/>
        {/* form add new estbilshment */}
        <form onSubmit={handleSubmit} className='w-full h-full grid grid-rows-1	lg:grid-rows-3 shadow-md p-5	'>
        <InputFiled type="text" label="إسم الموقع / المبنى" name="name" title="اسم الموقع" />
        <InputFiled type="text" label="إحداثيات الموقع / خطوط الطول" name="longitude" title="خطوط الطول" />
        <InputFiled type="text" label="إحداثيات الموقع / خطوط العرض" name="latitude" title="خطوط العرض" />
        <div className="mb-6 flex flex-col gap-2">
          <label  className="w-full text-lg font-medium text-gray-700 dark:text-white">نوع الموقع</label>
          <select name="kind"     className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
            <option value="">قم بالإختيار</option>
            <option value="indoor">داخلي</option>
            <option value="outdoor">خارجي</option>
          </select>
        </div>
             <GetEsbilshDropdown />
         

                     {/* Floors Section */}
                     <FloorsSection  floors={floors} Setfloors={setFloors}/>


                      {/* wrrap buttons layout */}
    
              <Wrapbtn to={"/locations"} />
       
         
        </form>
        {/* form add new estbilshment */}
    </div>
  )
}

export default AddLocations