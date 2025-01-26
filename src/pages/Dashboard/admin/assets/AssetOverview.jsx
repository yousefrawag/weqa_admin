import React from 'react'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import AssetOverviewui from '../../../../components/ui/assets/AssetOverviewui'
import Loader from '../../../../components/common/Loader'
import { useParams } from 'react-router-dom'
const AssetOverview = () => {
  const {id} = useParams()
  const {data , isLoading} = useQuerygetSpacficIteam("assets" , "assets" , id)
  if(isLoading) {
    return <Loader />
  }
  return (
    <div className='w-full h-full'>
        <HeadPagestyle pageName="بيانات الإصل"  to="/all-assets" title="عوده" />
        <AssetOverviewui  CurrentAsset={data}/>
    </div>
  )
}

export default AssetOverview