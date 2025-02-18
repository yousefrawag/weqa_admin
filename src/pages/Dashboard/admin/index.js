import ECommerce from "./ECommerce";
import Establishments from "./estbilshments/Establishments";
import AddnewEstbilshments from "./estbilshments/AddnewEstbilshments";
import Levels from "./Levels";
import UpdatedEstbilshment from "./estbilshments/UpdatedEstbilshment";
import Estbilshmentoverview from "./estbilshments/Estbilshmentoverview";
import Getusers from "./users/Getusers";
import AddNewuser from "./users/AddNewuser";
import UserOverview from "./users/UserOverview";
import ChatOverview from "./Support/ChatOverview";
import EstablishmentUsers from "./estbilshments/users/EstablishmentUsers";
import Adduser from "./estbilshments/users/Adduser";
import Useroverview from "./estbilshments/users/Useroverview";
import Getlocations from "./locations/Getlocations";
import AddLocations from "./locations/AddLocations";
import LocationOverview from "./locations/LocationOverview";
import UpdateLocations from "./locations/UpdateLocations";
// assets levels
import AssetsLevels from "./assets/assetslevels/AssetsLevels";
import Getpermissions from "./permissions/Getpermissions";
import AssetsCategoray from "./assets/assetslevels/AssetsCategoray";
import AssetsSubcategoray from "./assets/assetslevels/AssetsSubcategoray";
import GetAssetsByCategoray from "./assets/AssetsData/GetAssetsByCategoray";
import Addassets from "./assets/AddAsset/Addassets";
import AssetOverview from "./assets/AssetOverview";
import GetAllAssets from "./assets/AssetsData/GetAllAssets";
import AssetsOnboarding from "./assets/AssetsOnboarding";
import AddPermission from "./permissions/AddPermission";
import EditAsset from "./assets/editasset/EditAsset";
import GetEsbilshAssets from "./estbilshments/estbilshAssets/GetEsbilshAssets";
import GetEsbilshLocation from "./estbilshments/EsstbilshLocation/GetEsbilshLocation";
import AddTicket from "./Support/AddTicket";
import Updateuser from "./users/Updateuser";
import TicketOverview from "./Support/TicketOverview";
import UpdatePermissions from "./permissions/UpdatePermissions";
import NestsubCategoray from "./assets/assetslevels/NestsubCategoray";
import AllAssetsStauts from "./assets/AssetsData/AllAssetsStauts";
export {
    ECommerce ,
       
    Levels,

     // Establishments Routes
    Establishments,
    AddnewEstbilshments,
    UpdatedEstbilshment,
    Estbilshmentoverview,
 
     // Establishments Routes
  
    Getusers,
    AddNewuser ,
    UserOverview , 
    ChatOverview,
    EstablishmentUsers,
    Adduser,
 
    Useroverview,

     // locations Routes
    Getlocations,
    AddLocations,
    LocationOverview,
    UpdateLocations,
     // locations Routes

   // asset Routes
    AssetsLevels,
    Getpermissions ,
    AssetsCategoray,
    AssetsSubcategoray,
    GetAssetsByCategoray,
    Addassets,
    AssetOverview,
    GetAllAssets,
    AssetsOnboarding,
      // asset Routes

      // permissions routes
      AddPermission,
      EditAsset , 
      GetEsbilshAssets , 
      GetEsbilshLocation , 
      AddTicket , 
      Updateuser , 
      TicketOverview , 
      UpdatePermissions ,
      NestsubCategoray ,
      AllAssetsStauts

}