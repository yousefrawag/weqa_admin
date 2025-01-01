import React from 'react'
import useQuerygetiteams from '../../../services/Querygetiteams'

const AddLevel4 = () => {
    const {data:Levels} = useQuerygetiteams('mainCategory', 'mainCategory')

  return (
    <div className='w-full h-full mt-3'>
          <div className="mb-6 flex flex-col  gap-5">
                    <label
                      htmlFor="mainCategory"
                      className="w-full  text-lg font-medium text-gray-700 dark:text-white"
                    >
                   هيكل فرعى رابع
                    </label>
                  <select name='mainCategory' className="focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-main p-3 pr-10 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500">
                      <option>
                                قم بالإختيار
                      </option>
                        {
                            Levels?.data?.data?.map((item) =>{
                            return <option key={item._id} value={item._id}>{item.name}</option>
                          })
                        }
                                  
                      
                  </select>
            
              </div>
                <div className='flex flex-col '>
                    <label htmlFor="name">إسم الفرع</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="قم بكتابه الهيكل"
                    className="mt-3 text-main p-3 w-full outline-0 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500"
                />
                </div>
                <button
                    type="submit"
                        className="mt-4 block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
                    
                    >
                    حفظ
                </button>

</div>
  )
}

export default AddLevel4