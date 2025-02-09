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
const AddTicket = () => {
  // react hooks && custome fetch and add
 
  const {addIteam , isLoading} =  useQueryadditeam("Tickets" , "Tickets")
   // react hooks && custome fetch and add

    const navigate = useNavigate()
    const [floors, setFloors] = useState([]);


  
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
      
        toast.error('هناك خطأ في إضافة الموقع');
      }
    };
  if(isLoading){
    return <Loader />
  }  
  return (
    <div className='w-full h-full'>
        <Breadcrumb  pageName="إضافه تذكره"/>
        {/* form add new estbilshment */}
        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col gap-4 shadow-md p-5	'>
       
        <div className="mb-1 flex flex-col gap-2">
          <label  className="w-full text-lg font-medium text-gray-700 dark:text-white">قسم التذكره </label>
          <select name="kind"className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
            <option value="">قم بالإختيار</option>
            <option value="أصول">أصول</option>
            <option value="مواقع">مواقع</option>
            <option value="مستخدمين">مستخدمين</option>
            <option value="صلايحات">صلاحيات</option>
            <option value="هيكلنا الأدارى">هيكلنا الإدارى</option>
            <option value=" أخرى"> أخرى</option>
          </select>
        </div>
        <div className="mb-1 flex flex-col gap-2">
          <label  className="w-full text-lg font-medium text-gray-700 dark:text-white">أولويه التذكره </label>
          <select name="kind"className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
            <option value="">قم بالإختيار</option>
            <option value="طبيعية">طبيعية</option>
            <option value="متوسطة">متوسطة</option>
            <option value="عاجلة">عاجلة</option>
           
          </select>
        </div>
        <div className=" mb-4 flex flex-col gap-2">
          <label  className="w-full text-lg font-medium text-gray-700 dark:text-white"> محتوى التذكره </label>
    <textarea   className="w-full rounded-[10px] min-h-[200px] max-h-[220px] outline-none p-4 border-[1px] border-main dark:bg-form-input dark:text-white text-lg font-medium text-gray-700 " name='conetent'>

    </textarea>
        </div>
       
         

             
    
              <Wrapbtn to={"/support-weqa"} />
       
         
        </form>
        {/* form add new estbilshment */}
    </div>
  )
}

export default AddTicket