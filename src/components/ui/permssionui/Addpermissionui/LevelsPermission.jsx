import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid'
const LevelsPermission = () => {
    const [permissions, setPermissions] = React.useState({
        viewAssets: false,
        editAssets: false,
        deleteAssets: false,
        createAssets: false,
      });
    
      const handlePermissionChange = (key) => {
        setPermissions((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
      };
    
      const permissionsData = [
        { key: "viewAssets", label: "عرض الهيكل الإدارى", value: permissions.viewAssets },
        { key: "editAssets", label: "تعديل الهيكل", value: permissions.editAssets },
        { key: "deleteAssets", label: "حذف هيكل", value: permissions.deleteAssets },
        { key: "createAssets", label: "إضافة هيكل", value: permissions.createAssets },
      ];
  return (
    <div className='w-full h-full shadow-lg'>
      
        <PermissionsGrid  sectionName = "الهيكل الإدارى" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default LevelsPermission