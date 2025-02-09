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
    value:"username",
    name:"الإسم"
  },
  {
    value:"phone",
    name:"رقم الجوال"
  },
  {
    value:"email",
    name:"الإيميل"
  },
  {
    value:"address.city",
    name:"المدينة"
  },
  {
    value:"identity",
    name:"رقم الهوية"
  },
  {
    value:"permissions",
    name:"الصلاحية"
  },

]
const {isError , isLoading , data} = useQuerygetiteams("employee" , "employee")
const {deleteIteam} = useQueryDelete("employee" , "employee")
 const {isOwner , iscanAdd} = GetuserAuthencations("employee")
 const columns = [
  {
    name: "قسم التذكرة", // Ticket Category
    selector: (row) => row.category,
  },
  {
    name: "أولوية التذكرة", // Ticket Priority
    selector: (row) => <span className="text-wrap">{row.priority}</span>,
  },
  {
    name: "حالة التذكرة", // Ticket Status
    selector: (row) => <span className="text-wrap">{row.status}</span>,
  },
  {
    name: "المستخدم", // User
    selector: (row) => row.user,
  },
  {
    name: "المنشأة", // Establishment
    selector: (row) => <span className="text-wrap">{row.establishment}</span>,
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
        <button className="hover:text-primary" onClick={() => openChat(row._id)}>
          <BsChatDots size={20} />
        </button>
        {/* Delete Icon */}
        <button className="hover:text-primary" onClick={() => deleteItem(row._id)}>
          <AiTwotoneDelete size={20} />
        </button>
      </div>
    ),
  },
];
const fakeData = [
  {
    _id: "1",
    category: "الأصول",
    priority: "عاجلة",
    status: "مفتوحة",
    user: "أحمد علي",
    establishment: "مستشفى النور",
    createdAt: new Date(),
  },
  {
    _id: "2",
    category: "المواقع",
    priority: "متوسطة",
    status: "قيد المراجعة",
    user: "محمد حسن",
    establishment: "مستشفى السلام",
    createdAt: new Date(),
  },
  {
    _id: "3",
    category: "المواقع",
    priority: "متوسطة",
    status: "قيد المراجعة",
    user: "محمد حسن",
    establishment: "مستشفى السلام",
    createdAt: new Date(),
  },
  {
    _id: "4",
    category: "المستخدمين",
    priority: "متوسطة",
    status: "قيد المراجعة",
    user: "محمد حسن",
    establishment: "مستشفى السلام",
    createdAt: new Date(),
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
  <CustomeTabel columns={columns} data={fakeData}/>
  </div>
  
      </div>
)
}

export default ChatOverview