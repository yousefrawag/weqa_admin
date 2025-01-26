import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const UsersPermissions = () => {
    const [permissions, setPermissions] = React.useState({
        viewLocation: false,
        editLocation: false,
        deleteLocation: false,
        createLocation: false,
      });
    
      const handlePermissionChange = (key) => {
        setPermissions((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
      };
    
      const permissionsData = [
        { key: "createLocation", label: "إضافة مستخدم", value: permissions.createAssets },
        { key: "viewLocation", label: "عرض بيانات المستخدم", value: permissions.viewAssets },
        { key: "editLocation", label: "تعديل بيانات المستخدم", value: permissions.editAssets },
        { key: "deleteLocation", label: "حذف مستخدم", value: permissions.deleteAssets },
        
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = " المستخدمين" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default UsersPermissions