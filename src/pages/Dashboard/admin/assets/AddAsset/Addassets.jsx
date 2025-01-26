import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
import useQueryadditeam from '../../../../../services/Queryadditeam'
import toast from 'react-hot-toast'
import SelectoptionHook from '../../../../../hooks/SelectoptionHook'
import Wrapbtn from '../../../../../components/common/Wrapbtn'
import SelectFloor from '../../../../../components/ui/assets/Addasset/SelectFloor'
import SelectArea from '../../../../../components/ui/assets/Addasset/SelectArea'
import SelectSection from '../../../../../components/ui/assets/Addasset/SelectSection'
import SelectRooms from '../../../../../components/ui/assets/Addasset/SelectRooms'
import Loader from '../../../../../components/common/Loader'
import UploadPdf from '../../../../../hooks/UploadPdf'
import useQuerygetSpacficIteam from '../../../../../services/QuerygetSpacficIteam'
import FetchassetName from '../../../../../hooks/FetchassetName'
const Addassets = () => {
  // react hooks && custome fetch and add
 const {id , continued} = useParams()
 
  const {addIteam  ,isLoading} =  useQueryadditeam("assets" , "assets")
   // react hooks && custome fetch and add

  
  
  const [errors , setErrors] = useState({})
  const [building , setbuilding] = useState("") 
  const [location , setLocation] = useState("")
  const [CurrentFloor , setCurrentfloor] = useState("")
  const [CurrentArea , setCurrentArea] = useState("")
  const [CurrentSection , setCurrentSection] = useState("")
  const [CurrentRoom , setCurrentRoom] = useState("")
  const params =  {
    building
  }
    const navigate = useNavigate()
   
    const [pdfs, setPdfs] = useState([]);

    const handleFiles = (event) => {
      const file = event.target.files[0]; // Get the first uploaded file
      if (file) {
        // Validate that the file is a PDF
        if (file.type !== "application/pdf") {
          alert("Please upload a valid PDF file.");
          return;
        }
  
        // Generate a blob URL for previewing the PDF
        const newPdf = {
          name: file.name,
          url: URL.createObjectURL(file),
          file, // Optional: Store the actual file object for further use
        };
  
        // Update the state
        setPdfs([...pdfs, newPdf]);
      }
    };



// handel add new Asset
const handelSubmit = (e) =>{
  e.preventDefault();
  try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(formData);
      formData.set("continued" ,continued )
     formData.set("location" , location )
     formData.set("floor" , CurrentFloor )
     formData.set("area" , CurrentArea )
     formData.set("section" , CurrentSection )
     formData.set("room" , CurrentRoom )
     formData.set("subCategoryAssets" , id )
  //   pdfs.forEach((item) =>
  //     formData.append("pdf", item.file)
  // )

      if(!data.assetsName){
        toast.error("يجب إضافه اسم الاصل")
          return ;
      }
      if(!data.kind){
        toast.error("يجب إضافه نوع للمنشأه")
        return setErrors({...errors , kind:"يجب إضافه نوع للمنشأه"})
    }
      if(!data.supplier){
        toast.error("يجب إضافه  اسم المورد")
        return ;
    }
    if(!data.manufacturingCompany){
      toast.error("يجب إضافه  الشركة المصنعة")
      return ;
  }
  if(!data.manufacturingCompany){
    toast.error("يجب إضافه  الشركة المصنعة")
    return ;
}
if(!data.financialValue){
  toast.error("يجب إضافه القيمة المالية")
  return ;
}
if(!data.building){
  toast.error("يجب اختيار الموقع الذى ينتمى اليه الإصل")
  return ;
}
if(!data.floor){
  toast.error("يجب اختيار الدور الذى ينتمى اليه الإصل")
  return ;
}
if(!data.area){
  toast.error("يجب اختيار المنطقة الذى ينتمى اليه الإصل")
  return ;
}
if(!data.region){
  toast.error("يجب اختيار القسم الذى ينتمى اليه الإصل")
  return ;
}
if(!data.room){
  toast.error("يجب اختيار الغرفة الذى ينتمى اليه الإصل")
  return ;
}
      
      addIteam(formData , {
          onSuccess:() =>{
           
              e.target.reset()
           
              setPdfs([])
              navigate(`/Assets/${id}/${continued}`)
              toast.success("تم إضافه أصل جديد")
          }
      })
  } catch (error) {
      console.log(error);
      toast.error("هناك خطاء فى إضافة اصل يرجى التأكد من جميع البيانات ")
  }
}
if(isLoading) {
  return <Loader />
}
  return (
    <div className='w-full'>
        <Breadcrumb  pageName="إضافه منشأه"/>
        {/* form add new estbilshment */}
        <form onSubmit={handelSubmit} className='w-full h-full grid grid-rows-1	lg:grid-rows-3 shadow-md p-5	'>
        <SelectoptionHook fectParentKEY="building"  keyName = "building" title = "المنشأه" value ={building} setvalue ={setbuilding}/>
         <SelectoptionHook fectParentKEY="location"  keyName = "location" title = "الموقع" value ={location} setvalue ={setLocation} params={params}/>

           <SelectFloor  location={location} CurrentFloor={CurrentFloor} setCurrentfloor={setCurrentfloor}/>
           <SelectArea   location={location} CurrentFloor={CurrentFloor} CurrentArea={CurrentArea} setCurrentArea={setCurrentArea} />
            <SelectSection  location={location} CurrentFloor={CurrentFloor} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentSection={setCurrentSection}/>
           <SelectRooms  location={location} CurrentFloor={CurrentFloor} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentSection={setCurrentSection} CurrentRoom={CurrentRoom} setCurrentRoom={setCurrentRoom} />
         <FetchassetName  id={id}
  endpointKey={continued === "first" ? "mainCategoryAssets" : continued === "second" ? "categoryAssets" : "subCategoryAssets"}/>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="count"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
               عدد
              </label>
              <input
                type="number"
                id="count"
                name="count"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="assetsNumber"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
                رقم الإصل
              </label>
              <input
                type="text"
                id="assetsNumber"
                name="assetsNumber"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
          
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="supplier"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
                المورد 
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="manufacturingCompany"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
               الشركة المصنعة
              </label>
              <input
                type="text"
                id="manufacturingCompany"
                name="manufacturingCompany"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="financialValue"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
                القيمة المالية
              </label>
              <input
                type="number"
                id="financialValue"
                name="financialValue"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="purchaseDate"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
               تاريخ الشراء
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="lastMaintenanceDate"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
               تاريخ الصيانة الإخيره
              </label>
              <input
                type="date"
                id="lastMaintenanceDate"
                name="lastMaintenanceDate"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="nextMaintenanceDate"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
               تاريخ الصيانة القادمة
              </label>
              <input
                type="date"
                id="nextMaintenanceDate"
                name="nextMaintenanceDate"
           
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="kind"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
              حالة الإصل
              </label>
              <select name="kind" id="kind" className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              >
                <option value="">قم بإختيار النوع</option>
                <option value="صالح الإستخدام"> صالح الإستخدام </option>
                <option value="غير صالح للإستخدام"> غير صالح للإستخدام</option>
                <option value="بحاجة لصيانة">بحاجة لصيانة</option>
              
              </select>
        
           
            </div>
            <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="notes"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
             ملاحظات
              </label>
        <textarea name='notes' id='notes' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">

        </textarea>
        
           
            </div>

           <UploadPdf  pdfs={pdfs} handelFiles={handleFiles} setPdfs={setPdfs}/>

      


              

             
              {/* wrrap button layout */}
              <Wrapbtn to={"/all-assets"} />
       
          {/* wrrap buttons layout */}
        </form>
        {/* form add new estbilshment */}
    </div>
  )
}

export default Addassets