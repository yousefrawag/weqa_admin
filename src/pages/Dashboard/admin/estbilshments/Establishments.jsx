import React from 'react'
import CustomeTabel from '../../../../components/common/CustomeTabel'
import { Link } from 'react-router-dom'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import useQueryDelete from '../../../../services/useQueryDelete'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import Loader from '../../../../components/common/Loader';
import { format } from 'date-fns';
const Establishments = () => {
  const { isError , isLoading , data} =  useQuerygetiteams("building" , "building")
  const {deleteIteam} = useQueryDelete("building" , "building")
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
            name:"عدد الموظفين",
            selector: (row) =>  40,

        },
 
        {
            name:"عدد المواقع",
            selector: (row) => row?.location?.length,

        },
        {
            name:"عدد الاصول",
            selector: (row) => 7,

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
                <Link to={`/update-Establishment/${row._id}`}  className="hover:text-primary">
                  <MdOutlineEditNote size={20}/>
                </Link>
                <button className="hover:text-primary" onClick={() => deleteIteam(row._id)}>
                  <AiTwotoneDelete size={20}/>
                </button>
              </div>
            )
       
        }
    ]
if(isLoading){
  return <Loader />
}
  return (
    <div>
        
 
    <HeadPagestyle pageName="المنشأت" to={"/Add-Establishment"} title={"إضافة منشأة"} />
    
    <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
    <CustomeTabel columns={columns} data={data?.data?.data}/>
    </div>
    
        </div>
  )
}

export default Establishments