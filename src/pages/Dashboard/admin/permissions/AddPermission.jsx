import React from 'react'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import LevelsPermission from '../../../../components/ui/permssionui/Addpermissionui/LevelsPermission'
import LocationPermission from '../../../../components/ui/permssionui/Addpermissionui/LocationPermission'
import Estbilshpermission from '../../../../components/ui/permssionui/Addpermissionui/Estbilshpermission'
import AssetsPermission from '../../../../components/ui/permssionui/Addpermissionui/AssetsPermission'
import UsersPermissions from '../../../../components/ui/permssionui/Addpermissionui/UsersPermissions'

const AddPermission = () => {
  return (
    <div className='w-full h-full'>
        <HeadPagestyle  pageName="إضافة صلاحية" to="/permissions" title="عوده"/>
        <LevelsPermission />
        <Estbilshpermission />
        <LocationPermission />
        <AssetsPermission />
        <UsersPermissions />
    </div>
  )
}

export default AddPermission