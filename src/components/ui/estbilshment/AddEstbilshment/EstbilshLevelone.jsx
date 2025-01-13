import React from 'react'
import useQuerygetiteams from '../../../../services/Querygetiteams'
const EstbilshLevelone = ({handeupdateLevel, updatelevel , name}) => {
  const {data} = useQuerygetiteams('mainCategory', 'mainCategory')
  return (
  
    <div className="mb-6 flex flex-col  gap-5">
    <label
      htmlFor="levels"
      className="w-full  text-lg font-medium text-gray-700 dark:text-white"
    >
   المنشأه التابع لة
    </label>
        <select value={updatelevel} onChange={(e) => handeupdateLevel(e)} name={name} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                  <option>
                        قم بالإختيار
                  </option>
                
                    {
                      data?.data?.data?.map((item) =>{
                        return <option key={item._id} value={item._id}>{item.name}</option>
                      })
                    }
                        
            
        </select>

</div>
  )
}

export default EstbilshLevelone