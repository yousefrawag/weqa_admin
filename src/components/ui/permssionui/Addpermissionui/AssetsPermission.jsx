import React from 'react';
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
import useQuerygetiteams from '../../../../services/Querygetiteams';
import { useEffect } from 'react';
import GetCategoreisAllowdid from '../../../../hooks/GetCategoreisAllowdid';
const AssetsPermission = ({ setPermissions  , assetsPermissions }) => {


  const [permissions, setLocalPermissions] = React.useState({
    get: false,
    post: false,
    put: false,
    delete: false,
    canviewtFinancial: false,
    canEditFinancial: false,
    fllowAssetsRequest:false ,
    Canviewclanderassets:false
  });



    useEffect(() => {
      if(assetsPermissions?.actions){
        setLocalPermissions({
     get: assetsPermissions.actions.includes('get'),
    put: assetsPermissions.actions.includes('put'),
    delete: assetsPermissions.actions.includes('delete'),
    post: assetsPermissions.actions.includes('post'),
    canviewtFinancial:assetsPermissions?.actions.includes('canviewtFinancial'),
    canEditFinancial:assetsPermissions?.actions.includes('canEditFinancial'),
    fllowAssetsRequest:assetsPermissions?.actions.includes('fllowAssetsRequest'),
    Canviewclanderassets:assetsPermissions?.actions.includes('Canviewclanderassets')
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
    if (newPermissions.canviewtFinancial) actions.push('canviewtFinancial');
    if (newPermissions.canEditFinancial) actions.push('canEditFinancial');
    if (newPermissions.fllowAssetsRequest) actions.push('fllowAssetsRequest');
    if (newPermissions.Canviewclanderassets) actions.push('Canviewclanderassets')

    setPermissions({
      actions,
   
      allowedIds: [], // You can add logic to handle allowedIds if needed
    });
  };

  const permissionsData = [
    { key: "post", label: "إضافة أصل", value: permissions.post },
    { key: "get", label: "مشاهده الإصول", value: permissions.get },
    { key: "put", label: "تعديل الإصل", value: permissions.put },
    { key: "delete", label: "حذف أصل", value: permissions.delete },
    { key: "canviewtFinancial", label: "رؤيه بيانات ماليه", value: permissions.canviewtFinancial },
    { key: "canEditFinancial", label: "تعديل البيانات المالية", value: permissions.canEditFinancial },
    { key: "fllowAssetsRequest", label: "متابعة طلبات الإصول", value: permissions.fllowAssetsRequest },
    { key: "Canviewclanderassets", label: "متابعة تقويم الإصول", value: permissions.fllowAssetsRequest },
  ];

  return (
    <div className='w-full h-full shadow-lg'>
   

  
      <PermissionsGrid sectionName="الإصول" permissions={permissionsData} handlePermissionChange={handlePermissionChange} />

   
    </div>
  );
};

export default AssetsPermission;