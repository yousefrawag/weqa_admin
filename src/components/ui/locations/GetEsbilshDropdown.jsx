import React from 'react'
import useQuerygetiteams from '../../../services/Querygetiteams'

const GetEsbilshDropdown = ({setBuilding , building }) => {
    const {isLoading , data} = useQuerygetiteams("building" , "building")
  return (
    <div>
        <label
           className="w-full text-lg font-medium text-gray-700 dark:text-white"
        >
            المنشأه التابع لها الموقع
        </label>
        <select value={building} onChange={(e) => setBuilding(e.target.value)} name="building" className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
            <option value="">قم بالإختيار</option>
            {
                data?.data?.data?.map((item) =>{
                    return <option key={item?._id} value={item._id}>{item?.name}</option>
                })
            }
        </select>
        </div>
  )
}

export default GetEsbilshDropdown