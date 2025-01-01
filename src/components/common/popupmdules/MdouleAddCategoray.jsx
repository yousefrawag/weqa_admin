import React, { useEffect, useState } from 'react';
import { useDashboardContext } from '../../../context/DashboardProviedr';
import RenderAddlevel from '../../ui/Levels/RenderAddlevel';
const MdouleAddCategoray = () => {
    const {module, setmodule} = useDashboardContext()

    const Levels = ["هيكل جديد" , "هيكل فرعى" , "هيكل فرعى ثالث" , "هيكل فرعى رابع"]
    const [Currentlevel , SetCurrentLevel] = useState("هيكل جديد")



  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center top-0 right-0 bottom-0  ${module ? 
        "flex" :"hidden"
    }`}>
      <div className="relative bg-white p-6 rounded-md shadow-lg w-full max-w-[500px] h-auto max-h-[90%] mx-auto	">
        {/* Close Button */}
        <button
        onClick={() => setmodule(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
         type='button'
        >
          ✕
        </button>

        {/* Content of the popup */}
        <div className="mb-5 mt-3 p-3">
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-2 w-full'>
          {
            Levels.map((item) => {
              return    <button
              onClick={() => SetCurrentLevel(item)}
              className={`block text-white  ${Currentlevel === item ? "bg-main2" :"bg-main"}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800`}
              type="button"
            >
                {item}
            </button>
            })
          }
        </div>
        <RenderAddlevel Currentlevel={Currentlevel} />
        </div>
    
      </div>
    </div>
  );
};

export default MdouleAddCategoray;
