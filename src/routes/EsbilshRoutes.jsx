import {
    Establishments , 
   
    AddnewEstbilshments ,
     UpdatedEstbilshment,
     Estbilshmentoverview,
 
    } from "../pages/Dashboard/admin"
  export const EsbilshRoutes = [

      { path: "/Est-ablishments", element: <Establishments /> },
      { path: "/Add-Establishment", element: <AddnewEstbilshments />},
      { path: "/update-Establishment/:id", element: <UpdatedEstbilshment /> },
      { path: "/Establishment-overView/:id", element: <Estbilshmentoverview /> },
  
    ];