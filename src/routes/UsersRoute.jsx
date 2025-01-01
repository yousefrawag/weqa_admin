import {

     Getusers,
     AddNewuser ,
     UserOverview , 
  
    } from "../pages/Dashboard/admin"
  export const UsersRoute = [
   
      { path: "/All-users", element: <Getusers /> },
      { path: "/Add-user", element: <AddNewuser /> },
      { path: "/user-overview/:id", element: <UserOverview /> },
      
    ];