import {

    AssetsSection,
    AddNewuser ,
    UserOverview ,
    AssetsLevels
 
   } from "../pages/Dashboard/admin"
 export const AssetsRoutes = [
  
     { path: "/Assets-sections", element: <AssetsSection /> },
     { path: "/Assets-levels", element: <AssetsLevels /> },
     { path: "/Add-asset", element: <AddNewuser /> },
     { path: "/Asset-overview/:id", element: <UserOverview /> },
     
   ];