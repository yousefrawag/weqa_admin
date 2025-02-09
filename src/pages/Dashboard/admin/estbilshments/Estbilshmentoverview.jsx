import React from 'react'
import { Overview , EstbilshAbout } from '../../../../components/ui'
import { Link, useParams } from 'react-router-dom'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import Loader from '../../../../components/common/Loader'
import EstbilshLevel from '../../../../components/ui/estbilshment/EstbilshLevel'
const Estbilshmentoverview = () => {
    const {id} = useParams()
    const { isError , isLoading , data:CurrenEstbilshment} = useQuerygetSpacficIteam("building" , "building" , id)
if(isLoading){
  return <Loader />
}
    return (
    <div className='w-full h-full'>
    
            <HeadPagestyle  to={"/Est-ablishments"} pageName={"بيانات المنشأه"}  title={"عوده"}/>
        <Overview CurrenEstbilshment={CurrenEstbilshment?.building || []} />
        <EstbilshAbout OverviewData={CurrenEstbilshment || []} />
        <h2 className='w-full h-full mt-10 text-black dark:text-white text-2xl'>هيكل المنشأه الإدارى</h2>
        <div className='flex items-center justify-center'>
        <EstbilshLevel data={CurrenEstbilshment || []}/>
        </div>
       
    </div>
  )
}

export default Estbilshmentoverview