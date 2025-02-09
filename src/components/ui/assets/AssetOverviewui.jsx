import React, { useState } from 'react';
import { format } from 'date-fns';
import {inputFields} from '../../../data/index';
import FilesCard from './FilesCard';
const AssetOverviewui = ({ CurrentAsset }) => {
  const data = CurrentAsset?.data;
  const locationDetails = CurrentAsset?.locationDetails;

  const formatDate = (date) => {
    if (!date) return 'غير متوفر';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'تاريخ غير صالح'; // Invalid date fallback
    return format(parsedDate, 'dd/MM/yyyy');
  };

  console.log('CurrentAsset:', CurrentAsset);
  console.log('LocationDetails:', CurrentAsset?.locationDetails);

  // Define filter categories
  const AssetDataType = [
    { name: "بيانات أساسيه", key: "genarlildata" },
    { name: "بيانات مالية", key: "finnincedata" },
    { name: "بيانات تشغيلية", key: "genarlildataWorks" },
    {name:"مرفقات" , key:"files"}
  ];

  const [SelectedType, setSelectedType] = useState("genarlildata");
const filltergnerailData = inputFields.filter((item) => item.category === "genarlildata").map((input) =>( {
label:input.name,
value:data?.[input.key] || "غير متوفر"
}))
const fillterfinnincedatalData = inputFields.filter((item) => item.category === "finnincedata").map((input) =>( {
  label:input.name,
  value:data?.[input.key] || "غير متوفر"
  }))
  const filltergenarlildataWorksData = inputFields.filter((item) => item.category === "genarlildataWorks").map((input) =>( {
    label:input.name,
    value:data?.[input.key] || "غير متوفر"
    }))
  // Filtered data based on selected tab
  const filteredData = {
    genarlildata: [
      { label: "إسم الإصل", value: data?.assetsName },
      { label: "فئة الإصل", value: data?.subCategoryAssets[0]?.name || "غير متوفر" },
      { label: "المنشأه", value: data?.location[0]?.building?.name },
      { label: "الموقع", value: locationDetails[0]?.locationName },
      { label: "الدور", value: locationDetails[0]?.floorName || "غير محدد" },
      { label: "المنطقة", value: locationDetails[0]?.areaName || "غير محدد" },
      { label: "القسم", value: locationDetails[0]?.sectionName || "غير محدد" },
      { label: "الغرفة", value: locationDetails[0]?.roomName || "غير محدد" },
    ...filltergnerailData,
    ].filter((item) => item.value !== "غير متوفر"),
    finnincedata: [
      { label: "المورد", value: data?.supplier },
      { label: "الشركة المصنعة", value: data?.manufacturingCompany },
      { label: "القيمة المالية", value: data?.financialValue },
      { label: "تاريخ الشراء", value: formatDate(data?.purchaseDate) },
      ...fillterfinnincedatalData,
    ].filter((item) => item.value !== "غير متوفر"),
    genarlildataWorks: [
      { label: "تاريخ الصيانة الإخيره", value: formatDate(data?.lastMaintenanceDate) },
      { label: "تاريخ الصيانة القادمة", value: formatDate(data?.nextMaintenanceDate) },
      { label: "حالة الإصل", value: data?.kind },
      { label: "ملاحظات", value: data?.notes },
      ...filltergenarlildataWorksData
    ].filter((item) => item.value !== "غير متوفر"),
  };

  return (
    <div>
      {/* Tabs for filtering */}
      <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {AssetDataType?.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedType(item.key)}
            className={`block text-white ${SelectedType === item.key ? "bg-main2" : "bg-main"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Display filtered data */}
      <div className="w-full h-full grid grid-cols-1 gap-2 xl:grid-cols-2 shadow-md p-5">
        {filteredData[SelectedType]?.map((item, index) => (
          <div key={index} className="mb-6 flex flex-col gap-2">
            <span className="w-full text-lg font-medium text-gray-700 dark:text-white">
              {item.label}
            </span>
            <p className="dark:border-form-strokedark dark:bg-form-input text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
              {item.value || "غير متوفر"}
            </p>
          </div>
        ))}
      </div>
      {
        SelectedType === "files" && <FilesCard  CurrentAsset={CurrentAsset}/>
      }
    </div>
  );
};

export default AssetOverviewui;