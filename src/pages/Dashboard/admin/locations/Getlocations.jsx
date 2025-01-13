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
const Getlocations = () => {
    const { isError , isLoading , data} =  useQuerygetiteams("location" , "location")
    const {deleteIteam} = useQueryDelete("location" , "location")
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
                       <Link to={`/locations-edit/${row._id}`}  className="hover:text-primary">
                         <MdOutlineEditNote size={20}/>
                       </Link>
                       <button className="hover:text-red-500" onClick={() => deleteIteam(row._id)}>
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
        
        <HeadPagestyle pageName="المواقع" to={"/Add-Location"} title={"إضافة موقع"} />
    
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data?.data?.data}/>
    </div>
    
    </div>
  )
}

export default Getlocations