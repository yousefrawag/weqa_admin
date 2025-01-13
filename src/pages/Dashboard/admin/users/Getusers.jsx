import React from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import CustomeTabel from '../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
import useQuerygetiteams from '../../../../services/Querygetiteams';
import HeadPagestyle from '../../../../components/common/HeadPagestyle';
import Loader from '../../../../components/common/Loader';
import useQueryDelete from '../../../../services/useQueryDelete';
const Getusers = () => {
  const {isError , isLoading , data} = useQuerygetiteams("employee" , "employee")
  const {deleteIteam} = useQueryDelete("employee" , "employee")
    const columns = [
        {
            name:"الإسم",
            selector: (row) => row.username,

        },
        {
            name:"رقم الجوال",
            selector: (row) => <span className='text-wrap'> {row.phone}</span> ,

        },
        {
            name:"الايميل",
            selector: (row) => <span className='text-wrap'> {row.email}</span> ,

        },
        {
            name:"المدينه",
            selector: (row) => row.address?.city,

        },
        {
          name:"رقم الهوية",
          selector: (row) => <span className='text-wrap'> {row.identity}</span>  ,

      },
   
        {
            name:"الصلاحية",
            selector: (row) => <span className='text-wrap'> { row.role}</span> ,

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
                       <Link to={`/Establishment-overView/${row._id}`} className="hover:text-primary">
                       <GrFormView size={20} />
                       </Link>
                       <Link to={`/update-Establishment/${row._id}`}  className="hover:text-primary">
                         <MdOutlineEditNote size={20}/>
                       </Link>
                       <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
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
        <HeadPagestyle  pageName="المستخدمين" to="/Add-user" title={"إضافة مستخدم"} />

    
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data?.data?.data}/>
    </div>
    
        </div>
  )
}

export default Getusers