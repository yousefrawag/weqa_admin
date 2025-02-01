import React from 'react'
import CustomeChart from '../../hooks/CustomeChart'
import useQuerygetiteams from '../../services/Querygetiteams'
import SmailLoader from './Loader/SmailLoader'
const GetAssetchart = () => {
    const {data , isLoading} = useQuerygetiteams("assets" , "assets")
    if(isLoading){
        return <SmailLoader />
    }
  return (
    <div className='mt-5'>
        <h1 className='font-bold'>إحصائات الإصول</h1>
        <CustomeChart data={data?.data?.data} seriesName="إجمالى الإصول" chartType="area"/>
    </div>
  )
}

export default GetAssetchart