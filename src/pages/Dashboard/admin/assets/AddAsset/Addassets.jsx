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
import CreateFormAsset from '../../../../../hooks/CreateFormAsset'
import AssetFormmainData from './AssetFormmainData'
const Addassets = () => {
  // react hooks && custome fetch and add
 const {id , continued} = useParams()
 
  const {addIteam  ,isLoading} =  useQueryadditeam("assets" , "assets")
   // react hooks && custome fetch and add

  
  
 
  const [building , setbuilding] = useState("") 
  const [location , setLocation] = useState("")
  const [CurrentFloor , setCurrentfloor] = useState("")
  const [CurrentArea , setCurrentArea] = useState("")
  const [CurrentSection , setCurrentSection] = useState("")
  const [CurrentRoom , setCurrentRoom] = useState("")
  const AssetDataType  = [{name:"بيانات أساسيه" , key:"genarlildata"} , {name: "بيانات مالية" , key:"finnincedata"} , {name:"بيانات تشغيلية" , key:"genarlildataWorks"} ]
  const [SelectedType , setSelectedType] = useState("genarlildata")
  const params =  {
    building
  }
  const [formDatainput, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
      for (const [key, value] of Object.entries(formDatainput)) {
        console.log(key , value);
        
        formData.set(key, value);
      }
      const data = Object.fromEntries(formData);
      formData.set("continued" ,continued )
     formData.set("location" , location )
     formData.set("floor" , CurrentFloor )
     formData.set("area" , CurrentArea )
     formData.set("section" , CurrentSection )
     formData.set("room" , CurrentRoom )
     formData.set("subCategoryAssets" , id )

    pdfs.forEach((item) =>
      formData.append("pdf", item.file)
  )

      if(!data.assetsName){
        toast.error("يجب إضافه اسم الاصل")
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
       
        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
        {
          AssetDataType?.map((item) => {
            return <button   
            onClick={() => setSelectedType(item.key)}                     
             className={`block text-white  ${SelectedType === item.key ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
            key={item.key} value={item.key}>{item.name}</button>
          })
        }
        </div>
        <form onSubmit={handelSubmit} className='w-full h-full grid grid-rows-1	lg:grid-rows-3 shadow-md p-5	'>
          {/* بيانات اساسيه  ref to genarlildata*/}
          {
            SelectedType === "genarlildata" && <AssetFormmainData params={params} continued ={continued} id ={id} location={location}  CurrentFloor={CurrentFloor}  setCurrentfloor={setCurrentfloor}  building={building} setbuilding={setbuilding} setLocation={setLocation} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentArea ={setCurrentArea} setCurrentSection ={setCurrentSection} CurrentRoom ={CurrentRoom} setCurrentRoom ={setCurrentRoom}/>
          }
 
 {/* بيانات اساسيه */}
              <CreateFormAsset   formData={formDatainput}
          handleInputChange={handleInputChange}  SelectedType={SelectedType} endpointKey={continued === "first" ? "mainCategoryAssets" : continued === "second" ? "categoryAssets" : "subCategoryAssets"} id={id} />
                <UploadPdf  pdfs={pdfs} handelFiles={handleFiles} setPdfs={setPdfs}/>
              {
                 SelectedType === "genarlildata" ? <Wrapbtn to={"/all-assets"} /> :<span  className='text-red-500'>يجب رجوع للبيانات الرئيسيه لحفظ جميع البيانات</span>
              }  
   </form> 
    </div>
  )
}

export default Addassets













// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="assetsNumber"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//   رقم الإصل
// </label>
// <input
//   type="text"
//   id="assetsNumber"
//   name="assetsNumber"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>

// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="supplier"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//   المورد 
// </label>
// <input
//   type="text"
//   id="supplier"
//   name="supplier"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="manufacturingCompany"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//  الشركة المصنعة
// </label>
// <input
//   type="text"
//   id="manufacturingCompany"
//   name="manufacturingCompany"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="financialValue"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//   القيمة المالية
// </label>
// <input
//   type="number"
//   id="financialValue"
//   name="financialValue"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="purchaseDate"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//  تاريخ الشراء
// </label>
// <input
//   type="date"
//   id="purchaseDate"
//   name="purchaseDate"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="lastMaintenanceDate"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//  تاريخ الصيانة الإخيره
// </label>
// <input
//   type="date"
//   id="lastMaintenanceDate"
//   name="lastMaintenanceDate"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="nextMaintenanceDate"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
//  تاريخ الصيانة القادمة
// </label>
// <input
//   type="date"
//   id="nextMaintenanceDate"
//   name="nextMaintenanceDate"

//   className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// />

// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="kind"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
// حالة الإصل
// </label>
// <select name="kind" id="kind" className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
// >
//   <option value="">قم بإختيار النوع</option>
//   <option value="صالح الإستخدام"> صالح الإستخدام </option>
//   <option value="غير صالح للإستخدام"> غير صالح للإستخدام</option>
//   <option value="بحاجة لصيانة">بحاجة لصيانة</option>

// </select>


// </div>
// <div className="mb-6 flex flex-col  gap-2">
// <label
//   htmlFor="notes"
//   className="w-full text-lg font-medium text-gray-700 dark:text-white"
// >
// ملاحظات
// </label>
// <textarea name='notes' id='notes' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">

// </textarea>


// </div>