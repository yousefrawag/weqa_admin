import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const AssetsPermission = () => {
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
        { key: "createLocation", label: "إضافة أصل", value: permissions.createAssets },
        { key: "viewLocation", label: "عرض الإصول", value: permissions.viewAssets },
        { key: "editLocation", label: "تعديل الإصل", value: permissions.editAssets },
        { key: "deleteLocation", label: "حذف أصل", value: permissions.deleteAssets },
        { key: "deleteLocation", label: "إضافة فئه أصل جديده", value: permissions.deleteAssets },
        { key: "deleteLocation", label: "تعديل فئة أصل", value: permissions.deleteAssets },
        { key: "deleteLocation", label: "حذف فئة أصل", value: permissions.deleteAssets },
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = " الإصول" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default AssetsPermission