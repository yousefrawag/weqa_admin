import React from 'react';
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb';
import CustomeTabel from '../../../../components/common/CustomeTabel';
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa'
import useQuerygetiteams from '../../../../services/Querygetiteams';
import HeadPagestyle from '../../../../components/common/HeadPagestyle';
import Loader from '../../../../components/common/Loader';
import useQueryDelete from '../../../../services/useQueryDelete';
import GetuserAuthencations from '../../../../middleware/GetuserAuthencations';
import { useState, useMemo } from 'react';
import FiltertionHook from '../../../../hooks/FiltertionHook';
import toast from 'react-hot-toast';
import axios from 'axios';
import useQueryupdate from '../../../../services/useQueryupdate';
const UsersRequets = () => {
  // HOOKS FETCH AND DELETE ITEMS
  const { isError, isLoading, data } = useQuerygetiteams("employee", "employee");
  const { updateiteam } = useQueryupdate("employee/status", "employee");
  const { isOwner, iscanAdd, iscanDelete, iscanPut } = GetuserAuthencations("employee");
    const usersRequestes = data?.data?.data?.filter((item) => item?.text === "underUpdate") 
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
    if (!usersRequestes) return [];

    return usersRequestes?.filter(item => {
      if (params.searchTerm && params.field) {
        const fieldValue = params.field.split('.').reduce((obj, key) => obj?.[key], item);
        return fieldValue?.toLowerCase().includes(params.searchTerm.toLowerCase());
      }
      return true;
    });
  }, [usersRequestes, params]);

// update user Request 
const UpdateStuts  = (id , status) => {
    try {
      updateiteam({data:{status} , id} , {
        onSuccess:() =>{
         
          
         
           
            toast.success("تم تعديل طلب مستخدم بنجاح")
        }
    })
    } catch (error) {
      toast.error("هناك خطاء فى تعديل حاله الاصل")
    }
     }  



  const columns = [
    {
      name: "الإسم",
      selector: (row) => row.username,
    },

    {
      name: "رقم الهوية",
      selector: (row) => <span className='text-wrap'> {row.identity}</span>,
    },
    {
      name: "نوع الحساب",
      selector: (row) => <span className='text-wrap'> {row?.role}</span>,
    },
    {
      name: "الحالة",
      cell: (row) => (
        <span
          style={{
            backgroundColor: row.status ? 'green' : 'red',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          {row.status ? "يمكن تعديل" : "لا يمكن تعديل"}
        </span>
      ),
    },
    {
      name: "إجراء",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-3.5">
          <Link to={`/user-overview/${row._id}`} className="hover:text-primary">
            <GrFormView size={20} />
          </Link>
          {isOwner || iscanDelete ? (
            <button
              style={{
                backgroundColor: 'green', // Green background for "قبول الطلب"
                color: 'white', // White text
                padding: '6px 12px', // Padding for better appearance
                borderRadius: '4px', // Rounded corners
                border: 'none', // Remove default border
                cursor: 'pointer', // Pointer cursor on hover
                display: 'flex', // Use flexbox for alignment
                alignItems: 'center', // Center items vertically
                gap: '4px', // Space between icon and text
              }}
              onClick={() => UpdateStuts(row?._id , true)} // Add your click handler
            >
              قبول 
            </button>
          ) : null}
          {isOwner || iscanDelete ? (
            <button
              style={{
                backgroundColor: 'red', // Red background for "رفض طلب"
                color: 'white', // White text
                padding: '6px 12px', // Padding for better appearance
                borderRadius: '4px', // Rounded corners
                border: 'none', // Remove default border
                cursor: 'pointer', // Pointer cursor on hover
                display: 'flex', // Use flexbox for alignment
                alignItems: 'center', // Center items vertically
                gap: '4px', // Space between icon and text
              }}
              onClick={() => UpdateStuts(row?._id , false)} // Add your click handler
            >
             
              رفض 
            </button>
          ) : null}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
        <Breadcrumb pageName="طلبات المستخدمين بشأن تعديل بيانتهم" />
      <FiltertionHook filteredData={filteredData} columns={columns} filters={filters} params={params} setParams={setParams} />
      <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
        <CustomeTabel columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default UsersRequets;