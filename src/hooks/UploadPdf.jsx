import React from 'react';
import { SlCloudUpload } from "react-icons/sl";
import { BiSolidFilePdf } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const UploadPdf = ({ pdfs, handelFiles ,setPdfs }) => {
 const handleDelete = (name) => {
    const newfiles = pdfs.filter((item) => item.name !== name)
    setPdfs(newfiles)
 }   
  return (
    <div className="  w-full h-full flex flex-col items-center justify-center  ">
      {/* Upload Area */}
      <div className="mt-[-10px] flex flex-col items-center justify-center min-h-[200px] w-full rounded-[12px] bg-[#F1F1F7] border-[1px] border-dashed border-black">
        <label
          htmlFor="user-pdf"
          className="cursor-pointer p-4 grid grid-cols-1 gap-2 text-center items-center justify-center "
        >
          <SlCloudUpload className="text-[#666B71] text-6xl text-center" />
          <span className="text-[#666B71] text-lg">Upload PDF</span>
        </label>
        <input
          type="file"
          name="pdf"
          id="user-pdf"
          hidden
          onChange={handelFiles}
          accept="application/pdf"
          multiple
        />
      </div>

      {/* Display Uploaded PDFs */}
      <div className=" mt-10 grid grid-cols-1 lg:grid-cols-3 w-full gap-4 mt-4">
        {pdfs?.map((pdf, index) => (
          <div
            key={index}
            className="flex items-center mt-5 mb-5 dark:bg-form-input justify-between bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center ">
              <BiSolidFilePdf className="text-red-500 text-2xl mr-2" />
              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate max-w-[200px]"
              >
                {pdf.name}
              </a>
            </div>
            <button
              onClick={() => handleDelete(pdf.name)}
              className="text-red-500 hover:text-red-700"
            >
             <MdDelete />

            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPdf;
