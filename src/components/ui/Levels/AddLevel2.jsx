import React from 'react'
import useQuerygetiteams from '../../../services/Querygetiteams'
import useQueryadditeam from '../../../services/Queryadditeam'
import { useDashboardContext } from '../../../context/DashboardProviedr'
import { useState , useEffect } from 'react'
import toast from 'react-hot-toast'
import SmailLoader from '../../common/Loader/SmailLoader'
const AddLevel2 = () => {
    const {data:Levels} = useQuerygetiteams('mainCategory', 'mainCategory')
    const {module ,  setmodule} = useDashboardContext()
    
    const [requerFiled , setRequirefiled] = useState("")
    const { isError , isLoading , addIteam} = useQueryadditeam("category" , "mainCategory")

const handelsubmit = (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);
        if(!data.name){
            return toast.error("قم بكتابه إسم الفرع")
        }
        if(!data.maincategories){
            return toast.error("قم باختيار الهيكل التابع له الفرع")
        }
        if(!data.kind){
            return toast.error("قم باختيار  نوع المنشأه")
        }
        console.log(data);
        
        addIteam(data , {
            onSuccess:() =>{
                setRequirefiled("")
                setmodule(false)
                e.target.reset()
                toast.success("تم إضافه فرع جديد")
            }
        })

    } catch (error) {
        console.log(error);
        
    }
}
if(isLoading){
    return <SmailLoader />
}
  return (
    <form onSubmit={handelsubmit} className='w-full h-full mt-3'>
          <div className="mb-6 flex flex-col  gap-5">
                    <label
                      htmlFor="maincategories"
                      className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                    >
                    هيكل المنشأه
                    </label>
                  <select name='maincategories' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                      <option>
                                قم بالإختيار
                      </option>
                        {
                            Levels?.data?.data?.map((item) =>{
                            return <option key={item._id} value={item._id}>{item.name}</option>
                          })
                        }
                                  
                      
                  </select>
            
              </div>
                <div className='flex flex-col '>
                    <label htmlFor="name">إسم المنشأه</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="قم بكتابه إسم المنشأه"
                    className="mt-3 text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                />
                </div>
                <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="kind"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
              نوع المنشأه
              </label>
              <select name="kind" id="kind" className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              >
                <option value="">قم بإختيار النوع</option>
                <option value="مبنى إداري">مبنى إداري </option>
                <option value="مستشفى">مستشفى   </option>
                <option value="مركز صحي"> مركز صحي  </option>
                <option value="مركز تخصصي">مركز تخصصي </option>
                <option value="عيادة تخصصية"> عيادة تخصصية</option>
                <option value="عيادة"> عيادة </option>
              </select>
        
         
            </div>
         
                <button
                    type="submit"
                        className="mt-4 block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
                    
                    >
                    حفظ
                </button>

</form>
  )
}

export default AddLevel2