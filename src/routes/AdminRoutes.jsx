import {
 
  Levels 
  ,ECommerce , 

   ChatOverview
  } from "../pages/Dashboard/admin"
export const AdminRoutes = [
    { path: "/", element: <ECommerce /> },
    { path: "/main-categoary", element: <Levels /> },
    { path: "/support-weqa", element: <ChatOverview /> },
  ];