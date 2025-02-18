import React from 'react'
import { useEffect } from 'react';
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const LocationPermission = ({setLocationPermissions , locationPermissions}) => {
    const [permissions, setLocalPermissions] = React.useState({
        get: false,
        post: false,
        put: false,
        delete: false,
      });
       useEffect(() => {
    if(locationPermissions?.actions){
      setLocalPermissions({
        get: locationPermissions.actions.includes('get'),
        put: locationPermissions.actions.includes('put'),
        delete: locationPermissions.actions.includes('delete'),
        post: locationPermissions.actions.includes('post'),
      });
    }
       } , [locationPermissions]) 
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
    
        setLocationPermissions({
          actions
        
        });
      };
    
      const permissionsData = [
        { key: "post", label: "إضافة موقع", value: permissions.createAssets },
        { key: "get", label: "مشاهده المواقع", value: permissions.viewAssets },
        { key: "put", label: "تعديل المواقع", value: permissions.editAssets },
        { key: "delete", label: "حذف موقع", value: permissions.deleteAssets },
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = " المواقع" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default LocationPermission