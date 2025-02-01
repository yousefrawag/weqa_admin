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
        { key: "createLocation8", label: "إضافة أصل", value: permissions.createAssets },
        { key: "viewLocation7", label: "عرض الإصول", value: permissions.viewAssets },
        { key: "editLocation6", label: "تعديل الإصل", value: permissions.editAssets },
        { key: "deleteLocation2", label: "حذف أصل", value: permissions.deleteAssets },
        { key: "deleteLocation3", label: "إضافة فئه أصل جديده", value: permissions.deleteAssets },
        { key: "deleteLocation4", label: "تعديل فئة أصل", value: permissions.deleteAssets },
        { key: "deleteLocation5", label: "حذف فئة أصل", value: permissions.deleteAssets },
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
      <div className='w-full p-4 flex gap-5'>
        <button className=''>لجميع الفئات</button>
        <button>فئه معينه</button>
      </div>
        <PermissionsGrid  sectionName = " الإصول" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default AssetsPermission