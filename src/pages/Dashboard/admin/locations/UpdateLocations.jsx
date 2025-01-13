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
const UpdateLocations = () => {
    const {id} = useParams()
  // react hooks && custome 
  const {data , isLoading} = useQuerygetSpacficIteam("location" , "location" , id)
  const {updateiteam} =  useQueryupdate("location" , "location" )

  const CurrentLocation = data?.data
    const navigate = useNavigate()
// usestates
    const [floors, setFloors] = useState([]);
    const [building , setBuilding] = useState("")
    const [locationType , setLocationtype] = useState("")
    const [loading , setLoading] = useState(false)
useEffect(() => {
if(CurrentLocation) {
setFloors(CurrentLocation.floors)
setBuilding(CurrentLocation?.building)
setLocationtype(CurrentLocation?.kind)
}
} , [CurrentLocation])
  // handel submit data 
    const handleSubmit =  (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
 
        data.floors = floors
        data.building = building
        data.kind = locationType
        const longitude = data.longitude
        const latitude = data.latitude
        data.location = {
            longitude , 
            latitude
        }
        setLoading(true)
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
        setLoading(false)
      }finally{
        setLoading(false)
      }
    };
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
             <GetEsbilshDropdown building={building} setBuilding={setBuilding} />
         

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