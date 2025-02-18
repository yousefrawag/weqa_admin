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
const GetEsbilshLocation = () => {
    const {id} = useParams()
    const params =  {
        building:id
      } 
  const {data , isLoading} = useQuerygetiteams("location" , "location" , params)
  const {deleteIteam , isLoading:loaddingDelete} = useQueryDelete("location" , "location")
  const CurrentesbilshAsset = data?.data?.data

  const columns = [
          {
              name:"الموقع",
              selector: (row) => row.name,
  
          },
          {
              name:"النوع",
              selector: (row) => row.kind === "indoor" ? "داخلى" : "خارجى",
  
          },
          {
              name:"المنشأه",
              selector: (row) => row.building?.name,
  
          },
          {
              name:"عدد الإدوار",
              selector: (row) => row.floors?.length,
  
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
                         <Link to={`/locations/${row._id}`} className="hover:text-primary">
                         <GrFormView size={20} />
                         </Link>
                      
                
                       </div>
                     )
                
                 }
      ]
if(isLoading){
  return <Loader />
}
return (
  <div>
      <HeadPagestyle  pageName={`مواقع منشاه / ${CurrentesbilshAsset[0]?.building?.name || "غير محدد"}`}to={`/Establishment-overView/${id|| "undfined"}`} title="عوده"/>
      <CustomeTabel columns={columns} data={data?.data?.data} />
  </div>
)
}

export default GetEsbilshLocation