import React, { useEffect } from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const SupportPermissions = ({setSupportPermissions , supportPermissions}) => {
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
    useEffect(() => {
      if(supportPermissions?.actions){
        setLocalPermissions({
          get: supportPermissions.actions.includes('get'),
          put: supportPermissions.actions.includes('put'),
          delete: supportPermissions.actions.includes('delete'),
          post: supportPermissions.actions.includes('post'),
        });
      }
    } , [supportPermissions])
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