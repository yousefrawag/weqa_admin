import React, { useEffect } from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import { Link, useParams } from 'react-router-dom'
import RenderLevelflow from '../../../../components/ui/estbilshment/AddEstbilshment/RenderLevelflow'
import useQueryupdate from '../../../../services/useQueryupdate'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Wrapbtn from '../../../../components/common/Wrapbtn'
import Loader from '../../../../components/common/Loader'
const UpdatedEstbilshment = () => {
    // hook fetch all main category && update estbilshment
    const {id} = useParams()
   // HOOKS FETCH AND UPDATE ITEM
    const { isError , isLoading , data:CurrenEstbilshment} = useQuerygetSpacficIteam("building" , "building" , id)
    const {updateiteam} = useQueryupdate("building" , "building")
    const findEstablishment = CurrenEstbilshment?.data

   const EsbilshesLevel = [
     {
     id:1,
     key:"first",
     name:"هيكل رئيسى" 
   },
   {
     id:2,
     key:"second",
     name:"هيكل فرعى تانى" 
   },
   {
     id:3,
     key:"third",
     name:"هيكل فرعى ثالث" 
   },
   {
     id:4,
     key:"fourth",
     name:"هيكل فرعى رابع"
   }
      ]
      // states handelr
   const [Currentlevel , SetCurrentLevel] = useState("")
    const [errors , setErrors] = useState({})
    const [updatelevel , setupdatelevel] = useState("")
    const [kind , setKind] = useState("")
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
  
  // handel change level  
const handeupdateLevel = (e) => {
  return setupdatelevel(e.target.value)
}
  // handel submit and erros and send data to server
  const handelSubmit = (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.currentTarget);
  
        const data = Object.fromEntries(formData);
        data.continued = Currentlevel
        data.levels = updatelevel
        data.kind = kind
        if(!data.name){
          toast.error("يجب إضافه اسم للمنشأه")
            return setErrors({...errors , name:"يجب إضافه اسم للمنشأه"})
        }
        if(!data.kind){
          toast.error("يجب إضافه نوع للمنشأه")
          return setErrors({...errors , kind:"يجب إضافه نوع للمنشأه"})
      }
        if(!data.continued){
          toast.error("يجب إضافه مستوى للمنشأه")
          return setErrors({...errors , continued:"يجب إضافه مستوى للمنشأه"}) 
      }
      if(!data.levels){
        toast.error("يجب إضافه تابعية للمنشأه")
        return setErrors({...errors , levels:"يجب إضافه تابعية للمنشأه"}) 
    }
      setLoading(true)
    updateiteam({id , data} , {
            onSuccess:() =>{
               setErrors({})
                e.target.reset()
                toast.success("تم  تعديل المنشأه بنجاح")
                navigate("/Est-ablishments")
            }
        })
    } catch (error) {
        console.log(error);
        toast.error("هناك خطاء فى الإضافة")
        setKind(false)
    }finally{
      setKind(false)
    }
  }
useEffect(() => {
  if(findEstablishment){
    setupdatelevel(findEstablishment?.levels)
    setKind(findEstablishment?.kind)
    return SetCurrentLevel(findEstablishment?.continued) 
  }

} , [findEstablishment])
if(loading){
  return <Loader />
}
  return (
    <div className='w-full'>
    <Breadcrumb  pageName="تعديل منشأه"/>
    {/* form add new estbilshment */}
    <form onSubmit={handelSubmit} className='w-full h-full grid grid-rows-1	lg:grid-rows-3 shadow-md p-5	'>
        <div className="mb-6 flex flex-col  gap-2">
          <label
            htmlFor="name"
            className="w-full text-lg font-medium text-gray-700 dark:text-white"
          >
            إسم المنشأه
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={findEstablishment?.name}
            placeholder="Title name..."
            className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
          />
          {
           errors.name && <p className='text-red-500'>{errors.name}</p>
          }
        </div>

        <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="kind"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
              نوع المنشأه
              </label>
              <select value={kind} onChange={(e) => setKind(e.target.value)} name="kind" id="kind" className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              >
                <option value="">قم بإختيار النوع</option>
                <option value="مبنى إداري">مبنى إداري </option>
                <option value="مستشفى">مستشفى   </option>
                <option value="مركز صحي"> مركز صحي  </option>
                <option value="مركز تخصصي">مركز تخصصي </option>
                <option value="عيادة تخصصية"> عيادة تخصصية</option>
                <option value="عيادة"> عيادة </option>
              </select>
        
              {
               errors.kind && <p className='text-red-500'>{errors.kind}</p>
              }
            </div>
       
       

        {/* START RENDER LEVELS BUTONS */}
       {
  
     <div >
       <span  className="w-full text-lg font-medium text-gray-700 dark:text-white mb-5">مستوى المنشأه</span>
      <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full mt-2 mb-4'>
              {
                  EsbilshesLevel.map((item) => {
                    return    <button
                    key={item.key}
                    onClick={() => SetCurrentLevel(item.key)}
                    className={`block text-white  ${Currentlevel === item.key ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
                    type="button"
                  >
                      {item.name}
                  </button>
                  })
            }
      </div>
 
   </div>
  
       }
       {/* END RENDER LEVELS BUTONS */}

       {/* RENDER LEVLS FLOW  */}
         <RenderLevelflow Currentlevel={Currentlevel} handeupdateLevel={handeupdateLevel} updatelevel={updatelevel}/>

         {/* END RENDER LEVLS FLOW  */}
          

         
          {/* wrrap button layout */}
          <Wrapbtn to={"/Est-ablishments"} />
      {/* wrrap buttons layout */}
    </form>
    {/* form add new estbilshment */}
</div>
  )
}

export default UpdatedEstbilshment