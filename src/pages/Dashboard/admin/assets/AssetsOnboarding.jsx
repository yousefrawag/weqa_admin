import React from 'react'
import Breadcrumb from '../../../../components/common/Breadcrumbs/Breadcrumb'
import CardEstbilsh from '../../../../components/common/CardEstbilsh'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { CiShoppingCart } from "react-icons/ci";

const AssetsOnboarding = () => {
  return (
    <div className='w-full h-full'>
        <Breadcrumb  pageName="الإصول"/>
        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-5 mt-10'>
        <CardEstbilsh  to="/Assets-levels" title="فئات الإصول" icon={HiOutlineBuildingOffice2}/>
        <CardEstbilsh  to="/all-assets" title="جميع الإصول" icon={HiOutlineBuildingOffice2}/>
        <CardEstbilsh  to="/all-assets-stauts" title="طلبات الاصول الإصول" icon={CiShoppingCart}/>
        <CardEstbilsh  to="/all-assets-archievd" title="أرشيف الإصول" icon={HiMiniArchiveBoxXMark}/>

        </div>
    </div>
  )
}

export default AssetsOnboarding