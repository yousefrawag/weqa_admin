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
import { useState , useMemo } from 'react';
import FiltertionHook from '../../../../hooks/FiltertionHook';
const Getlocations = () => {


  // HOKS FETCH AND DELEET WITH PERMISSIONS
    const { isError , isLoading , data} =  useQuerygetiteams("location" , "location")
    const {deleteIteam} = useQueryDelete("location" , "location")
    const {isOwner, iscanAdd, iscanDelete, iscanPut} = useGetUserAuthentications ("location")
 // HOKS FETCH AND DELEET WITH PERMISSIONS

 // SET FILTER SECTION 
 const [params, setParams] = useState({
   field: "",
   searchTerm: "",
   startDate: "",
   endDate: "",
 });
 
 const filters = [
   {
     value: "name",
     name: "إسم الموقع"
   },
 
   {
     value: "kind",
     name: "نوع الموقع"
   },
   {
     value: "building.name",
     name: " المنشأه"
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
// tabel colums
    const columns = [
        {
            name:"الموقع",
            selector: (row) => row.name,

        },
        {
            name:"النوع",
            selector: (row) => row.kind ,

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
   // export excel data 
    const exportColumns = [
      {
        name: "الموقع",
        value: "name", // Direct property access
      },
      {
        name: "النوع",
        value: "kind", // Direct property access
      },
      {
        name: "المنشأه",
        value: "building.name", // Nested property access
      },
      {
        name: "عدد الإدوار",
        selector: (row) => row.floors?.length || 0, // Custom logic for floors length
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
        
        <HeadPagestyle pageName="المواقع" to={"/Add-Location"} title={"إضافة موقع"} isOwner={isOwner}  iscanAdd={iscanAdd}/>
    
        <FiltertionHook filteredData={filteredData} columns={exportColumns} filters={filters} params={params} setParams={setParams} />
        <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={filteredData}/>
    </div>
    
    </div>
  )
}

export default Getlocations