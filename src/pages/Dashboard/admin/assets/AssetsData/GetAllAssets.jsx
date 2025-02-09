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
import { useState } from 'react';
import FiltertionHook from '../../../../../hooks/FiltertionHook';
import useGetUserAuthentications  from '../../../../../middleware/GetuserAuthencations';
const GetAllAssets = () => {
    const [params , setParams] = useState({
      field: "",
      searTerm: "",
      startDate: "",
      endDate: "",
    })
  const filters = [
    {
      value:"assetsName",
      name:"إسم الإصل"
    },
    {
      value:"subCategoryAssets",
      name:"فئة الإصل"
    },
    {
      value:"location",
      name:" المنشأه"
    },
    {
      value:"location",
      name:"الموقع"
    },
    {
      value:"location",
      name:"الدور"
    },
    {
      value:"location",
      name:"المنطقة"
    },
    {
      value:"location",
      name:"القسم"
    },
    {
      value:"location",
      name:"الغرفة"
    },
    {
      value:"location",
      name:"الموقع"
    },
  
  ]


    const {data , isLoading} = useQuerygetiteams("assets" , "assets")
    const {deleteIteam , isLoading:loaddingDelete} = useQueryDelete("assets" , "assets")
    const {isOwner, iscanAdd, iscanDelete, iscanPut, iscanView} = useGetUserAuthentications ("assets")
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
                        isOwner || iscanDelete ? <button className={`${loaddingDelete ? "cursor-wait" :""} hover:text-red-500`} onClick={() => deleteIteam(row._id)}>
                        <AiTwotoneDelete size={20}/>
                      </button> : null
                       }
                           
                         </div>
                       )
                  
                   }
        ]
  if(isLoading){
    return <Loader />
  }
  return (
    <div>
        <HeadPagestyle  isOwner={isOwner} iscanAdd={iscanAdd} pageName="جميع الإصول" to="/Assets-Onboarding" title="عوده"/>

        <FiltertionHook filters={filters} params={params} setParams={setParams} />
        <CustomeTabel columns={columns} data={data?.data?.data} />
    </div>
  )
}

export default GetAllAssets