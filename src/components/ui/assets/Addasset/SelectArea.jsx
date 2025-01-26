import React from 'react'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'

const SelectArea = ({location ,CurrentFloor , CurrentArea , setCurrentArea }) => {
    const {data , isLoadding} = useQuerygetSpacficIteam("location" , "location" , location )
    const selectedFloor = data?.data?.floors?.find((item) => item._id === CurrentFloor)
    return (
      <div className="mb-2 flex flex-col  gap-5">
      <label
        htmlFor="levels"
        className="w-full  text-lg font-medium text-gray-700 dark:text-white"
      >
        المنطقة
      </label>
      <select name="area"  value={CurrentArea} onChange={(e) => setCurrentArea(e.target.value)} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                    <option>
                          قم بالإختيار
                    </option>
                    {isLoadding ? (
                      <SmailLoader />
                  ) : (
                    selectedFloor?.areas?.map((item) => (
                          <option key={item._id} value={item._id}>
                              {item.name}
                          </option>
                      ))
                  )}
                    
                          
              
          </select>
  
  </div>
    )
}

export default SelectArea