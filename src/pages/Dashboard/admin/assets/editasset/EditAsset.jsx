import React, { useEffect, useState } from 'react'
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
import AssetFormmainData from '../AddAsset/AssetFormmainData'
import useQueryupdate from '../../../../../services/useQueryupdate'
import {inputFields} from '../../../../../data/index'
const EditAsset = () => {
  // react hooks && custome fetch and add
 const {id } = useParams()
 const {data , isLoading:loadingget} = useQuerygetSpacficIteam("assets" , "assets" , id)
  const {updateiteam  ,isLoading} =  useQueryupdate("assets" , "assets")
  const Currentasset = data?.data
   // react hooks && custome fetch and add
  
 
  const [building , setbuilding] = useState("") 
  const [location , setLocation] = useState("")
  const [CurrentFloor , setCurrentfloor] = useState("")
  const [CurrentArea , setCurrentArea] = useState("")
  const [CurrentSection , setCurrentSection] = useState("")
  const [CurrentRoom , setCurrentRoom] = useState("")
  const AssetDataType  = [{name:"بيانات أساسيه" , key:"genarlildata"} , {name: "بيانات مالية" , key:"finnincedata"} , {name:"بيانات تشغيلية" , key:"genarlildataWorks"}]
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
  
     formData.set("location" , location )
     formData.set("floor" , CurrentFloor )
     formData.set("area" , CurrentArea )
     formData.set("section" , CurrentSection )
     formData.set("room" , CurrentRoom )
   

  //   pdfs.forEach((item) =>
  //     formData.append("pdf", item.file)
  // )



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

console.log(data);

     
updateiteam({data:formData , id} , {
          onSuccess:() =>{
           
              e.target.reset()
           
              setPdfs([])
              navigate(`/all-assets`)
              toast.success("تم تعديل الإصل بنجاح")
          }
      })
  } catch (error) {
      console.log(error);
      toast.error("هناك خطاء فى تعديل اصل يرجى التأكد من جميع البيانات ")
  }
}
useEffect(() => {
if(Currentasset){
    console.log("cURRENTASSET" , Currentasset);
    console.log("cURRENTASSET" , id);
    
    setbuilding(Currentasset?.building)
    setLocation(Currentasset?.location[0]?._id)
    setCurrentfloor(Currentasset?.floor)
    setCurrentArea(Currentasset?.area)
    setCurrentSection(Currentasset?.section)
  
    setCurrentRoom(Currentasset?.room)
    const dynamicData = {};
    const dynamicKeys = inputFields?.map((field) => field.key);

    dynamicKeys.forEach((key) => {
      if (Currentasset[key] !== undefined) {
        dynamicData[key] = Currentasset[key];
      }
    });

    console.log("dynamicData:", dynamicData);

    // Set dynamic form data
    setFormData(dynamicData);
  
}
} , [])


if(isLoading || loadingget) {
  return <Loader />
}
  return (
    <div className='w-full'>
        <Breadcrumb  pageName="إضافه منشأه"/>
       
        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
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
            SelectedType === "genarlildata" && <AssetFormmainData params={params} continued ={Currentasset?.continued} id={Currentasset?.subCategoryAssets[0]?._id} location={location}  CurrentFloor={CurrentFloor}  setCurrentfloor={setCurrentfloor}  building={building} setbuilding={setbuilding} setLocation={setLocation} CurrentSection={CurrentSection} CurrentArea={CurrentArea} setCurrentArea ={setCurrentArea} setCurrentSection ={setCurrentSection} CurrentRoom ={CurrentRoom} setCurrentRoom ={setCurrentRoom}/>
          }
 
 {/* بيانات اساسيه */}

              <CreateFormAsset   formData={formDatainput}
          handleInputChange={handleInputChange}  SelectedType={SelectedType} endpointKey={Currentasset?.continued === "first" ? "mainCategoryAssets" : Currentasset?.continued === "second" ? "categoryAssets" : "subCategoryAssets"} id={Currentasset?.subCategoryAssets[0]?._id} />
                <UploadPdf  pdfs={pdfs} handelFiles={handleFiles} setPdfs={setPdfs}/>
                <Wrapbtn to={"/all-assets"} />
   </form> 
    </div>
  )
}

export default EditAsset