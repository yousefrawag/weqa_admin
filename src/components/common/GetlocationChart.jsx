import React from 'react'
import CustomeChart from '../../hooks/CustomeChart'
import useQuerygetiteams from '../../services/Querygetiteams'
import SmailLoader from './Loader/SmailLoader'
const GetlocationChart = () => {
    const {data , isLoading} = useQuerygetiteams("location" , "location")
    if(isLoading){
        return <SmailLoader />
    }
  return (
    <div className='mt-5'>
        <h1>إحصائات المواقع</h1>
        <CustomeChart data={data?.data?.data} seriesName="إجمالى المواقع" chartType="area"/>
    </div>
  )
}

export default GetlocationChart