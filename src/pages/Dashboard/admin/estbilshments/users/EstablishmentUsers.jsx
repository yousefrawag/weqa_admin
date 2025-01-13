import React from 'react'
import CustomeTabel from '../../../../../components/common/CustomeTabel';
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import HeadPagestyle from '../../../../../components/common/HeadPagestyle';
import { Link } from 'react-router-dom'
const EstablishmentUsers = () => {
    const columns = [
        {
            name:"الإسم",
            selector: (row) => row.name,

        },
        {
            name:"رقم الجوال",
            selector: (row) => row.name,

        },
        {
            name:"الايميل",
            selector: (row) => row.name,

        },
        {
            name:"المدينه",
            selector: (row) => row.name,

        },
     
        {
            name:"الصلاحية",
            selector: (row) => row.name,

        },
      
     
         {
                   name:"إجراء",
                   cell:(row) => (
                       <div className="flex items-center justify-center space-x-3.5">
                       <Link to={`/establishments/23/users/${row._id}/details`} className="hover:text-primary">
                       <GrFormView size={20} />
                       </Link>
                       <Link to={`/establishments/23/users/edit/${row._id}`}  className="hover:text-primary">
                         <MdOutlineEditNote size={20}/>
                       </Link>
                       <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
                         <AiTwotoneDelete size={20}/>
                       </button>
                     </div>
                   )
              
               }
    ]
    const data = [
        {
              name:"محمد احمد"
        },
        {
            name:" يوسف رواج"
      },
      {
        name:" طارق السلام"
  },
  {
    name:"ماجد الهوارى"
},

    ]
  return (
    <div>
        
 
    <HeadPagestyle pageName={"المستخدمين"} title={"إضافة مستخدم"} to={"/establishments/:23/users/add"}/>
    
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data}/>
    </div>
    
        </div>
  )
}

export default EstablishmentUsers