// "use client";
// import React, { useState } from "react";
// import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
// import { ref } from "firebase/database";
// import {
//   getDownloadURL,
//   getStorage,
//   uploadBytesResumable,
// } from "firebase/storage";
// import Image from "next/image";
// import { db } from "@/firebaseconfig";

// const MessageInput = ({
//   sendMessage,
//   message,
//   setMessage,
//   image,
//   setImage,
// }) => {
//   const storage = getStorage(db);
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const handleUpload = async () => {
//     if (!file) {
//       return;
//     }
//     const storageRef = ref(storage, `chatroom_image/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setImage(downloadURL);
//         });
//       }
//     );
//   };
//   console.log("image sélectionnée:", image);
//   return (
//     <div className="flex items-center p-4 border-t border-gray-200">
//       <FaPaperclip
//         onClick={() => document.getElementById("my_modal_3").showModal()}
//         className="text-gray-700 mr-2 cursor-pointer"
//       />

//       <input
//         type="text"
//         placeholder="type a message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         className="flex-1 border-none p-2 outline-none"
//       />

//       <FaPaperPlane
//         onClick={() => {
//           sendMessage();
//         }}
//         className="text-gray-700 ml-2 cursor-pointer"
//       />

//       {/* dialog d'upload image  */}
//       <dialog id="my_modal_3" className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             {imagePreview && (
//               <Image
//                 src={imagePreview}
//                 alt="image uploaded"
//                 width={100}
//                 height={100}
//                 className=" max-h-28 w-28 mb-4 "
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mb-4"
//             />
//             <div
//               onClick={() => {
//                 handleUpload();
//               }}
//               className="btn btn-sm btn-primary"
//             >
//               Upload
//             </div>
//             {uploadProgress && (
//               <progress value={uploadProgress} max={100}></progress>
//             )}
//           </form>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => document.getElementById("my_modal_3").close()}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>
//     </div>
//   );
// };

//export default MessageInput;

// "use client";
// import React, { useState } from "react";
// import { Upload, SendHorizontal, X } from "lucide-react";
// import Image from "next/image";

// const MessageInput = ({ sendMessage, message, setMessage, onImageUpload }) => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 10;
//       setUploadProgress(progress);

//       if (progress >= 100) {
//         clearInterval(interval);
//         const mockImageUrl = "/api/placeholder/400/300";
//         if (onImageUpload) {
//           onImageUpload(mockImageUrl);
//         }
//         setIsModalOpen(false);
//         setUploadProgress(null);
//         setImagePreview(null);
//         setFile(null);
//       }
//     }, 200);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Ajout d'un conteneur flex avec espacement */}
//         <div className="flex justify-end gap-4 py-4">
//           {/* Groupe d'éléments alignés à droite */}
//           <div className="flex  gap-2 bg-white rounded-lg w-3/4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <Upload className="w-5 h-5" />
//             </button>

//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Écrivez votre message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//               />
//             </div>

//             <button
//               onClick={sendMessage}
//               disabled={!message && !imagePreview}
//               className={`p-2 rounded-full transition-colors ${
//                 message || imagePreview
//                   ? "bg-blue-500 text-white hover:bg-blue-600"
//                   : "bg-gray-200 text-gray-400"
//               }`}
//             >
//               <SendHorizontal className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal d'upload */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
//             <button
//               onClick={() => {
//                 setIsModalOpen(false);
//                 setImagePreview(null);
//                 setFile(null);
//                 setUploadProgress(null);
//               }}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h3 className="text-lg font-semibold mb-4">
//               Télécharger une image
//             </h3>

//             <div className="space-y-4">
//               {imagePreview && (
//                 <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
//                   <Image
//                     src={imagePreview}
//                     width={200}
//                     height={200}
//                     multiple
//                     alt="Aperçu"
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//               )}

//               <label className="block">
//                 <span className="sr-only">Choisir un fichier</span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100
//                     cursor-pointer
//                   "
//                 />
//               </label>

//               {uploadProgress !== null && (
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}

//               <button
//                 onClick={handleUpload}
//                 disabled={!file}
//                 className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
//                   file
//                     ? "bg-blue-500 text-white hover:bg-blue-600"
//                     : "bg-gray-200 text-gray-400"
//                 }`}
//               >
//                 Télécharger
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageInput;

// "use client";
// import React, { useState } from "react";
// import { Upload, SendHorizontal, X } from "lucide-react";
// import Image from "next/image";

// const MessageInput = ({ sendMessage, message, setMessage, onImageUpload }) => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Upload image to Cloudinary
//   const handleUpload = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "ko4bjtic"); // Replace with your Cloudinary upload preset

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const imageUrl = data.secure_url; // Get the image URL from Cloudinary response

//         // Pass the image URL to the parent component
//         if (onImageUpload) {
//           onImageUpload(imageUrl);
//         }

//         setIsModalOpen(false); // Close the modal
//         setUploadProgress(null); // Reset progress
//         setImagePreview(null); // Clear preview
//         setFile(null); // Clear file selection
//       } else {
//         console.error("Error uploading image:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error uploading to Cloudinary:", error);
//     }
//   };

