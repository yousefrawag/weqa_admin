import {

     Getusers,
     AddNewuser ,
     UserOverview , 
     Updateuser ,
     UsersRequets
  
    } from "../pages/Dashboard/admin"
  export const UsersRoute = [
   
      { path: "/All-users", element: <Getusers /> },
      { path: "/all-edit-requests", element: <UsersRequets /> },
      { path: "/Add-user", element: <AddNewuser /> },
      { path: "/user-overview/:id", element: <UserOverview /> },
      { path: "/update-user/:id", element: <Updateuser /> },
      
    ];