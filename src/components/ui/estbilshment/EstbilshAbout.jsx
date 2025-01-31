import React from 'react'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

import CardEstbilsh from '../../common/CardEstbilsh';
const EstbilshAbout = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 w-full">
       
            <CardEstbilsh  title="إجمالى الإصول" to="" total={30} />
            <CardEstbilsh  title="إجمالى المستخدمين" to="/establishments/23/users" total={20} />
            <CardEstbilsh  title="إجمالى المواقع" to="" total={40} />
       
  
   
    </div>
  )
}

export default EstbilshAbout