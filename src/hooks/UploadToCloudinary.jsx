// import axios from "axios";

// const UploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "weqa1234"); 
//     formData.append("folder", "images"); 
  
//     try {
//       const response = await axios.get("https://api.cloudinary.com/v1_1/dllrrsz02/image/upload", {
//         method: "POST",
//         body: formData,
      
//       });
  
//       const text = await response.text();
//       console.log("Raw response:", text); // Debug response text
  
//       const data = JSON.parse(text);
//       console.log("Parsed response:", data);
  
//       return data.secure_url; 
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       return null;
//     }
//   };
//   export default UploadToCloudinary
  