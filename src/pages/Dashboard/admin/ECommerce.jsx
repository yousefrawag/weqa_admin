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
import AssetsCountFinncdata from '../../../components/common/AssetsCountFinncdata';
import MostEsbilshmentAddassets from '../../../components/common/MostEsbilshmentAddassets';
import MostestbilshmenthasLocations from '../../../components/common/MostestbilshmenthasLocations';
import MostacategorayhasAaasts from '../../../components/common/MostacategorayhasAaasts';
import CountLocationsType from '../../../components/common/CountLocationsType';
import AssetsKindChart from '../../../components/common/AssetsKindChart';
import CahartAssetsType from '../../../components/common/CahartAssetsType';
import useQuerygetiteams from '../../../services/Querygetiteams';
import Loader from '../../../components/common/Loader';
const ECommerce = () => {
const {data , isLoading} = useQuerygetiteams("statistics" , "statistics")
if(isLoading) {
  return <Loader />
}
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="إجمالى المنشأت" total={data?.data?.data?.building}rate="0.43%" levelUp>
          <BsFillBuildingsFill/>
        </CardDataStats>
        <CardDataStats title="إجمالى المواقع" total={data?.data?.data?.location} rate="4.35%" levelUp>
        <MdPlace />
        </CardDataStats>
        <CardDataStats title="إجمالى الإصول" total={data?.data?.data?.assets} rate="2.59%" levelUp>
        <FaGripHorizontal />
        </CardDataStats>
        <CardDataStats title="إجمالى المستخدمين" total={data?.data?.data?.employee} rate="0.95%" levelUp>
        <FaUsers />
        </CardDataStats>
        <CardDataStats title="إجمالى فئات الإصول" total={data?.data?.data?.mainCategoryAssets} rate="0.95%" levelUp>
        <FaUsers />
        </CardDataStats>
        <CardDataStats title="إجمالى الهياكل الإدارية" total={data?.data?.data?.mainCategory} rate="0.95%" levelUp>
        <FaUsers />
        </CardDataStats>
        <CardDataStats title="إجمالى تذكر الدعم الفنى" total={data?.data?.data?.tickets} rate="0.95%" levelUp>
        <FaUsers />
        </CardDataStats>
      </div>
    
<MostEsbilshmentAddassets />
<AssetsCountFinncdata />
<MostacategorayhasAaasts />
<AssetsKindChart />
<CahartAssetsType />
<MostestbilshmenthasLocations />
<CountLocationsType />
        <GetestbilsmentChart />
        <GetlocationChart />
        <GetAssetchart />
        <GetusersChart />
        <Getmessagechart />
    </>
  );
};

export default ECommerce;
