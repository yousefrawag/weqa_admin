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
    const isOwner = user?.role === "owner";

    return { isOwner, iscanAdd, iscanDelete, iscanPut, iscanView };
};
export default useGetUserAuthentications 