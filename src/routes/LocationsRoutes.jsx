import { Getlocations  , AddLocations , LocationOverview , UpdateLocations} from "../pages/Dashboard/admin"
export const  LocationsRoutes = [
    
        { path: "/locations", element: <Getlocations /> },
        { path: "/Add-location", element: <AddLocations /> },
        { path: "/locations/:id", element: <LocationOverview /> },
        { path: "/locations-edit/:id", element: <UpdateLocations /> },
    
]