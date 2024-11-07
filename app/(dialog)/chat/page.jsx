// import { Dialog } from "@/components/ui/dialog";
// import { X } from "lucide-react";
// import React from "react";

// const ChatBubble = ({ isOpen, onClose }) => {
// const handleClose = () => {
//   onClose();
// };
//   return (
//     <>
//       <Dialog
//         open={isOpen}
//         className="fixed bottom-0 right-0 mb-4 mr-4 flex items-center justify-center z-50 "
//       >
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold">Discussion avec le vendeur</h2>
// <button
//   className="text-gray-500 text- hover:text-gray-700"
//   onClick={handleClose}
// >
//   <X className="w-6 h-6" />
// </button>
//           </div>
//           <div className="h-[400px] w-[400px] overflow-y-auto">
//             <p>Mon message</p>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// };

// export default ChatBubble;

// import { X } from "lucide-react";
// import React from "react";

// const ChatBubble = ({ isOpen, onClose }) => {
//   const handleClose = () => {
//     onClose();
//   };
//   return (
//     <div
//       open={isOpen}
//       onOpenChange={onClose}
//       className="fixed bottom-0 right-0 mb-4 mr-4 flex items-center justify-center z-50"
//     >
//       <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">Discussion avec le vendeur</h2>
//           <button
//             className="text-gray-500 text- hover:text-gray-700"
//             onClick={handleClose}
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="h-[400px] w-[400px] overflow-y-auto">
//           <p>Mon message</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBubble;

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";

const ChatBubble = ({ isOpen, onClose, userId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed bottom-0 right-0 mb-4 mr-4 z-50 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Discussion avec le vendeur</h2>
          <DialogClose asChild></DialogClose>
        </div>
        <div className="h-[400px] w-[400px] overflow-y-auto">
          <p>
            Mon message que je souhaite envoyé à l&apos; utilisateur : {userId}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
