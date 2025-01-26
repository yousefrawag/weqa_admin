const PermissionsGrid = ({ sectionName, permissions, handlePermissionChange }) => {
    return (
      <div className="mt-10 border border-gray-300 rounded-lg bg-white dark:bg-transparent">
        <h3 className="font-bold text-lg mb-4 w-full border-b-[1px] p-5">{sectionName}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-7 p-5 ">
          {permissions.map((permission) => (
            <label
              key={permission.key}
              className="flex items-center gap-2 cursor-pointer shadow-md p-4 dark:border-form-strokedark dark:bg-form-input rounded-[5px]"
            >
              <input
                type="checkbox"
                checked={permission.value}
                onChange={() => handlePermissionChange(permission.key)}
                className="form-checkbox"
              />
              {permission.label}
            </label>
          ))}
        </div>
      </div>
    );
  };
export default PermissionsGrid  