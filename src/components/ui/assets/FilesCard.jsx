import React from 'react'
import { BiSolidFilePdf } from "react-icons/bi";
import { format } from 'date-fns';
const FilesCard = ({CurrentAsset}) => {
    const files = CurrentAsset?.data?.pdf
    console.log("from filecard" , CurrentAsset);
    
  return (
    <div>
      
    
     <div className=" mt-10 grid grid-cols-1 lg:grid-cols-3 w-full gap-4 mt-4">
        {files?.map((pdf, index) => (
          <div
            key={pdf?._id}
            className="flex items-center gap-10 mt-5 mb-5 dark:bg-form-input justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-10">
              <BiSolidFilePdf size={30} className="text-red-500 text-2xl mr-2" />
              <a
             href={pdf.pdf} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate max-w-[200px]"
              >
                {pdf.pdf.slice(0 ,20)}
              </a>
              <div className='w-full h-full flex gap-3 items-center'>
                <span>
                {pdf.createdBy?.username} 
                </span>
              <img className='w-10 h-10 rounded-full' src={pdf.createdBy?.image} alt={pdf.createdBy?.username}  />
              </div>
            </div>
         
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilesCard