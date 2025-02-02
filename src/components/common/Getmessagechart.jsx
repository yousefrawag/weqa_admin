import React from 'react'
import CustomeChart from '../../hooks/CustomeChart'
import useQuerygetiteams from '../../services/Querygetiteams'
import SmailLoader from './Loader/SmailLoader'
const Getmessagechart = () => {
    const {data , isLoading} = useQuerygetiteams("employee" , "employee")
    if(isLoading){
        return <SmailLoader />
    }
  return (
    <div className='mt-5'>
        <h1 className='font-bold'>إحصائات رسائل الدعم الفنى</h1>
        <CustomeChart data={data?.data?.data} seriesName="إجمالى الرسائل" chartType="area"/>
    </div>
  )
}

export default Getmessagechart