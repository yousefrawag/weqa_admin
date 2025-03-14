import React from 'react'
import useQuerygetSpacficIteam from '../services/QuerygetSpacficIteam'
import Loader from '../components/common/Loader'
import useGetUserAuthentications from '../middleware/GetuserAuthencations'
const CreateFormAsset = ({endpointKey , id , SelectedType , formData, handleInputChange  }) => {
    const {data , isLoading} = useQuerygetSpacficIteam(endpointKey , endpointKey , id)
 
     const {isOwner,  canviewtAssetFinancial , canEditFinancial} = useGetUserAuthentications("assets")
   
    const Currentasset = data?.data
    const filteredFields = Currentasset?.data?.filter((input) =>{
        if (SelectedType === "finnincedata") {
 
          return (isOwner || canviewtAssetFinancial || canEditFinancial) && input.category === SelectedType;
        } else {
          // Show other data types without permission checks
          return input.category === SelectedType;
        }
      });

 if(isLoading){
    return <Loader />
 }   
  return (
    <div className='w-full h-full'>

        {
            filteredFields?.map((input) => {
                return (
                    <div key={input?.id} className=" flex flex-col  gap-2">
                <label
                htmlFor={input?.key}
                className="w-full text-lg font-medium text-gray-700 dark:text-white"
                >
                {input?.name}
                </label>
                {
                    input?.type === "select" ? <select      value={formData[input?.key] || ""}
                    onChange={handleInputChange} className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"  id={input?.key}
                    name={input?.key} >
                        <option value="">قم بالإختيار</option>
                        {
                            input?.selectedOptions?.map((opit) => {
                                return <option key={opit} value={opit}>{opit}</option>
                            })
                        }
                    </select> :   <input
                type={input?.type}
                id={input?.key}
                name={input?.key}
                value={formData[input?.key] || ""}
                onChange={handleInputChange}
                className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 w-full  outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                />
                }
              
    
                </div>
                )
                
                
            })
        }
        
            
    </div>
  )
}

export default CreateFormAsset