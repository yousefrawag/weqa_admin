import React from 'react'
import useQuerygetiteams from '../services/Querygetiteams'

const GetCategoreisAllowdid = ({fetchKey , sectionName  , handelAllowedid , allowedIds }) => {
    const {data , isLoading} = useQuerygetiteams(fetchKey , fetchKey)
console.log("data" , data);

  return (
    <div className="mt-10 border border-gray-300 rounded-lg bg-white dark:bg-transparent">
    <h3 className="font-bold text-lg mb-4 w-full border-b-[1px] p-5">{sectionName}</h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-7 p-5 ">
      {data?.data?.data?.map((Categoray) => (
        <label
          key={Categoray._id}
          className="flex items-center gap-2 cursor-pointer shadow-md p-4 dark:border-form-strokedark dark:bg-form-input rounded-[5px]"
        >
          <input
            type="checkbox"
            checked={allowedIds.includes(Categoray?._id)}
           onChange={() => handelAllowedid(Categoray?._id)}
            className="form-checkbox"
          />
          <span className='w-full flex gap-3 items-center'>
          {Categoray?.name}
          <img src={Categoray?.image} alt={Categoray?.name}  className='w-10 h-10 rounded-full fite-cover'/>
          </span>
         
        </label>
      ))}
    </div>
  </div>
  )
}

export default GetCategoreisAllowdid