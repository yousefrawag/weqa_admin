import React from 'react'
import CustomeChart from '../../hooks/CustomeChart'
import useQuerygetiteams from '../../services/Querygetiteams'
import SmailLoader from './Loader/SmailLoader'
const GetusersChart = () => {
    const {data , isLoading} = useQuerygetiteams("employee" , "employee")
    if(isLoading){
        return <SmailLoader />
    }
  return (
    <div className='mt-5'>
        <h1 className='font-bold'>إحصائات المستخدمين</h1>
        <CustomeChart data={data?.data?.data} seriesName="إجمالى المستخدمين" chartType="area"/>
    </div>
  )
}

export default GetusersChart