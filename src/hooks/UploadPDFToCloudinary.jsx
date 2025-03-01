// const UploadPDFToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "weqa"); // Replace with your Cloudinary preset
//     formData.append("resource_type", "raw"); // Necessary for PDF uploads
//     formData.append("folder", "pdfs"); // Store PDFs in a separate folder
  
//     try {
//       const response = await fetch("https://api.cloudinary.com/v1_1/dllrrsz02/raw/upload", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       return data.secure_url; // URL of the uploaded PDF
//     } catch (error) {
//       console.error("PDF upload failed:", error);
//       return null;
//     }
//   };
//   export default UploadPDFToCloudinary
  