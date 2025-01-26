import {

 
    Profile
 
   } from "../pages"
   import DashboardProvider from "../context/DashboardProviedr";
 export const UserRoutes = [
  
  { path: "/profile", element:<DashboardProvider>< Profile /> </DashboardProvider> },
  
  
     
   ];