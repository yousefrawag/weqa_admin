import { useSelector } from "react-redux";
const useGetUserAuthentications  = ( permissionmodule ) => {
    const user = useSelector((state) => state.userState.userinfo) || {};
    const permissions = user.permissions || {};
    const modulePermissions = permissions[permissionmodule] || { actions: [] };

 
    console.log("Module Permissions:", modulePermissions);

    const iscanAdd = modulePermissions?.actions?.some((per) => per === "post");
    const iscanView = modulePermissions?.actions?.some((per) => per === "get");
    const iscanPut = modulePermissions?.actions?.some((per) => per === "put");
    const iscanDelete = modulePermissions?.actions?.some((per) => per === "delete");
    const canviewtAssetFinancial = modulePermissions?.actions?.some((per)  => per === "canviewtFinancial")
    const canEditFinancial = modulePermissions?.actions?.some((per)  => per === "canEditFinancial")
    const isOwner = user?.role === "owner";

    return { isOwner, iscanAdd, iscanDelete, iscanPut, iscanView  , canviewtAssetFinancial , canEditFinancial};
};
export default useGetUserAuthentications 