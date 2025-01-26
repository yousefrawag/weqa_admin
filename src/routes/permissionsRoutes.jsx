import {

    Getpermissions,
    AddPermission
 
   } from "../pages/Dashboard/admin"
 export const permissionsRoutes = [
  
     { path: "/permissions", element: <Getpermissions /> },
     { path: "/Add-permission", element: <AddPermission /> },
 
     
   ];