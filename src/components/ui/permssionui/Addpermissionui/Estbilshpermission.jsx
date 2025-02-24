import React, { useEffect } from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const Estbilshpermission = ({setBuildingPermissions , buildingPermissions}) => {
    const [permissions, setLocalPermissions] = React.useState({
        get: false,
        post: false,
        put: false,
        delete: false,
      });
    useEffect(() => {
      if(buildingPermissions?.actions){
        setLocalPermissions({
      get: buildingPermissions.actions.includes('get'),
    put: buildingPermissions.actions.includes('put'),
    delete: buildingPermissions.actions.includes('delete'),
    post: buildingPermissions.actions.includes('post'),
        })
      }
    }  , [buildingPermissions])
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
    
        setBuildingPermissions({
          actions
        
        });
      };
    
      const permissionsData = [
        { key: "post", label: "إضافة منشأه", value: permissions.post },
        { key: "get", label: "مشاهده بيانات المنشأت", value: permissions.get },
        { key: "put", label: "تعديل بيانات المنشات", value: permissions.put },
        { key: "delete", label: "حذف منشأت", value: permissions.delete },
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = "المنشأت" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default Estbilshpermission