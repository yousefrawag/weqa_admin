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
import GetuserAuthencations from '../../../../middleware/GetuserAuthencations'
import { useState  , useMemo } from 'react';
import FiltertionHook from '../../../../hooks/FiltertionHook';
const Getusers = () => {
  // HOOKS FETCH AND DELEET ITEMS
  const {isError , isLoading , data} = useQuerygetiteams("employee" , "employee")
  const {deleteIteam} = useQueryDelete("employee" , "employee")
   const {isOwner , iscanAdd , iscanDelete , iscanPut} = GetuserAuthencations("employee")

   // FILTER SECTION
 const [params, setParams] = useState({
   field: "",
   searchTerm: "",
   startDate: "",
   endDate: "",
 });
 
 const filters = [
   {
     value: "username",
     name: "إسم المستخدم"
   },
 
   {
     value: "phone",
     name: "الجوال"
   },
   {
     value: "email",
     name: "الأيميل"
   },
   {
    value: "address.city",
    name: "المدينة"
  },
  {
    value: "identity",
    name: "رقم الهوية"
  },
  {
    value: "role",
    name: "نوع الحساب "
  },
 
 ];
 
 const filteredData = useMemo(() => {
   if (!data?.data?.data) return [];
 
   return data.data.data.filter(item => {
     if (params.searchTerm && params.field) {
       const fieldValue = params.field.split('.').reduce((obj, key) => obj?.[key], item);
       return fieldValue?.toLowerCase().includes(params.searchTerm.toLowerCase());
     }
     return true;
   });
 }, [data, params]);

    const columns = [
        {
            name:"الإسم",
            selector: (row) => row.username,
            cell: (row) => (
              <div className='flex flex-col gap-3'>
                <img src={row.image} alt={row.username} className='w-7 h-7 rounded-full'/>
                <span>
                  {
                    row.username
                  }
                </span>
              </div>
            ),

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
        name:"المنشأه",
        selector: (row) => <span className='text-wrap'> {row.type ==="user" ? row.building?.name :"ليس تابع لمنشاه"}</span>  ,

    },
    {
      name:"نوع الحساب",
      selector: (row) => <span className='text-wrap'> { row?.role}</span> ,

  },
    {
      name:"الصلاحية",
      selector: (row) => <span className='text-wrap'> {row.role ==="owner" ? "مالك المنصة" : row?.permissions?.name}</span>  ,

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
                       <Link to={`/user-overview/${row._id}`} className="hover:text-primary">
                       <GrFormView size={20} />
                       </Link>
                       {
                        isOwner || iscanPut ? 
                        <Link to={`/update-user/${row._id}`}  className="hover:text-primary">
                        <MdOutlineEditNote size={20}/>
                      </Link> : null
                       }
                    {
                      isOwner || iscanDelete ?  <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
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
        <HeadPagestyle  pageName="المستخدمين" to="/Add-user" isOwner={isOwner} iscanAdd={iscanAdd} title={"إضافة مستخدم"} />

        <FiltertionHook filteredData={filteredData} columns={columns} filters={filters} params={params} setParams={setParams} />

    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={filteredData}/>
    </div>
    
        </div>
  )
}

export default Getusers