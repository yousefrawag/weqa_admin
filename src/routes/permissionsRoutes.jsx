import {

    Getpermissions,
    AddPermission ,
    UpdatePermissions
 
   } from "../pages/Dashboard/admin"
 export const permissionsRoutes = [
  
     { path: "/permissions", element: <Getpermissions /> },
     { path: "/Add-permission", element: <AddPermission /> },
     { path: "/edit-permission/:id", element: <UpdatePermissions /> },
 
     
   ];