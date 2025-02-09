import React, { useState } from 'react'
import CustomeTabel from '../../../../components/common/CustomeTabel'
import { Link } from 'react-router-dom'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import useQueryDelete from '../../../../services/useQueryDelete'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import Loader from '../../../../components/common/Loader';
import useGetUserAuthentications  from '../../../../middleware/GetuserAuthencations';
import FiltertionHook from '../../../../hooks/FiltertionHook';
import { format } from 'date-fns';
const Establishments = () => {
  const [params , setParams] = useState({
    field: "",
    searTerm: "",
    startDate: "",
    endDate: "",
  })
const filters = [
  {
    value:"name",
    name:"إسم المنشاه"
  },
  {
    value:"kind",
    name:"نوع المنشاه"
  },
  {
    value:"levels.name",
    name:"مستوى المنشأه"
  },

]
  const { isError , isLoading , data} =  useQuerygetiteams("building" , "building" , params)
  const {deleteIteam} = useQueryDelete("building" , "building")
  const {isOwner, iscanAdd, iscanDelete, iscanPut} = useGetUserAuthentications ("building")

// colums tabel
  const columns = [
        {
            name:"الإسم",
            selector: (row) => <span className='text-wrap	'>{row.name}</span> ,

        },
        {
          name:"نوع المنشأه",
          selector: (row) => <span className='text-wrap	'>{row.kind}</span> ,

      },
        {
            name:"مستوى المنشأه",
            selector: (row) =>  <span className='text-wrap'>{row?.levels?.name}</span>
           

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
                {
                  isOwner || iscanPut ?   <Link to={`/update-Establishment/${row._id}`}  className="hover:text-primary">
                  <MdOutlineEditNote size={20}/>
                </Link>: null
                }
              {
                iscanDelete || isOwner ? <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
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
        
 
    <HeadPagestyle pageName="المنشأت" to={"/Add-Establishment"} isOwner={isOwner} title={"إضافة منشأة"} iscanAdd={iscanAdd} />
   {/* filltertion section */}
    <FiltertionHook  filters={filters} params={params} setParams={setParams}/>
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data?.data?.data}/>
    </div>
    
        </div>
  )
}

export default Establishments