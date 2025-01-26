import React from 'react';
import { format } from 'date-fns';
const AssetOverviewui = ({ CurrentAsset }) => {
  const data = CurrentAsset?.data
  const locationDetails = CurrentAsset?.locationDetails;

  const formatDate = (date) => {
    if (!date) return 'غير متوفر';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'تاريخ غير صالح'; // Invalid date fallback
    return format(parsedDate, 'dd/MM/yyyy');
  };
  
  console.log('CurrentAsset:', CurrentAsset);
console.log('LocationDetails:', CurrentAsset?.locationDetails);

  return (
    <div className="w-full h-full grid grid-cols-1 gap-2 xl:grid-cols-2	 shadow-md p-5	">
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          إسم الإصل
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.assetsName}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          فئة الإصل
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.subCategoryAssets[0]?.name || "غير متوفر"}
        </p>
      </div>

      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          المنشأه
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.location[0]?.building?.name}
        </p>
      </div>

      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          الموقع
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {locationDetails[0]?.locationName}
        </p>
      </div>
     <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          الدور
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {locationDetails[0]?.floorName || "غير محدد"}
        </p>
      </div>


      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          المنطقة
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {locationDetails[0]?.areaName || "غير محدد"}
        </p>
      </div> 
     <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          القسم
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {locationDetails[0]?.sectionName || "غير محدد"}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          الغرفة
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {locationDetails[0]?.roomName || "غير محدد"}
        </p>
      </div> 
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          عدد
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.count}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          رقم الإصل
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.assetsNumber}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          المورد
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.supplier}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          الشركة المصنعة
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.manufacturingCompany}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          القيمة المالية
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.financialValue}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          تاريخ الشراء{' '}
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {  formatDate(data?.purchaseDate)}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          تاريخ الصيانة الإخيره
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          { formatDate(data?.lastMaintenanceDate)}
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          تاريخ الصيانة القادمة
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {formatDate(data?.nextMaintenanceDate) }
        </p>
      </div>
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          حالة الإصل
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.kind}
        </p>
      </div>
   
      <div className="mb-6 flex flex-col  gap-2">
        <span
          htmlFor="name"
          className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
          ملحظات
        </span>
        <p className=" dark:border-form-strokedark dark:bg-form-input  text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
          {data?.notes}
        </p>
      </div>
    </div>
  );
};

export default AssetOverviewui;
