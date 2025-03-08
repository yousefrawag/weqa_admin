import {

     Getusers,
     AddNewuser ,
     UserOverview , 
     Updateuser ,
     UsersRequets
  
    } from "../pages/Dashboard/admin"
    import store from "../store/index"
    import  Checkuserautherzationview  from "../middleware/Checkuserautherzationview";
  export const UsersRoute = [
   
      { path: "/All-users", element: <Getusers /> ,  loader:Checkuserautherzationview(store , "employee" , "get")},
      { path: "/all-edit-requests", element: <UsersRequets />,  loader:Checkuserautherzationview(store , "employee" , "followemployeerequest") },
      { path: "/Add-user", element: <AddNewuser /> ,  loader:Checkuserautherzationview(store , "employee" , "post") },
      { path: "/user-overview/:id", element: <UserOverview />  ,  loader:Checkuserautherzationview(store , "employee" , "get")},
      { path: "/update-user/:id", element: <Updateuser />  ,  loader:Checkuserautherzationview(store , "employee" , "post")},
      
    ];