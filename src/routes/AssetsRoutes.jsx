import {

 
    AssetsLevels , 
    AssetsCategoray,
    AssetsSubcategoray ,
    GetAssetsByCategoray ,
    Addassets,
    AssetOverview,
    GetAllAssets,
    AssetsOnboarding,
    EditAsset,
    NestsubCategoray ,
    AllAssetsStauts
 
   } from "../pages/Dashboard/admin"
   import store from "../store/index"
   import Checkuserautherzationview from "../middleware/Checkuserautherzationview"
 export const AssetsRoutes = [
  
  { path: "/Assets-Onboarding", element: < AssetsOnboarding /> },
     { path: "/Assets-levels", element: <AssetsLevels /> , loader:Checkuserautherzationview(store , "assets" , "get") },
     { path: "Assets-category/:id", element: <AssetsCategoray /> ,  loader:Checkuserautherzationview(store , "assets" , "get")  },
     { path: "Assets-Subcategory/:id", element: <AssetsSubcategoray />  , loader:Checkuserautherzationview(store , "assets" , "get") },
     { path: "Assets-NestSubcategory/:id", element: <NestsubCategoray />  , loader:Checkuserautherzationview(store , "assets" , "get") },

     { path: "Assets/:id/:continued", element: <GetAssetsByCategoray /> , loader:Checkuserautherzationview(store , "assets" , "get")  },
     { path: "add-assets/:id/:continued", element: <Addassets />  , loader:Checkuserautherzationview(store , "assets" , "post") },
     { path: "assetOverview/:id", element: <AssetOverview />  , loader:Checkuserautherzationview(store , "assets" , "get") },
     { path: "all-assets", element: <GetAllAssets /> , loader:Checkuserautherzationview(store , "assets" , "get")  },
     { path: "all-assets-stauts", element: <AllAssetsStauts /> ,  loader:Checkuserautherzationview(store , "assets" , "get")  },

     { path: "asset-edit/:id", element: <EditAsset />  , loader:Checkuserautherzationview(store , "assets" , "put") },
   ];