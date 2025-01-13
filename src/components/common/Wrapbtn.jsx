import React from 'react'
import { Link } from 'react-router-dom'
const Wrapbtn = ({to}) => {
  return (
     <div className='w-full flex justify-between items-center'>
                      <button type="submit" className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800" >
                            حفظ
                          </button>
                        <Link to={to} className="block text-white bg-main hover:bg-main2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800" >
                            عوده 
                          </Link>
    
                  </div>
  )
}

export default Wrapbtn