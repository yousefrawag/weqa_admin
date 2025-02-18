import {

 
    Profile ,
 
   } from "../pages"
  import UserChangePassword from "../pages/Authentication/UserChangePassword";
   import DashboardProvider from "../context/DashboardProviedr";
 export const UserRoutes = [
  
  { path: "/profile", element:<DashboardProvider>< Profile /> </DashboardProvider> },
  { path: "/auth/changepassword-user", element:< UserChangePassword />  },
  
  
     
   ];