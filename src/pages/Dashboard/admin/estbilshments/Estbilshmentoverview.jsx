import React from 'react'
import { Overview , EstbilshAbout } from '../../../../components/ui'
import { Link, useParams } from 'react-router-dom'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import Loader from '../../../../components/common/Loader'
const Estbilshmentoverview = () => {
    const {id} = useParams()
    const { isError , isLoading , data:CurrenEstbilshment} = useQuerygetSpacficIteam("building" , "building" , id)
if(isLoading){
  return <Loader />
}
    return (
    <div className='w-full h-full'>
    
            <HeadPagestyle  to={"/Est-ablishments"} pageName={"بيانات المنشأه"}  title={"عوده"}/>
        <Overview CurrenEstbilshment={CurrenEstbilshment?.data || []} />
        <EstbilshAbout OverviewData={CurrenEstbilshment?.data || []} />
    </div>
  )
}

export default Estbilshmentoverview