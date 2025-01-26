import React from 'react'
import useQuerygetiteams from '../../../services/Querygetiteams'
import useQueryadditeam from '../../../services/Queryadditeam'
import toast from 'react-hot-toast'
import { useDashboardContext } from '../../../context/DashboardProviedr'
import SmailLoader from '../../common/Loader/SmailLoader'

const AddLevel3 = () => {
    const {data:Levels} = useQuerygetiteams('category', 'category')
    const { isError , isLoading , addIteam} = useQueryadditeam("subCategory" , "mainCategory")
     const {module ,  setmodule} = useDashboardContext()

const handelsubmit = (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);
        if(!data.name){
            return toast.error("قم بكتابه إسم الفرع")
        }
        if(!data.categories){
            return toast.error("قم باختيار الهيكل التابع له الفرع")
        }
        
        addIteam(data , {
            onSuccess:() =>{
               
                setmodule(false)
                e.target.reset()
                toast.success("تم إضافه فرع جديد")
            }
        })

    } catch (error) {
        console.log(error);
        
    }
}
if(isLoading) {
    return <SmailLoader />
}
  return (
    <form className='w-full h-full mt-3' onSubmit={handelsubmit}>
          <div className="mb-6 flex flex-col  gap-5">
                    <label
                      htmlFor="mainCategory"
                      className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                    >
                    تابع للفرع
                    </label>
                  <select name='categories' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
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
                    <label htmlFor="name">إسم الفرع</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="قم بكتابه الهيكل"
                    className="mt-3 text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                />
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

export default AddLevel3