import React from 'react'
import HeadPagestyle from '../../../../../components/common/HeadPagestyle'
import CustomeTabel from '../../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'
import useQuerygetiteams from '../../../../../services/Querygetiteams';
import Loader from '../../../../../components/common/Loader';
import useQueryDelete from '../../../../../services/useQueryDelete';
import useQuerygetSpacficIteam from '../../../../../services/QuerygetSpacficIteam';
import { format } from 'date-fns';
import CardLevelCategoray from '../../../../../components/ui/assets/CardLevelCategoray';
import useGetUserAuthentications  from '../../../../../middleware/GetuserAuthencations'
import FiltertionHook from '../../../../../hooks/FiltertionHook';
import { useState , useMemo } from 'react';

const GetAssetsByCategoray = () => {
    const {id , continued} = useParams()
  
    const {data , isLoading} = useQuerygetSpacficIteam("assets/category" , "assets/category" , id)
    const {deleteIteam , isLoading:loaddingDelete} = useQueryDelete("assets" , "assets")
    const {isOwner, iscanAdd, iscanDelete, iscanPut} = useGetUserAuthentications ("assets")

//FILTER SECTION 
const [params , setParams] = useState({
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
 if (!data?.data) return [];

 return data.data?.filter(item => {
   if (params.searchTerm && params.field) {
     const fieldValue = params.field.split('.').reduce((obj, key) => obj?.[key], item);
     return fieldValue?.toLowerCase().includes(params.searchTerm.toLowerCase());
   }
   return true;
 });
}, [data, params]);

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
            selector: (row) => <span className='text-wrap'>{row?.location[0]?.build?.name}</span> ,

        },
        {
            name:"الموقع",
            selector: (row) =><span className='text-wrap'>{row?.location[0]?.name}</span> ,

        },

       
          
        {
          name:"الدور",
          selector: (row) => row?.locationDetails[0]?.floorName,

      },
      {
          name:"المنطقة",
          selector: (row) => row?.locationDetails[0]?.areaName,

      },
      {
        name:"القسم",
        selector: (row) => row.locationDetails[0]?.sectionName,

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
                            isOwner || iscanPut ?   <Link to={`/asset-edit/${row._id}`}  className="hover:text-primary">
                            <MdOutlineEditNote size={20}/>
                          </Link> :null
                           }
                         {
                          isOwner || iscanDelete ?     <button className={`${loaddingDelete ? "cursor-wait" :""} hover:text-red-500`} onClick={() => deleteIteam(row._id)}>
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
    
         <HeadPagestyle  pageName=" بيانات الإصول"  to={`/add-assets/${id}/${continued}`} title="إضافة أصل"  iscanAdd={iscanAdd} isOwner={isOwner}/>

   
       <CardLevelCategoray continued={continued === "first" ? "second" :continued === "third" ? "fourth":"third" }  id={id} fetchkey={`${continued === "first" ? "mainCategoryAssets" :continued === "second" ? "categoryAssets" : continued === "third" ? "subCategoryAssets" : continued === "fourth" ? "nestSubCategoryAssets":"mainCategoryAssets"}`}/>
       <FiltertionHook filteredData={filteredData} columns={exportColumns} filters={filters} params={params} setParams={setParams} />

        <CustomeTabel columns={columns} data={filteredData} />
    </div>
  )
}

export default GetAssetsByCategoray