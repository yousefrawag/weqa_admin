import React, { useState, useMemo } from 'react';
import CustomeTabel from '../../../../components/common/CustomeTabel';
import { Link } from 'react-router-dom';
import useQuerygetiteams from '../../../../services/Querygetiteams';
import { GrFormView } from "react-icons/gr";
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineEditNote } from 'react-icons/md';
import useQueryDelete from '../../../../services/useQueryDelete';
import HeadPagestyle from '../../../../components/common/HeadPagestyle';
import Loader from '../../../../components/common/Loader';
import useGetUserAuthentications from '../../../../middleware/GetuserAuthencations';
import FiltertionHook from '../../../../hooks/FiltertionHook';
import { format } from 'date-fns';

const Establishments = () => {
  const { isError, isLoading, data } = useQuerygetiteams("statistics/building", "statistics/building");

  const { isOwner, iscanAdd, iscanDelete, iscanPut } = useGetUserAuthentications("building");

  // FILTERION SECTION
  const [params, setParams] = useState({
    field: "",
    searchTerm: "",
    startDate: "",
    endDate: "",
  });

  const filters = [
    { value: "name", name: "إسم المنشأه" },
    { value: "kind", name: "نوع المنشأه" },
    { value: "levels.name", name: "مستوى المنشأه" },
  ];

  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    return data?.data?.data.filter(item => {
      if (params.searchTerm && params.field) {
        const fieldValue = params.field.split('.').reduce((obj, key) => obj?.[key], item);
        return fieldValue?.toLowerCase().includes(params.searchTerm.toLowerCase());
      }
      return true;
    });
  }, [data, params]);

  // Columns for table rendering
  const columns = [
    { name: "الإسم", selector: (row) => <span className='text-wrap'>{row.name}</span> },
    { name: "الهيكل", selector: (row) => <span className='text-wrap'>{row.level}</span> },
    { name: "المنشأه تابعة الى", selector: (row) => <span className='text-wrap'>{row?.level === row?.name  ? <span  className='text-red-500'>هيكل أساسى </span>: row?.parent}</span> },
    { name: "تاريخ الانشاء", cell: (row) => row?.createdAt && <div>{format(new Date(row?.createdAt), "dd MMMM, yyyy")}</div> },
    {
      name: "إجراء",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-3.5">
          <Link to={`/Establishment-overView/${row.id}/${row.levelsmodule}`} className="hover:text-primary">
            <GrFormView size={20} />
          </Link>
       
     
        </div>
      ),
    },
  ];

  // Columns for exporting to Excel
  const exportColumns = [
    { name: "الإسم", value: "name" },
    { name: "نوع المنشأه", value: "kind" },
    { name: "مستوى المنشأه", value: "levels.name" },
    { name: "تاريخ الانشاء", selector: (row) => format(new Date(row.createdAt), "dd MMMM, yyyy") },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <HeadPagestyle pageName="المنشأت" to={"/Add-Establishment"} isOwner={isOwner} title={"إضافة منشأة"} iscanAdd={iscanAdd} />
      {/* Filter section */}
      <FiltertionHook filteredData={filteredData} columns={exportColumns} filters={filters} params={params} setParams={setParams} />
      <div className='shadow-[#EFEEF4] w-full h-full rounded-md'>
        <CustomeTabel columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default Establishments;