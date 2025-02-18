import React from 'react'
import GetCategoreisAllowdid from '../../../hooks/GetCategoreisAllowdid'
import PermissionsGrid from '../../../hooks/PermissionsGrid'
import { useEffect } from 'react'
const CategoryAssetPermission = ({setMainCategoryAssetsPermissions ,     mainCategoryPermissions}) => {
    const filterTypes  = [{key:"assets" , name:"فئات الإصول"} , {key:"all-level" , name:"مشاهده فئه محدده"}]
    const [SelectedType , setSelectedType] = React.useState("assets")
    const [permissions, setLocalPermissions] = React.useState({
      get: false,
      post: false,
      put: false,
      delete: false,
    
    });

    const [allowedIds , setAllowdids] = React.useState([])
  
      useEffect(() => {
        if(mainCategoryPermissions?.actions){
          setLocalPermissions({
       get: mainCategoryPermissions.actions.includes('get'),
      put: mainCategoryPermissions.actions.includes('put'),
      delete: mainCategoryPermissions.actions.includes('delete'),
      post: mainCategoryPermissions.actions.includes('post'),

          })
        }
      }  , [mainCategoryPermissions])
  
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
    
        setMainCategoryAssetsPermissions({
          actions ,
          allowedIds
        
        });
      };
      
  
    const permissionsData = [
      { key: "post", label: "إضافة فئة", value: permissions.post },
      { key: "get", label: "مشاهده الفئات", value: permissions.get },
      { key: "put", label: "تعديل فئة", value: permissions.put },
      { key: "delete", label: "حذف فئة", value: permissions.delete },
     
    ];
    const handelAllowedid = (id) => {
        setAllowdids((prev) => {
          const updatedIds = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      
          setMainCategoryAssetsPermissions({
          ...mainCategoryPermissions ,
            allowedIds: updatedIds,
          });
      
          return updatedIds;
        });
      };
      
    return (
      <div className='w-full h-full shadow-lg'>
        <div className='w-full p-4 flex gap-5'>
        {
            filterTypes?.map((item) => {
              return <button   
              type='button'
              onClick={() => setSelectedType(item.key)}                     
               className={`block text-white  ${SelectedType === item.key ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
              key={item.key} value={item.key}>{item.name}</button>
            })
          }
        </div>
        {
          SelectedType === "all-level" ? 
          <div className='w-full h-full overflow-y-auto max-h-[300px]'>
             <label
          
            className="flex items-center gap-2 cursor-pointer shadow-md p-4 dark:border-form-strokedark dark:bg-form-input rounded-[5px]"
          >
            <input
              type="checkbox"
             value={"all"}
             
              className="form-checkbox"
            />
            <span className='w-full flex gap-3 items-center'>
           الجميع
            </span>
           
          </label>
  <GetCategoreisAllowdid handelAllowedid={handelAllowedid} allowedIds={allowedIds} fetchKey="mainCategoryAssets" sectionName="فئه رئيسيه" />
  <GetCategoreisAllowdid  handelAllowedid={handelAllowedid} allowedIds={allowedIds} fetchKey="categoryAssets" sectionName="فئه فرعيه ثانية" />
  <GetCategoreisAllowdid  handelAllowedid={handelAllowedid} allowedIds={allowedIds} fetchKey="subCategoryAssets" sectionName="فئه فرعية ثالثة" />
  <GetCategoreisAllowdid  handelAllowedid={handelAllowedid} allowedIds={allowedIds} fetchKey="nestSubCategoryAssets" sectionName="فئه فرعية رابعة" />
          </div> :
        <PermissionsGrid sectionName="فئات الإصول" permissions={permissionsData} handlePermissionChange={handlePermissionChange} />
  
        }
        
      </div>
    );
}

export default CategoryAssetPermission