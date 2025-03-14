import React from 'react'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
import CustomeTabel from '../../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'
import useQuerygetiteams from '../../../../../services/Querygetiteams';
import Loader from '../../../../../components/common/Loader';
import useQueryDelete from '../../../../../services/useQueryDelete';
import { format } from 'date-fns';
import HeadPagestyle from '../../../../../components/common/HeadPagestyle';
import { useState , useMemo } from 'react';
import FiltertionHook from '../../../../../hooks/FiltertionHook';
import useGetUserAuthentications  from '../../../../../middleware/GetuserAuthencations';
import useQueryupdate from '../../../../../services/useQueryupdate';
import toast from 'react-hot-toast';
const GetAllAssets = () => {
const params = {
  status:"reviewed"
} 
    const {data , isLoading} = useQuerygetiteams("assets" , "assets" , params)
    const {updateiteam , isLoading:loaddingDelete} = useQueryupdate("assets/status" , "assets")
    const {isOwner, iscanAdd, iscanDelete, iscanPut, iscanView} = useGetUserAuthentications ("assets")
    const AssetsReviwed = data?.data?.data?.filter((item) => item.status === "reviewed")
    const [paramsearch , setParams] = useState({
      field: "",
      searchTerm: "",
      startDate: "",
      endDate: "",
    })
    const filters = [
      {
        value:"assetsName",
        name:"إسم الإصل"
      },
      {
        value:"subCategoryAssets[0].name",
        name:"فئة الإصل"
      },
      {
        value:"location[0].build.name",
        name:" المنشأه"
      },
      {
        value:"location[0].name",
        name:"الموقع"
      },
      {
        value:"locationDetails[0].floorName",
        name:"الدور"
      },
      {
        value:"locationDetails[0].areaName",
        name:"المنطقة"
      },
      {
        value:"locationDetails[0].sectionName",
        name:"القسم"
      },
      {
        value:"locationDetails[0].roomName",
        name:"الغرفة"
      },

    
    ]

    const filteredData = useMemo(() => {
      if (!AssetsReviwed) return [];
    
      return AssetsReviwed?.filter(item => {
        if (paramsearch.searchTerm && paramsearch.field) {
          // Fix array index access in params.field
          const fieldValue = paramsearch.field
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .reduce((obj, key) => obj?.[key], item);
    
          return fieldValue?.toString().toLowerCase().includes(paramsearch.searchTerm.toLowerCase());
        }
        return true;
      });
    }, [AssetsReviwed, paramsearch]);
    //handel update assets stauts 
    const UpdateStuts  = (id , status) => {
      try {
        updateiteam({data:{status} , id} , {
          onSuccess:() =>{
           
            
           
             
              toast.success("تم  إرسال الإصل الى الارشيف  بنجاح")
          }
      })
      } catch (error) {
        toast.error("هناك خطاء فى تعديل حاله الاصل")
      }
       }     
 // TABEL DATA COLUMS 
       const columns = [
        {
            name:"إسم الإصل",
            selector: (row) =><span className='text-wrap'>{row.assetsName}</span> ,

        },
        {
          name:"فئه الإصل",
          selector: (row) => <span className="text-wrap">{row?.subCategoryAssets[0]?.name || "غير معروف"}</span> ,

      },
        {
            name:"المنشأه",
            selector: (row) => <span className='text-wrap'>{row?.building?.name}</span> ,

        },
        {
            name:"الموقع",
            selector: (row) =><span className='text-wrap'>{row?.location[0]?.name}</span> ,

        },

       
          
            {
                name:"الدور",
                selector: (row) =><span className='text-wrap'>{row?.locationDetails[0]?.floorName}</span> ,
    
            },
            {
                name:"المنطقة",
                selector: (row) => row?.locationDetails[0]?.areaName || "غير معروف",
    
            },
            {
                name:"القسم",
                selector: (row) => row.locationDetails[0]?.sectionName || "غير معروف",
    
            },
            {
                name:"الغرفة",
                selector: (row) => <span className='text-wrap'>{row?.locationDetails[0]?.roomName}</span> ,
    
            },
      
       
            {
                name: "تاريخ الانشاء",
                selector: (row) => row.createdAt,
                cell: (row) => (
                  <div>{format(new Date(row.createdAt), "dd MMMM, yyyy")}</div>
                ),
              },
          
         
             {
                       name:"إجراء",
                       cell:(row) => (
                           <div className="flex items-center justify-center space-x-3.5">
                           <Link to={`/assetOverview/${row._id}`} className="hover:text-primary">
                           <GrFormView size={20} />
                           </Link>
                           {
                            isOwner || iscanPut ?     <Link to={`/asset-edit/${row._id}`}  className="hover:text-primary">
                            <MdOutlineEditNote size={20}/>
                          </Link> : null
                           }
                       {
                        isOwner || iscanDelete ? <button className={`${loaddingDelete ? "cursor-wait" :""} hover:text-red-500`} onClick={() => UpdateStuts(row?._id , "deleted")}>
                        <AiTwotoneDelete size={20}/>
                      </button> : null
                       }
                           
                         </div>
                       )
                  
                   }
        ]

       //EXPORT DATA IN EXCEL COLUMS 
      const exportColumns = [
        {
          name: "إسم الإصل",
          value: "assetsName", // Direct property access
        },
        {
          name: "فئه الاصل",
          value: "subCategoryAssets[0].name", // Direct property access
        },
        {
          name: "المنشأه",
          value: "building.name", // Nested property access
        },
        {
          name: "الموقع ",
          value: "location[0].name"
        },
   
        {
          name: "الدور",
          value: "locationDetails[0].floorName"
        },
        {
          name: "المنطقة ",
          value: "locationDetails[0].areaName"
        },
        {
          name: "القسم ",
          value: "locationDetails[0].sectionName "
        },
        {
          name: "المنطقة ",
          value: "locationDetails[0].areaName"
        },
        {
          name: "الغرفة ",
          value: "locationDetails[0].roomName"
        },
        {
          name: "تاريخ الانشاء",
          selector: (row) => format(new Date(row.createdAt), "dd MMMM, yyyy"), // Custom date formatting
        },
      ]; 
         
  if(isLoading){
    return <Loader />
  }
  return (
    <div>
        <HeadPagestyle  isOwner={isOwner} iscanAdd={iscanAdd} pageName="جميع الاصول التى تمت مراجعتها" to="/Assets-Onboarding" title="عوده"/>

        <FiltertionHook filteredData={filteredData} columns={exportColumns} filters={filters} params={paramsearch} setParams={setParams} />
        <CustomeTabel columns={columns} data={filteredData} />
    </div>
  )
}

export default GetAllAssets