import React from 'react'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import CustomeTabel from '../../../../components/common/CustomeTabel'
import { useState } from 'react'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import useQueryDelete from '../../../../services/useQueryDelete'
import GetuserAuthencations from '../../../../middleware/GetuserAuthencations'
import Loader from '../../../../components/common/Loader'
import FiltertionHook from '../../../../hooks/FiltertionHook'
import { AiTwotoneDelete } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { format } from 'date-fns';
import { Link } from 'react-router-dom'
const ChatOverview = () => {
  const [params , setParams] = useState({
    field: "",
    searTerm: "",
    startDate: "",
    endDate: "",
  })
const filters = [
  {
    value:"_id",
    name:"رقم التذكره"
  },
  {
    value:"Categoray",
    name:"قسم التذكره "
  },
  {
    value:"role",
    name:"نوع المستخدم"
  },
  {
    value:"user.username",
    name:"المستخدم"
  },
  // {
  //   value:"identity",
  //   name:"رقم الهوية"
  // },
  // {
  //   value:"permissions",
  //   name:"الصلاحية"
  // },

]
const {isError , isLoading , data} = useQuerygetiteams("Tickets" , "Tickets")
const {deleteIteam} = useQueryDelete("Tickets" , "Tickets")
 const {isOwner , iscanAdd} = GetuserAuthencations("Support")

 const columns = [
  {
    name: "رقم التذكرة", // Ticket Category
    selector: (row) => row._id,
  },
  {
    name: "قسم التذكرة", // Ticket Category
    selector: (row) => row.Categoray,
  },
  {
    name: "أولوية التذكرة", // Ticket Priority
    cell: (row) => (
      <span
        className={`px-3 py-1 rounded-md text-white whitespace-nowrap ${
          row.priority === "low"
            ? "bg-green-500"
            : row.priority === "high"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      >
        {row.priority === "low"
          ? "طبيعية"
          : row.priority === "high"
          ? "متوسطه"
          : "عاجلة"}
      </span>
    ),
  },
  {
    name: "حالة التذكرة", // Ticket Status
    cell: (row) => (
      <span
        className={`px-3 py-1 rounded-md text-white whitespace-nowrap ${
          row.status === "open" ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        {row.status === "open" ? "مفتوحة" : "مغلقة"}
      </span>
    ),
  },
  {
    name: "نوع المستخدم", // User
    selector: (row) => row.user?.role,
  },
  {
    name: "المستخدم", // User
    selector: (row) => row.user?.username,
  },
  {
    name: "المنشأة", // Establishment
    selector: (row) => <span className="text-wrap">{row.user?.building?.name || "ليس تابع لمنشأه مسؤل"}</span>,
  },
  {
    name: "تاريخ الإنشاء", // Creation Date
    selector: (row) => row.createdAt,
    cell: (row) => <div>{format(new Date(row.createdAt), "dd MMMM, yyyy")}</div>,
  },
  {
    name: "إجراء", // Actions
    cell: (row) => (
      <div className="flex items-center justify-center space-x-3.5">
        {/* Chat Icon */}
        <Link to={`/support-weqa/${row?._id}/${row?.user?._id}`} className="hover:text-primary" onClick={() => openChat(row._id)}>
          <BsChatDots size={20} />
        </Link>
        {/* Delete Icon */}
        <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
          <AiTwotoneDelete size={20} />
        </button>
      </div>
    ),
  },
];

if(isLoading){
return <Loader />
}
return (
  <div>
      <HeadPagestyle  pageName="المستخدمين" to="/support-weqa/Add-ticket" isOwner={isOwner} iscanAdd={iscanAdd} title={"إضافة تذكره"} />

      <FiltertionHook filters={filters} params={params} setParams={setParams} />

  <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
  <CustomeTabel columns={columns} data={data?.data?.data}/>
  </div>
  
      </div>
)
}

export default ChatOverview