import React from 'react'

import useQuerygetiteams from '../../../../../services/Querygetiteams'
import Loader from '../../../../../components/common/Loader'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
import HeadPagestyle from '../../../../../components/common/HeadPagestyle'
import CustomeTabel from '../../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import useQueryDelete from '../../../../../services/useQueryDelete'
const GetEsbilshAssets = () => {
    const {id} = useParams()
    const params =  {
        building:id
      } 
  const {data , isLoading} = useQuerygetiteams("assets" , "assets" , params)
  const {deleteIteam , isLoading:loaddingDelete} = useQueryDelete("assets" , "assets")
  const CurrentesbilshAsset = data?.data?.data
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
                         <Link to={`/asset-edit/${row._id}`}  className="hover:text-primary">
                           <MdOutlineEditNote size={20}/>
                         </Link>
                         <button className={`${loaddingDelete ? "cursor-wait" :""} hover:text-red-500`} onClick={() => deleteIteam(row._id)}>
                           <AiTwotoneDelete size={20}/>
                         </button>
                       </div>
                     )
                
                 }
      ]
if(isLoading){
  return <Loader />
}
return (
  <div>
      <HeadPagestyle  pageName={`اصول منشاه / ${CurrentesbilshAsset[0]?.location[0]?.build?.name || "غير محدد"}`}to={`/Establishment-overView/${CurrentesbilshAsset[0]?.building || "undfined"}`} title="عوده"/>
      <CustomeTabel columns={columns} data={data?.data?.data} />
  </div>
)
}

export default GetEsbilshAssets