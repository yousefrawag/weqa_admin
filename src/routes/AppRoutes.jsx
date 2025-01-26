import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SignIn from '../pages/Authentication/SignIn.jsx';


import DefaultLayout from '../layout/DefaultLayout.jsx';
import DashboardProvider from '../context/DashboardProviedr.jsx';
import { AdminRoutes } from './AdminRoutes.jsx';
import { EsbilshRoutes } from './EsbilshRoutes.jsx';
import { UsersRoute } from './UsersRoute.jsx';
import { LocationsRoutes } from './LocationsRoutes.jsx';
import { AssetsRoutes } from './AssetsRoutes.jsx';
import { permissionsRoutes } from './permissionsRoutes.jsx';
import { UserRoutes } from './UserRoutes.jsx';
const AppRoutes = () => {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardProvider><DefaultLayout /></DashboardProvider>,
      children:  [
       ...AdminRoutes,
       ...EsbilshRoutes,
       ...LocationsRoutes,
       ...AssetsRoutes,
       ...permissionsRoutes,
       ...UsersRoute,
       ...UserRoutes,
   
      
  
      ],
   
    },
    {
      path: "/auth/signin",
      element: <SignIn />,
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
