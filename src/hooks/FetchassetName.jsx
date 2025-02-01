import React from 'react'
import useQuerygetSpacficIteam from '../services/QuerygetSpacficIteam'
import SmailLoader from '../components/common/Loader/SmailLoader'

const FetchassetName = ({id , endpointKey}) => {
    const {data , isLoading} = useQuerygetSpacficIteam(endpointKey , endpointKey , id)
  if(isLoading) {
    return <SmailLoader />
  }  
  return (
    <div className="mb-6 flex flex-col  gap-2">
    <label
      htmlFor="assetsName"
      className="w-full text-lg font-medium text-gray-700 dark:text-white"
    >
      إسم الإصل
    </label>
    <input
      type="text"
      id="assetsName"
      name="assetsName"
        defaultValue={data?.data?.name || ""}
        
      className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
    />
 
  </div>
  )
}

export default FetchassetName