import React from 'react'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import LevelsPermission from '../../../../components/ui/permssionui/Addpermissionui/LevelsPermission'
import LocationPermission from '../../../../components/ui/permssionui/Addpermissionui/LocationPermission'
import Estbilshpermission from '../../../../components/ui/permssionui/Addpermissionui/Estbilshpermission'
import AssetsPermission from '../../../../components/ui/permssionui/Addpermissionui/AssetsPermission'
import UsersPermissions from '../../../../components/ui/permssionui/Addpermissionui/UsersPermissions'
import Wrapbtn from '../../../../components/common/Wrapbtn'

const AddPermission = () => {
  return (
    <div className='w-full h-full'>
        <HeadPagestyle  pageName="إضافة صلاحية" to="/permissions" title="عوده"/>
        <form>
        <div className="mb-6 flex flex-col  gap-2">
              <label
                htmlFor="name"
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
              >
                إسم صلاحية
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="إسم صلاحية "
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
              />
            
            </div>
        <LevelsPermission />
        <Estbilshpermission />
        <LocationPermission />
        <AssetsPermission />
        <UsersPermissions />
        <div className='mt-10'>
        <Wrapbtn  to="/"/>
        </div>
        </form>
    </div>
  )
}

export default AddPermission