import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Wrapbtn from '../../../../components/common/Wrapbtn'
import GetEsbilshDropdown from '../../../../components/ui/locations/GetEsbilshDropdown'
import InputFiled from '../../../../components/common/InputFiled'
import FloorsSection from '../../../../components/ui/locations/FloorsSection'
import useQueryupdate from '../../../../services/useQueryupdate'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import RenderLevelsFlow from '../../../../components/ui/Levels/RenderLevelsFlow'
import Loader from '../../../../components/common/Loader'
const UpdateLocations = () => {
    const {id} = useParams()
  // react hooks && custome 
  const {data , isLoading} = useQuerygetSpacficIteam("location" , "location" , id)
  const {updateiteam} =  useQueryupdate("location" , "location" )
 const Levels = [{name:"هيكل جديد" , key:"maincategories"} , {name:"هيكل فرعى"  , key:"categories"}, {name:"هيكل فرعى ثالث" , key:"subcategories" }, {name:"هيكل فرعى رابع" , key:"nestsubcategories"}]
 const [Currentlevel , SetCurrentLevel] = useState("maincategories")
 const [value , setvalue] = useState("")
  const CurrentLocation = data?.data
    const navigate = useNavigate()
// usestates
    const [floors, setFloors] = useState([]);
    
    const [locationType , setLocationtype] = useState("")
  
useEffect(() => {
if(CurrentLocation) {
setFloors(CurrentLocation.floors)
setLocationtype(CurrentLocation?.kind)
SetCurrentLevel(CurrentLocation?.levels)
setvalue(CurrentLocation?.building?._id)
}
} , [CurrentLocation])
  // handel submit data 
    const handleSubmit =  (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
 
        data.floors = floors
        data.building = value
        data.levels = Currentlevel
        data.kind = locationType
        const longitude = data.longitude
        const latitude = data.latitude
        data.location = {
            longitude , 
            latitude
        }
        if(!data.name){
          toast.error("يجب إضافة إسم الموقع")
         }       
        if(!longitude){
          return toast.error("إحداثيات الموقع / خطوط الطول")
        }
        if(!longitude){
          return toast.error("إحداثيات الموقع / خطوط العرض")
        }
        if(!data.kind){
          return toast.error("يجب إختيار نوع الموقع")
        }
        if(!data.building){
          return toast.error("يجب إختيار المنشأه التابع لها الموقع")
        }
      try {
        updateiteam(
          {id , data},
          {
            onSuccess: () => {
              toast.success('تم تعديل الموقع بنجاح');
              navigate('/locations');
            },
          }
        );
      } catch (error) {
        toast.error('هناك خطأ في تعديل الموقع');
        
      }
    };
if(isLoading){
  return <Loader />
}    
  return (
    <div className='w-full h-full'>
        <Breadcrumb  pageName="تعديل موقع"/>
        {/* form add new estbilshment */}
        <form onSubmit={handleSubmit} className='w-full h-full grid grid-rows-1	lg:grid-rows-3 shadow-md p-5	'>
        <InputFiled type="text" label="إسم الموقع / المبنى" name="name" title="اسم الموقع"  defaultvalue={CurrentLocation?.name}/>
        <InputFiled type="text" label="إحداثيات الموقع / خطوط الطول" name="longitude" title="خطوط الطول" defaultvalue={CurrentLocation?.location?.longitude} />
        <InputFiled type="text" label="إحداثيات الموقع / خطوط العرض" name="latitude" title="خطوط العرض" defaultvalue={CurrentLocation?.location?.latitude}/>
        
        <div className="mb-6 flex flex-col gap-2">
          <label className="text-lg font-medium text-gray-700">نوع الموقع</label>
          <select name="kind" className="p-3 rounded-md border shadow-sm" value={locationType} onChange={(e) => setLocationtype(e.target.value)}>
            <option value="">قم بالإختيار</option>
            <option value="indoor">داخلي</option>
            <option value="outdoor">خارجي</option>
          </select>
        </div>
        {/* RENDER LEVELS ITEAMS */}
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full'>
          {
            Levels.map((item) => {
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
            <RenderLevelsFlow  Currentlevel={Currentlevel} value={value} setvalue={setvalue}/>
         

                     {/* Floors Section */}
                     <FloorsSection  floors={floors} Setfloors={setFloors}/>


                      {/* wrrap buttons layout */}
    
              <Wrapbtn to={"/locations"} />
       
         
        </form>
        {/* form add new estbilshment */}
    </div>
  )
}



export default UpdateLocations