import {

    Getpermissions,
    AddPermission ,
    UpdatePermissions
 
   } from "../pages/Dashboard/admin"
   import store from "../store/index"
import  Checkuserautherzationview  from "../middleware/Checkuserautherzationview";
 export const permissionsRoutes = [
  
     { path: "/permissions", element: <Getpermissions /> },
     { path: "/Add-permission", element: <AddPermission /> },
     { path: "/edit-permission/:id", element: <UpdatePermissions /> },
 
     
   ];