//   // Handle Enter key press for sending messages
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Input container */}
//         <div className="flex justify-end gap-4 py-4">
//           <div className="flex gap-2 bg-white rounded-lg w-3/4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <Upload className="w-5 h-5" />
//             </button>

//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Écrivez votre message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//               />
//             </div>

//             <button
//               onClick={sendMessage}
//               disabled={!message && !imagePreview}
//               className={`p-2 rounded-full transition-colors ${
//                 message || imagePreview
//                   ? "bg-blue-500 text-white hover:bg-blue-600"
//                   : "bg-gray-200 text-gray-400"
//               }`}
//             >
//               <SendHorizontal className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal for image upload */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
//             <button
//               onClick={() => {
//                 setIsModalOpen(false);
//                 setImagePreview(null);
//                 setFile(null);
//                 setUploadProgress(null);
//               }}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h3 className="text-lg font-semibold mb-4">
//               Télécharger une image
//             </h3>

//             <div className="space-y-4">
//               {imagePreview && (
//                 <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
//                   <Image
//                     src={imagePreview}
//                     width={200}
//                     height={200}
//                     alt="Aperçu"
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//               )}

//               <label className="block">
//                 <span className="sr-only">Choisir un fichier</span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100
//                     cursor-pointer
//                   "
//                 />
//               </label>

//               {uploadProgress !== null && (
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}

//               <button
//                 onClick={handleUpload}
//                 disabled={!file}
//                 className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
//                   file
//                     ? "bg-blue-500 text-white hover:bg-blue-600"
//                     : "bg-gray-200 text-gray-400"
//                 }`}
//               >
//                 Télécharger
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageInput;

// "use client";
// import React, { useState } from "react";
// import { Upload, SendHorizontal, X, ImageIcon } from "lucide-react";
// import Image from "next/image";

// const MessageInput = ({ sendMessage, message, setMessage, onImageUpload }) => {
//   const [imagePreviews, setImagePreviews] = useState([]); // Store multiple previews

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files); // Support multiple files
//     const newPreviews = files.map((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);

//       return new Promise((resolve) => {
//         reader.onloadend = () => {
//           resolve({ file, preview: reader.result });
//         };
//       });
//     });

//     Promise.all(newPreviews).then((results) =>
//       setImagePreviews((prev) => [...prev, ...results])
//     );
//   };

//   // Remove a selected image from the preview
//   const removeImagePreview = (index) => {
//     setImagePreviews((prevPreviews) =>
//       prevPreviews.filter((_, i) => i !== index)
//     );
//   };

//   // Handle Enter key press for sending messages
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Display selected images */}
//         {imagePreviews.length > 0 && (
//           <div className="flex gap-4 mb-4 overflow-x-auto">
//             {imagePreviews.map((preview, index) => (
//               <div
//                 key={index}
//                 className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100"
//               >
//                 <Image
//                   src={preview.preview}
//                   alt="Preview"
//                   width={80}
//                   height={80}
//                   className="object-cover w-full h-full"
//                 />
//                 <button
//                   onClick={() => removeImagePreview(index)}
//                   className="absolute top-1 right-1 bg-white rounded-full text-red-500 p-1 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Input container */}
//         <div className="flex items-center gap-4 py-4">
//           {/* Input for uploading images */}
//           <div className="relative">
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageChange}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
//               <ImageIcon className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Text input */}
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="Écrivez votre message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
//             />
//           </div>

//           {/* Send button */}
//           <button
//             onClick={sendMessage}
//             disabled={!message && imagePreviews.length === 0}
//             className={`p-2 rounded-full transition-colors ${
//               message || imagePreviews.length > 0
//                 ? "bg-blue-500 text-white hover:bg-blue-600"
//                 : "bg-gray-200 text-gray-400"
//             }`}
//           >
//             <SendHorizontal className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageInput;

import React from "react";
import { X, ImageIcon, SendHorizontal } from "lucide-react";
import Image from "next/image";

const MessageInput = ({
  sendMessage,
  message,
  setMessage,
  imagePreviews,
  setImagePreviews,
}) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({ file, preview: reader.result });
        };
      });
    });

    Promise.all(newPreviews).then((results) =>
      setImagePreviews((prev) => [...prev, ...results])
    );
  };

  const removeImagePreview = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <ImageIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1">
        <input
          type="text"
          placeholder="Écrivez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>

      <button
        onClick={sendMessage}
        disabled={!message && imagePreviews.length === 0}
        className={`p-2 rounded-full ${
          message || imagePreviews.length > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        <SendHorizontal className="w-5 h-5" />
      </button>

      {imagePreviews.length > 0 && (
        <div className="flex gap-4 mt-2">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={preview.preview}
                alt="Preview"
                layout="fill"
                className="object-cover"
              />
              <button
                onClick={() => removeImagePreview(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 hover:text-white hover:bg-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
