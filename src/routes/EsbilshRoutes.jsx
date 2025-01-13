import {
    Establishments , 
   
    AddnewEstbilshments ,
     UpdatedEstbilshment,
     Estbilshmentoverview,
     EstablishmentUsers,
     Adduser,
     Updateuser,
     Useroverview
 
    } from "../pages/Dashboard/admin"
  export const EsbilshRoutes = [

      { path: "/Est-ablishments", element: <Establishments /> },
      { path: "/Add-Establishment", element: <AddnewEstbilshments />},
      { path: "/update-Establishment/:id", element: <UpdatedEstbilshment /> },
      { path: "/Establishment-overView/:id", element: <Estbilshmentoverview /> },

      // User routes within establishments
      { path: "/establishments/:id/users", element: <EstablishmentUsers /> },
      { path: "/establishments/:id/users/add", element: <Adduser /> },
      { path: "/establishments/:id/users/edit/:userId", element: <Updateuser /> },
      { path: "/establishments/:id/users/:userId/details", element:<Useroverview /> }

    ];