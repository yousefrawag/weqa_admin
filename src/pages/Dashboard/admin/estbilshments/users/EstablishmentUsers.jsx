import React from 'react'
import CustomeTabel from '../../../../../components/common/CustomeTabel';
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import HeadPagestyle from '../../../../../components/common/HeadPagestyle';
import { Link, useParams } from 'react-router-dom'
import useQuerygetiteams from '../../../../../services/Querygetiteams';
import { format } from 'date-fns';
import Loader from '../../../../../components/common/Loader';
const EstablishmentUsers = () => {
 const {id} = useParams()
 const params = {
  building:id
 } 
 const {data , isLoading} = useQuerygetiteams("employee" , "employee", params)
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
               name:"نوع الحساب",
               selector: (row) => <span className='text-wrap'> { row?.role}</span> ,
   
           },
           {
                     name: "تاريخ الانشاء",
                     selector: (row) => row.createdAt,
                     cell: (row) => (
                       <div>{format(new Date(row.createdAt), "dd MMMM, yyyy")}</div>
                     ),
                   },
        
            // {
            //           name:"إجراء",
            //           cell:(row) => (
            //               <div className="flex items-center justify-center space-x-3.5">
            //               <Link to={`/user-overview/${row._id}`} className="hover:text-primary">
            //               <GrFormView size={20} />
            //               </Link>
            //               {
            //                isOwner || iscanPut ? 
            //                <Link to={`/update-user/${row._id}`}  className="hover:text-primary">
            //                <MdOutlineEditNote size={20}/>
            //              </Link> : null
            //               }
            //            {
            //              isOwner || iscanDelete ?  <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
            //              <AiTwotoneDelete size={20}/>
            //            </button> : null
            //            }
                         
            //             </div>
            //           )
                 
            //       }
       ]
   if(isLoading) {
    return <Loader />
   } 
  return (
    <div>
        
 
    <HeadPagestyle pageName={"المستخدمين"} title={"إضافة مستخدم"} to={"/establishments/:23/users/add"}/>
    
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data?.data?.data}/>
    </div>
    
        </div>
  )
}

export default EstablishmentUsers