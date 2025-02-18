import React from 'react';
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
import useQuerygetiteams from '../../../../services/Querygetiteams';
import { useEffect } from 'react';
import GetCategoreisAllowdid from '../../../../hooks/GetCategoreisAllowdid';
const AssetsPermission = ({ setPermissions , setMainCategoryAssetsPermissions , assetsPermissions }) => {


  const [permissions, setLocalPermissions] = React.useState({
    get: false,
    post: false,
    put: false,
    delete: false,
    financial: false,
    reports: false,
  });
  const [allowidCatgeories, setLocalPermissionsCategoriesallowd] = React.useState({
    get: false,
    post: false,
    put: false,
    delete: false,
  
  });
  const [allowedIds , setAllowdids] = React.useState([])

    useEffect(() => {
      if(assetsPermissions?.actions){
        setLocalPermissions({
     get: assetsPermissions.actions.includes('get'),
    put: assetsPermissions.actions.includes('put'),
    delete: assetsPermissions.actions.includes('delete'),
    post: assetsPermissions.actions.includes('post'),
    financial:assetsPermissions?.financial,
    reports:assetsPermissions?.reports
        })
      }
    }  , [assetsPermissions])

  const handlePermissionChange = (key) => {
    const newPermissions = {
      ...permissions,
      [key]: !permissions[key],
    };
    setLocalPermissions(newPermissions);

    const actions = [];
    if (newPermissions.get) actions.push('get');
    if (newPermissions.post) actions.push('post');
    if (newPermissions.put) actions.push('put');
    if (newPermissions.delete) actions.push('delete');

    setPermissions({
      actions,
      financial: { financial: newPermissions.financial, reports: newPermissions.reports },
      allowedIds: [], // You can add logic to handle allowedIds if needed
    });
  };

  const permissionsData = [
    { key: "post", label: "إضافة أصل", value: permissions.post },
    { key: "get", label: "عرض الإصول", value: permissions.get },
    { key: "put", label: "تعديل الإصل", value: permissions.put },
    { key: "delete", label: "حذف أصل", value: permissions.delete },
    { key: "financial", label: "رؤيه بيانات ماليه", value: permissions.financial },
    { key: "reports", label: "تقارير تشغيلية", value: permissions.reports },
  ];

  return (
    <div className='w-full h-full shadow-lg'>
   

  
      <PermissionsGrid sectionName="الإصول" permissions={permissionsData} handlePermissionChange={handlePermissionChange} />

   
    </div>
  );
};

export default AssetsPermission;