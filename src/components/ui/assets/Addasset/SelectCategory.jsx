import React from 'react'
import useQuerygetiteams from '../../../../services/Querygetiteams'
import SmailLoader from '../../../common/Loader/SmailLoader'

const SelectCategory = ({fectParentKEY , keyName , title}) => {
const {data , isLoadding} = useQuerygetiteams(fectParentKEY , fectParentKEY  )
console.log(keyName);

  return (
    <div className="mb-2 flex flex-col  gap-5">
    <label
      htmlFor="levels"
      className="w-full  text-lg font-medium text-gray-700 dark:text-white"
    >
   {title}
    </label>
    <select name={keyName} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                  <option>
                        قم بالإختيار
                  </option>
                  {isLoadding ? (
                    <SmailLoader />
                ) : (
                    data?.data?.data?.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))
                )}
                  
                        
            
        </select>

</div>
  )
}

export default SelectCategory