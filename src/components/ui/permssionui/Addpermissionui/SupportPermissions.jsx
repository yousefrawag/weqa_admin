import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const SupportPermissions = ({setSupportPermissions}) => {
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
    
        setSupportPermissions({
          actions
        
        });
      };
    
      const permissionsData = [
        { key: "get", label: "مشاهده تذاكر الدعم الفنى", value: permissions.get },
        { key: "put", label: "متابعه التذكره ", value: permissions.put },
        { key: "delete", label: "حذف تذكره", value: permissions.delete },
        { key: "post", label: "إضافة تذكره", value: permissions.post },
      ];
  return (
    <div className='w-full h-full shadow-lg'>
      
        <PermissionsGrid  sectionName = "الدعم الفنى" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default SupportPermissions