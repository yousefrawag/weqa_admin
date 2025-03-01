import React from 'react';
import HeadPagestyle from '../../../../components/common/HeadPagestyle';
import LevelsPermission from '../../../../components/ui/permssionui/Addpermissionui/LevelsPermission';
import LocationPermission from '../../../../components/ui/permssionui/Addpermissionui/LocationPermission';
import Estbilshpermission from '../../../../components/ui/permssionui/Addpermissionui/Estbilshpermission';
import AssetsPermission from '../../../../components/ui/permssionui/Addpermissionui/AssetsPermission';
import UsersPermissions from '../../../../components/ui/permssionui/Addpermissionui/UsersPermissions';
import CategoryAssetPermission from '../../../../components/ui/permssionui/CategoryAssetPermission';
import Wrapbtn from '../../../../components/common/Wrapbtn';
import toast from 'react-hot-toast';
import useQueryadditeam from '../../../../services/Queryadditeam';
import { useNavigate } from 'react-router-dom';
import SupportPermissions from '../../../../components/ui/permssionui/Addpermissionui/SupportPermissions';
import Loader from '../../../../components/common/Loader';
const AddPermission = () => {
  const {addIteam , isLoading} = useQueryadditeam("permission" , "permission")
  const [permissionName, setPermissionName] = React.useState('');
  const navigate = useNavigate()
  const [assetsPermissions, setAssetsPermissions] = React.useState({
    actions: [],
    financial: { financial: false, reports: false },
    allowedIds: [],
  });
  const [mainCategoryPermissions, setMainCategoryPermissions] = React.useState({
    actions: [],
  });
  const [supportPermissions, setSupportPermissions] = React.useState({
    actions: [],
  });
  const [employeePermissions, setEmployeePermissions] = React.useState({
    actions: [],
  });
  const [buildingPermissions, setBuildingPermissions] = React.useState({
    actions: [],
  });
  const [locationPermissions, setLocationPermissions] = React.useState({
    actions: [],
  });
  const [mainCategoryAssetsPermissions, setMainCategoryAssetsPermissions] = React.useState({
    actions: [],
    allowedIds: ["679e6c73985ef8aaed0891f2"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const permissionData = {
     name:permissionName,
      assets: assetsPermissions,
      mainCategory: mainCategoryPermissions,
      employee: employeePermissions,
      location:locationPermissions,
      building: buildingPermissions,
      Support: supportPermissions ,
      mainCategoryAssets: mainCategoryAssetsPermissions,
    };
console.log(permissionData);

try {
  addIteam(
    permissionData,
   {
     onSuccess: () => {
       toast.success('تم إضافة صلاحيه جديده');
       navigate('/permissions');
     },
     onError:(error) => {
      console.log("erro from erro " , error);
      
     }
   }
 );
} catch (error) {

 toast.error('هناك خطأ في إضافة صلاحية');
}
  };
if(isLoading){
  return <Loader />
}
  return (
    <div className='w-full h-full'>
      <HeadPagestyle pageName="إضافة صلاحية" to="/permissions" title="عوده" />
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="name" className="w-full text-lg font-medium text-gray-700 dark:text-white">
         اسم الصلاحيه
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="إسم صلاحية"
            value={permissionName}
            onChange={(e) => setPermissionName(e.target.value)}
            className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
          />
        </div>
      
        <LevelsPermission mainCategoryPermissions={mainCategoryPermissions} setMainCategoryPermissions={setMainCategoryPermissions} />
        <Estbilshpermission  setBuildingPermissions={setBuildingPermissions}/>
        <LocationPermission  setLocationPermissions={setLocationPermissions} />
        <AssetsPermission setPermissions={setAssetsPermissions} setMainCategoryAssetsPermissions={setMainCategoryAssetsPermissions}/>
       <CategoryAssetPermission mainCategoryAssetsPermissions={mainCategoryAssetsPermissions} setMainCategoryAssetsPermissions={setMainCategoryAssetsPermissions} />
        <UsersPermissions setEmployeePermissions={setEmployeePermissions} />
        <SupportPermissions setSupportPermissions={setSupportPermissions} />
        <div className='mt-10'>
          <Wrapbtn to="/permissions" />
        
        </div>
      </form>
    </div>
  );
};

export default AddPermission;