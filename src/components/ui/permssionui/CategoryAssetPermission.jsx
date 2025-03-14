import React, { useEffect } from 'react';
import GetCategoreisAllowdid from '../../../hooks/GetCategoreisAllowdid';
import PermissionsGrid from '../../../hooks/PermissionsGrid';

const CategoryAssetPermission = ({ setMainCategoryAssetsPermissions, mainCategoryAssetsPermissions }) => {
  const filterTypes = [
    { key: "assets", name: "فئات الإصول" },
    { key: "all-level", name: "مشاهده فئه محدده" },
  ];

  const [SelectedType, setSelectedType] = React.useState("assets");
  const [permissions, setLocalPermissions] = React.useState({
    get: false,
    post: false,
    put: false,
    delete: false,
  });

  const [allowedIds, setAllowdids] = React.useState([]);

  useEffect(() => {
    if (mainCategoryAssetsPermissions?.actions && mainCategoryAssetsPermissions?.allowedIds) {
      setLocalPermissions({
        get: mainCategoryAssetsPermissions.actions.includes('get'),
        post: mainCategoryAssetsPermissions.actions.includes('post'),
        put: mainCategoryAssetsPermissions.actions.includes('put'),
        delete: mainCategoryAssetsPermissions.actions.includes('delete'),
      });
      setAllowdids([...mainCategoryAssetsPermissions.allowedIds]);
    }
  }, [mainCategoryAssetsPermissions]);

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

    setMainCategoryAssetsPermissions((prev) => ({
      ...prev,
      actions,
    }));
  };

  const permissionsData = [
    { key: "post", label: "إضافة فئة", value: permissions.post },
    { key: "get", label: "مشاهده الفئات", value: permissions.get },
    { key: "put", label: "تعديل فئة", value: permissions.put },
    { key: "delete", label: "حذف فئة", value: permissions.delete },
  ];

  const handelAllowedid = (id) => {
    setAllowdids((prev) => {
      let updatedIds;

      if (id === "all") {
        // Toggle "all" selection
        updatedIds = prev.includes("all") ? [] : ["all"];
      } else {
        // Toggle individual selection
        updatedIds = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];

        // If "all" was selected and an individual item is selected, deselect "all"
        if (prev.includes("all") && !updatedIds.includes("all")) {
          updatedIds = updatedIds.filter((item) => item !== "all");
        }
      }

      // Update the main permissions state
      setMainCategoryAssetsPermissions((prev) => ({
        ...prev,
        allowedIds: updatedIds,
      }));

      return updatedIds;
    });
  };

  return (
    <div className='w-full h-full shadow-lg'>
      <div className='w-full p-4 flex gap-5'>
        {filterTypes.map((item) => (
          <button
            type='button'
            onClick={() => setSelectedType(item.key)}
            className={`block text-white ${SelectedType === item.key ? "bg-main2" : "bg-main"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800`}
            key={item.key}
          >
            {item.name}
          </button>
        ))}
      </div>

      {SelectedType === "all-level" ? (
        <div className='w-full h-full overflow-y-auto max-h-[300px]'>
          <label className="flex items-center gap-2 cursor-pointer shadow-md p-4 dark:border-form-strokedark dark:bg-form-input rounded-[5px]">
            <input
              type="checkbox"
              checked={allowedIds.includes("all")}
              onChange={() => handelAllowedid("all")}
              className="form-checkbox"
            />
            <span className='w-full flex gap-3 items-center'>الجميع</span>
          </label>
          <GetCategoreisAllowdid handelAllowedid={handelAllowedid} allowedIds={allowedIds} fetchKey="mainCategoryAssets" sectionName="فئه رئيسيه" />
        </div>
      ) : (
        <PermissionsGrid sectionName="فئات الإصول" permissions={permissionsData} handlePermissionChange={handlePermissionChange} />
      )}
    </div>
  );
};

export default CategoryAssetPermission;