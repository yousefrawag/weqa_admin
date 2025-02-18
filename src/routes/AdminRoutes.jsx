import {
 
  Levels 
  ,ECommerce , 
  AddTicket , 
   ChatOverview , 
   TicketOverview
  } from "../pages/Dashboard/admin"
  import store from "../store/index"
  import Checkuserautherzationview from "../middleware/Checkuserautherzationview"
export const AdminRoutes = [
    { path: "/", element: <ECommerce /> },
    { path: "/main-categoary", element: <Levels /> ,  loader:Checkuserautherzationview(store , "mainCategory" , "get")},
    { path: "/support-weqa", element: <ChatOverview /> },
    { path: "/support-weqa/Add-ticket", element: <AddTicket /> },
    { path: "/support-weqa/:Ticketid/:userId", element: <TicketOverview /> },
  ];