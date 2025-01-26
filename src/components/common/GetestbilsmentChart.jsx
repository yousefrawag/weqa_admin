import React from 'react'
import CustomeChart from '../../hooks/CustomeChart'
import useQuerygetiteams from '../../services/Querygetiteams'
import SmailLoader from './Loader/SmailLoader'
const GetestbilsmentChart = () => {
    const {data , isLoading} = useQuerygetiteams("building" , "building")
    if(isLoading){
        return <SmailLoader />
    }
  return (
    <div className='mt-5'>
        <h1>إحصائات المنشأت</h1>
        <CustomeChart data={data?.data?.data} seriesName="إجمالى المنشأت" chartType="line"/>
    </div>
  )
}

export default GetestbilsmentChart