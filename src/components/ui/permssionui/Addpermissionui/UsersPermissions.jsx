import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const UsersPermissions = ({setEmployeePermissions}) => {
    const [permissions, setLocalPermissions] = React.useState({
        get: false,
        post: false,
        delete: false,
        put: false,
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
    
        setEmployeePermissions({
          actions
        
        });
      };
    
      const permissionsData = [
        { key: "post", label: "إضافة مستخدم", value: permissions.createAssets },
        { key: "get", label: "عرض بيانات المستخدم", value: permissions.viewAssets },
        { key: "put", label: "تعديل بيانات المستخدم", value: permissions.editAssets },
        { key: "delete", label: "حذف مستخدم", value: permissions.deleteAssets },
        
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = " المستخدمين" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default UsersPermissions