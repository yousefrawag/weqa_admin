import { Getlocations  , AddLocations , LocationOverview , UpdateLocations} from "../pages/Dashboard/admin"
import store from "../store/index"
import  Checkuserautherzationview  from "../middleware/Checkuserautherzationview";
export const  LocationsRoutes = [
    
        { path: "/locations", element: <Getlocations /> ,  loader:Checkuserautherzationview(store , "location" , "get") },
        { path: "/Add-location", element: <AddLocations /> , loader:Checkuserautherzationview(store , "location" , "post") },
        { path: "/locations/:id", element: <LocationOverview />  , loader:Checkuserautherzationview(store , "location" , "get")},
        { path: "/locations-edit/:id", element: <UpdateLocations /> , loader:Checkuserautherzationview(store , "location" , "put") },
    
]