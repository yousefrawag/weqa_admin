import {
    Establishments , 
   
    AddnewEstbilshments ,
     UpdatedEstbilshment,
     Estbilshmentoverview,
     EstablishmentUsers,
     Adduser,
     Updateuser,
     Useroverview , 
     GetEsbilshAssets,
     GetEsbilshLocation
 
    } from "../pages/Dashboard/admin"
    import store from "../store/index"
    import  Checkuserautherzationview  from "../middleware/Checkuserautherzationview";
  export const EsbilshRoutes = [

      { path: "/Est-ablishments", element: <Establishments /> , loader:Checkuserautherzationview(store , "building" , "get")},
      { path: "/Add-Establishment", element: <AddnewEstbilshments /> , loader:Checkuserautherzationview(store , "building" , "post")},
      { path: "/update-Establishment/:id", element: <UpdatedEstbilshment />  , loader:Checkuserautherzationview(store , "building" , "put")},
      { path: "/Establishment-overView/:id/:level", element: <Estbilshmentoverview />  , loader:Checkuserautherzationview(store , "building" , "get")},

      // User routes within establishments
      { path: "/establishments/:id/users", element: <EstablishmentUsers /> , loader:Checkuserautherzationview(store , "building" , "get") },
     
      { path: "/establishments/:id/users/:userId/details", element:<Useroverview /> },
      { path: "/establishments-assets/:id", element:<GetEsbilshAssets />  , loader:Checkuserautherzationview(store , "building" , "get")},
      { path: "/establishments-location/:id", element:<GetEsbilshLocation />  , loader:Checkuserautherzationview(store , "building" , "get")}

    ];