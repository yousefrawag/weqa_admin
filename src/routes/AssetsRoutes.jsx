import {

 
    AssetsLevels , 
    AssetsCategoray,
    AssetsSubcategoray ,
    GetAssetsByCategoray ,
    Addassets,
    AssetOverview,
    GetAllAssets,
    AssetsOnboarding,
    EditAsset
 
   } from "../pages/Dashboard/admin"
 export const AssetsRoutes = [
  
  { path: "/Assets-Onboarding", element: < AssetsOnboarding /> },
     { path: "/Assets-levels", element: <AssetsLevels /> },
     { path: "Assets-category/:id", element: <AssetsCategoray /> },
     { path: "Assets-Subcategory/:id", element: <AssetsSubcategoray /> },
     { path: "Assets/:id/:continued", element: <GetAssetsByCategoray /> },
     { path: "add-assets/:id/:continued", element: <Addassets /> },
     { path: "assetOverview/:id", element: <AssetOverview /> },
     { path: "all-assets", element: <GetAllAssets /> },
     { path: "asset-edit/:id", element: <EditAsset /> },
  
     
   ];