import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const LocationPermission = () => {
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
        { key: "createLocation", label: "إضافة موقع", value: permissions.createAssets },
        { key: "viewLocation", label: "عرض المواقع", value: permissions.viewAssets },
        { key: "editLocation", label: "تعديل المواقع", value: permissions.editAssets },
        { key: "deleteLocation", label: "حذف موقع", value: permissions.deleteAssets },
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = " المواقع" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default LocationPermission