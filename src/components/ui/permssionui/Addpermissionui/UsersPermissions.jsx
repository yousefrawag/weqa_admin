import React, { useEffect } from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const UsersPermissions = ({setEmployeePermissions , employeePermissions}) => {
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
    useEffect(() => {
      if(employeePermissions?.actions){
        setLocalPermissions({
          get: employeePermissions.actions.includes('get'),
          put: employeePermissions.actions.includes('put'),
          delete: employeePermissions.actions.includes('delete'),
          post: employeePermissions.actions.includes('post'),
        });
      }
    } , [employeePermissions])
      const permissionsData = [
        { key: "post", label: "إضافة مستخدم", value: permissions.post },
        { key: "get", label: "عرض بيانات المستخدم", value: permissions.get },
        { key: "put", label: "تعديل بيانات المستخدم", value: permissions.put },
        { key: "delete", label: "حذف مستخدم", value: permissions.delete },
        
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = " المستخدمين" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default UsersPermissions