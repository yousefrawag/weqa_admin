import React from 'react'
import CustomeTabel from '../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'
import useQuerygetiteams from '../../../../services/Querygetiteams';
import Loader from '../../../../components/common/Loader';
import useQueryDelete from '../../../../services/useQueryDelete';
import { format } from 'date-fns';
import HeadPagestyle from '../../../../components/common/HeadPagestyle';
import employeesImage from "../../../../images/user/download.jpg"
import employeesImage2 from "../../../../images/user/sauid-user.png"
const Getpermissions = () => {
  
  const {data , isLoading} = useQuerygetiteams("assets" , "assets")
  const {deleteIteam , isLoading:loaddingDelete} = useQueryDelete("assets" , "assets")
     const columns = [
      {
          name:"إسم الصلاحية",
          selector: (row) =><span className='text-wrap'>{row.name}</span> ,

      },
      {
        name: "عدد المستخدمين",
        selector: (row) => row.name,
              cell: (row) => (
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <img
              src={employeesImage}
              alt={row.name}
              className='rounded-full'
              style={{ width: "30px", height: "30px", marginRight: "0", transform: "translateX(-1px)" }}
            />
          
            <span style={{backgroundColor: "#181C32", color: "white", width: "25px", height: "25px", display:"flex", fontSize: "10px", alignItems: "center", justifyContent: "center", borderRadius: "50%"}}>{row.count}</span>
          </div>
        ),
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
const fakedata = [
  {
    _d:"01" ,
    name:"مالك المنصة",
    count:4,
    createdAt:'2025-01-20T09:05:00Z'
  },
  {
    _d:"02" ,
    name:"مدير المنصة",
    count:3,
    createdAt:'2025-01-20T09:05:00Z'
  },
  {
    _d:"06" ,
    name:"مدير المنشأت",
    count:4,
    createdAt:'2025-01-20T09:05:00Z'
  },
  {
    _d:"07" ,
    name:"مدير فئات الإصول الامن والسلامة",
    count:8,
    createdAt:'2025-01-20T09:05:00Z'
  },
  {
    _d:"07" ,
    name:"مدير المواقع",
    count:9,
    createdAt:'2025-01-20T09:05:00Z'
  },
]
return (
  <div>
      <HeadPagestyle  pageName="الصلاحيات" to="/Add-permission" title="إضافة صلاحية"/>
      <CustomeTabel columns={columns} data={fakedata} />
  </div>
)
}

export default Getpermissions