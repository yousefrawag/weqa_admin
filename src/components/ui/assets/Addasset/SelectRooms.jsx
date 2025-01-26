import React from 'react'
import useQuerygetSpacficIteam from '../../../../services/QuerygetSpacficIteam'
const SelectRooms = ({location , CurrentFloor , CurrentSection , CurrentArea , CurrentRoom , setCurrentRoom}) => {
    const {data , isLoadding} = useQuerygetSpacficIteam("location" , "location" , location )
    const selectedFloor = data?.data?.floors?.find((item) => item._id === CurrentFloor)
    const SelectedArea = selectedFloor?.areas?.find((item) => item._id === CurrentArea)
    const Selectsection = SelectedArea?.sections?.find((item) => item._id === CurrentSection)
    return (
      <div className="mb-2 flex flex-col  gap-5">
      <label
        htmlFor="levels"
        className="w-full  text-lg font-medium text-gray-700 dark:text-white"
      >
        الغرفة
      </label>
      <select name="room" value={CurrentRoom} onChange={(e) => setCurrentRoom(e.target.value)} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                    <option>
                          قم بالإختيار
                    </option>
                    {isLoadding ? (
                      <SmailLoader />
                  ) : (
                    Selectsection?.rooms?.map((item) => (
                          <option key={item._id} value={item._id}>
                              {item.name}
                          </option>
                      ))
                  )}
                    
                          
              
          </select>
  
  </div>
    )
}

export default SelectRooms