import React from 'react';
import CardDataStats from '../../../components/common/CardDataStats';
import GetusersChart from '../../../components/common/GetusersChart';
import GetlocationChart from '../../../components/common/GetlocationChart';
import GetestbilsmentChart from '../../../components/common/GetestbilsmentChart';
import GetAssetchart from '../../../components/common/GetAssetchart';
import Getmessagechart from '../../../components/common/Getmessagechart';
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdPlace } from 'react-icons/md';
import { FaGripHorizontal, FaUsers } from 'react-icons/fa';

const ECommerce = () => {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="إجمالى المنشأت" total="50" rate="0.43%" levelUp>
          <BsFillBuildingsFill/>
        </CardDataStats>
        <CardDataStats title="إجمالى المواقع" total="100" rate="4.35%" levelUp>
        <MdPlace />
        </CardDataStats>
        <CardDataStats title="إجمالى الإصول" total="2.450" rate="2.59%" levelUp>
        <FaGripHorizontal />
        </CardDataStats>
        <CardDataStats title="إجمالى المستخدمين" total="150" rate="0.95%" levelUp>
        <FaUsers />
        </CardDataStats>
      </div>

        <GetestbilsmentChart />
        <GetlocationChart />
        <GetAssetchart />
        <GetusersChart />
        <Getmessagechart />
    </>
  );
};

export default ECommerce;
