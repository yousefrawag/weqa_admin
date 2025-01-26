import React from 'react'
import PermissionsGrid from '../../../../hooks/PermissionsGrid';
const Estbilshpermission = () => {
    const [permissions, setPermissions] = React.useState({
        viewBuilding: false,
        editBuilding: false,
        deleteBuilding: false,
        createBuilding: false,
      });
    
      const handlePermissionChange = (key) => {
        setPermissions((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
      };
    
      const permissionsData = [
        { key: "createBuilding", label: "إضافة منشأه", value: permissions.createBuilding },
        { key: "viewBuilding", label: "مشاهده بيانات المنشأت", value: permissions.viewBuilding },
        { key: "editBuilding", label: "تعديل بيانات المنشات", value: permissions.editBuilding },
        { key: "deleteBuilding", label: "حذف منشأت", value: permissions.deleteBuilding },
        
      ];
  return (
    <div className='w-full h-full shadow-lg'>
        <PermissionsGrid  sectionName = "المنشأت" permissions = {permissionsData} handlePermissionChange = {handlePermissionChange} />
    </div>
  )
}

export default Estbilshpermission