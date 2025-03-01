import React, { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { BiSolidFilePdf } from "react-icons/bi";
import SmailLoader from "../components/common/Loader/SmailLoader";

const UploadSupportImages = ({ images,loaddingfiles , setImages, pdfs, setPdfs }) => {

 

  return (
    <div className="w-full  border-t border-[#D0D5DD99]">
        {
            loaddingfiles ? <SmailLoader /> :   <div className=" w-full  flex gap-1 rounded-[12px]  border-dashed border-[#D0D5DD] p-4">
        
            {/* Image Preview */}
            {images?.length > 0 &&
              images?.map((image, index) => (
                <label key={index} className="cursor-pointer w-full flex gap-2 text-center">
                  <img
                    src={image.view}
                    alt="image-upload"
                    className="mx-auto  max-w-full max-h-[100px] rounded-[10px] object-cover"
                  />
                </label>
              ))}
    
            {/* PDF Preview */}
            {pdfs?.length > 0 &&
              pdfs?.map((pdf, index) => (
                <div key={index} className="text-center">
                  <a href={pdf.view} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex gap-2">
                      <BiSolidFilePdf size={30} className="text-red-500 text-2xl mr-2" />
                    {pdf.file.name}
                  </a>
                </div>
              ))}
    
    
    
          </div>
        }
    
    </div>
  );
};

export default UploadSupportImages;
