import React from 'react'
import useQueryadditeam from '../../../services/Queryadditeam'
import { useDashboardContext } from '../../../context/DashboardProviedr'
import { useEffect , useState } from 'react'
import toast from 'react-hot-toast'
import SmailLoader from '../../common/Loader/SmailLoader'
const AddLeve1 = () => {
    const {module ,  setmodule} = useDashboardContext()
    const [requerFiled , setRequirefiled] = useState("")
    const { isError , isLoading , addIteam} = useQueryadditeam("mainCategory" , "mainCategory")

const handelsubmit = (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);
        if(!data.name){
            return setRequirefiled("هذا الحقل مطلوب")
        }
        
        addIteam(data , {
            onSuccess:() =>{
                setRequirefiled("")
                setmodule(false)
                toast.success("تم إضافه مستوى جديد")
            }
        })

    } catch (error) {
        console.log(error);
        
    }
}
useEffect(() => {
    if(module) {
        return setRequirefiled("")
    }
    } , [module])
 if(isLoading){
    return <SmailLoader />
 }   
  return (
    <form onSubmit={handelsubmit} className='w-full h-full mt-3'>
        <div className='flex flex-col '>
            <label htmlFor="name">إسم الهيكل</label>
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

export default AddLeve1