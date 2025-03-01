import React from 'react'
import Breadcrumb from '../../../../../components/common/Breadcrumbs/Breadcrumb'
import CustomeTabel from '../../../../../components/common/CustomeTabel'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'
import useQuerygetiteams from '../../../../../services/Querygetiteams';
import Loader from '../../../../../components/common/Loader';
import useQueryDelete from '../../../../../services/useQueryDelete';
import { format } from 'date-fns';
import HeadPagestyle from '../../../../../components/common/HeadPagestyle';
import { useState , useMemo } from 'react';
import FiltertionHook from '../../../../../hooks/FiltertionHook';
import useGetUserAuthentications  from '../../../../../middleware/GetuserAuthencations';
import DropdownDefault from '../../../../../components/common/Dropdowns/DropdownDefault';
import useQueryupdate from '../../../../../services/useQueryupdate';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
const UserAssets = () => {
    const user = useSelector((state) => state.userState.userinfo)
const params = {
    createBy:user?._id
}
    const {data , isLoading} = useQuerygetiteams("assets/myAssets" , "assets")
    const {deleteIteam , isLoading:loaddingDelete} = useQueryDelete("assets" , "assets")
    const {isOwner, iscanAdd, iscanDelete, iscanPut, iscanView} = useGetUserAuthentications ("assets")
    const AllStauts = [{key:"all" , name:"الكل"} , {key:"underReview" , name:"قيد المراجعة"} ,{key:"reviewed" , name:"تمت المراجعه"}  ,  {key:"underDelete" , name:"قيد الحذف"} ,{key:"deleted" , name:"تم الحذف "} , {key:"underUpdate" , name:"قيد التعديل"}  , {key:"updated" , name:"تم التعديل"}]
    const RquestSatuts = [{key:"underDelete" , name:"إرسال طلب حذف"} , {key:"underUpdate" , name:"إرسال طلب تعديل"}]
    const [SelectedType , setSelectedType] = useState("all")
    const {updateiteam} = useQueryupdate("assets/status" , "assets")
 const UpdateStuts  = (id , status) => {
try {
  updateiteam({data:{status} , id} , {
    onSuccess:() =>{
     
      
     
       
        toast.success("تم إرسال طلبك بنجاح")
    }
})
} catch (error) {
  toast.error("هناك خطاء فى تعديل حاله الاصل")
}
 }
  

    const filteredData = useMemo(() => {
      if (!data?.data.data) return [];
    if(SelectedType === "all") {
      return data?.data?.data
    }
      return data.data?.data.filter(item => item.status === SelectedType);
    }, [data, SelectedType]);
      

       const columns = [
     
        {
          name:"فئه الإصل",
          selector: (row) => <span className="text-wrap">{row?.subCategoryAssets[0]?.name || "غير معروف"}</span> ,

      },
        {
            name:"المنشأه",
            selector: (row) => <span className='text-wrap'>{row?.building?.name}</span> ,

        },
        {
            name:"الموقع",
            selector: (row) =><span className='text-wrap'>{row?.location[0]?.name}</span> ,

        },
        {
          name:"مضاف من قبل",
          selector: (row) =><span className='text-wrap'>{row?.createBy?.username}</span> ,

      },

       
          
        
           
      {
        name: "حاله الاصل",
        selector: (row) => (
          <span
            style={{ minWidth: "120px", maxWidth: "200px", whiteSpace: "normal" }}
            className={`px-3 py-1 rounded-md text-white whitespace-nowrap min-w-[120px] text-center
              ${row?.status === "underReview" ? "bg-yellow-500" :
                row?.status === "reviewed" ? "bg-green-500" :
                row?.status === "underDelete" ? "bg-red-500" :
                row?.status === "deleted" ? "bg-gray-500" :
                row?.status === "underUpdate" ? "bg-blue-500" :
                row?.status === "updated" ? "bg-purple-500" :
                "bg-gray-500"}`}
          >
            {row?.status === "underReview" ? "قيد المراجعة" :
              row?.status === "reviewed" ? "تمت المراجعة" :
              row?.status === "underDelete" ? "قيد الحذف" :
              row?.status === "deleted" ? "تم الحذف" :
              row?.status === "underUpdate" ? "قيد التحديث" :
              row?.status === "updated" ? "تم التحديث" :
              "غير معروف"}
          </span>
        )
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
                        <DropdownDefault
                        row={row}
                        
                       
                        loaddingDelete={loaddingDelete}
                        status={RquestSatuts}
                        UpdateStuts={UpdateStuts}
                      />
                       )
                  
                   }
        ]

         
  if(isLoading){
    return <Loader />
  }
  return (
    <div>
        <HeadPagestyle  isOwner={isOwner} iscanAdd={iscanAdd} pageName="أصول قمت بإضافتها" to="/Assets-Onboarding" title="عوده"/>
        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 mb-10'>
        {
          AllStauts?.map((item) => {
            return <button   
            onClick={() => setSelectedType(item.key)}                     
             className={`block text-white  ${SelectedType === item.key ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
            key={item.key} value={item.key}>{item.name}</button>
          })
        }
        </div>

        <CustomeTabel columns={columns} data={filteredData} />
    </div>
  )
}

export default UserAssets