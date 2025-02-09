import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid'
const LevelsPermission = ({setMainCategoryPermissions}) => {
    const [permissions, setLocalPermissions] = React.useState({
        get: false,
        put: false,
        delete: false,
        post: false,
      });
    
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
    
        setMainCategoryPermissions({
          actions
        
        });
      };
    
      const permissionsData = [
        { key: "get", label: "مشاهده الهيكل الإدارى", value: permissions.get },
        { key: "put", label: "تعديل الهيكل", value: permissions.put },
        { key: "delete", label: "حذف هيكل", value: permissions.delete },
        { key: "post", label: "إضافة هيكل", value: permissions.post },
      ];
  return (
    <div className='w-full h-full shadow-lg'>
      
        <PermissionsGrid  sectionName = "الهيكل الإدارى" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default LevelsPermission