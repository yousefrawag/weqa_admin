import React from 'react'
import CustomeTabel from '../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import HeadPagestyle from '../../../../components/common/HeadPagestyle';
import { Link } from 'react-router-dom'
import useQuerygetiteams from '../../../../services/Querygetiteams';
import { format } from "date-fns";
import useQueryDelete from '../../../../services/useQueryDelete';
import Loader from '../../../../components/common/Loader';
import useGetUserAuthentications  from '../../../../middleware/GetuserAuthencations';
import { useState } from 'react';
import FiltertionHook from '../../../../hooks/FiltertionHook';
const Getlocations = () => {
    const [params , setParams] = useState({
      field: "",
      searTerm: "",
      startDate: "",
      endDate: "",
    })
  const filters = [
    {
      value:"name",
      name:"إسم الموقع"
    },
    {
      value:"kind",
      name:"نوع الموقع"
    },
    {
      value:"building.name",
      name:" المنشأه"
    },
  
  ]

  // HOKS FETCH AND DELEET WITH PERMISSIONS
    const { isError , isLoading , data} =  useQuerygetiteams("location" , "location")
    const {deleteIteam} = useQueryDelete("location" , "location")
    const {isOwner, iscanAdd, iscanDelete, iscanPut} = useGetUserAuthentications ("location")
 // HOKS FETCH AND DELEET WITH PERMISSIONS

// tabel colums
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
                       {
                        isOwner || iscanPut ? <Link to={`/locations-edit/${row._id}`}  className="hover:text-primary">
                        <MdOutlineEditNote size={20}/>
                      </Link>: null
                       }
                   {
                    iscanDelete  || isOwner ?    <button className="hover:text-red-500" onClick={() => deleteIteam(row._id)}>
                    <AiTwotoneDelete size={20}/>
                  </button> :null
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
        
        <HeadPagestyle pageName="المواقع" to={"/Add-Location"} title={"إضافة موقع"} isOwner={isOwner}  iscanAdd={iscanAdd}/>
    
    <FiltertionHook filters={filters} params={params} setParams={setParams} />
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data?.data?.data}/>
    </div>
    
    </div>
  )
}

export default Getlocations