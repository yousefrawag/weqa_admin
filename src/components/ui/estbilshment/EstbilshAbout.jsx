import React from 'react'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

import CardEstbilsh from '../../common/CardEstbilsh';
const EstbilshAbout = ({OverviewData}) => {
  const Estbilshment = OverviewData?.building
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 w-full">
       
            <CardEstbilsh  title="إجمالى الإصول" to={`/establishments-assets/${Estbilshment?._id}`} total={OverviewData?.assetsCount ? OverviewData?.assetsCount : "0" } />
            <CardEstbilsh  title="إجمالى المستخدمين" to="/establishments/23/users" total={OverviewData?.employeeCount ? OverviewData?.employeeCount : "0"} />
            <CardEstbilsh  title="إجمالى المواقع" to={`/establishments-location/${Estbilshment?._id}`} total={ Estbilshment?.location?.length ? Estbilshment?.location?.length : "0"} />
       
  
   
    </div>
  )
}

export default EstbilshAbout