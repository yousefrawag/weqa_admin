import React from 'react'
import { Overview , EstbilshAbout } from '../../../../components/ui'
import { Link, useParams } from 'react-router-dom'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
import HeadPagestyle from '../../../../components/common/HeadPagestyle'
import Loader from '../../../../components/common/Loader'
import EstbilshLevel from '../../../../components/ui/estbilshment/EstbilshLevel'
import TreeNode from '../../../../components/ui/estbilshment/TreeNode'
import Estbsilshstaticts from '../../../../components/ui/estbilshment/Estbsilshstaticts'
const Estbilshmentoverview = () => {
    const {id , level} = useParams()
    const { isError , isLoading , data:CurrenEstbilshment} = useQuerygetSpacficIteam(level , level , id)
if(isLoading){
  return <Loader />
}
    return (
    <div className='w-full h-full '>
    
            <HeadPagestyle  to={"/Est-ablishments"} pageName={"بيانات المنشأه"}  title={"عوده"}/>
        <Overview CurrenEstbilshment={CurrenEstbilshment?.data || []} />
        <div>
        <span className='mt-5 pt-4'>
          لوحه تحكم المنشأه
        </span>
        <EstbilshAbout OverviewData={CurrenEstbilshment || []} />
        <Estbsilshstaticts id={id} />
        <h2 className='w-full h-full mt-10 text-black dark:text-white text-2xl'>هيكل المنشأه الإدارى</h2>
        <div className='flex items-center justify-center'>
        <TreeNode node={CurrenEstbilshment?.data || []}/>
        </div>
 
        </div>
       
    </div>
  )
}

export default Estbilshmentoverview