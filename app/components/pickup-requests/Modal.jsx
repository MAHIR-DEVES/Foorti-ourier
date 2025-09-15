// import { RxCross1 } from "react-icons/rx";

// const Modal = ({ isOpen, onClose }) => {
//   return (
//     <div
//       className={`${
//         isOpen ? " visible" : " invisible"
//       } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
//     >
//       <div
//         className={`${
//           isOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
//         } w-[90%] sm:w-[80%] md:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
//       >
//         <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
//           <div className="flex justify-between items-center gap-32">
//             <h1 className="text-[1.3rem] text-primary">Pickup Address</h1>
//             <p className="text-[1rem]  text-primary font-medium text-primary-active cursor-pointer">Edit Address</p>
//           </div>
//           <RxCross1
//             className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
//             onClick={onClose}
//           />
//         </div>

//         <form className="flex flex-col gap-5 px-4 py-7 ">
//           <div>
//             <label
//               htmlFor="Estimated Parcel"
//               className="text-[1rem] font-[500] text-secondary"
//             >
//               Estimated Parcel
//             </label>
//             <input
//               type="Estimated Parcel"
//               name="Estimated Parcel"
//               id="Estimated Parcel"
//               placeholder="Estimated Parcel (Optional)"
//               className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-gray"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="text-[1rem] font-[500] text-secondary"
//             >
//               Note
//             </label>
//             <textarea
//               type="text"
//               name="text"
//               id="text"
//               placeholder="Type Note (Optional)"
//               className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-gray"
//             ></textarea>
//           </div>

       

//           <button
//             type="submit"
//             className="py-2 cursor-pointer px-4 w-full text-lg font-medium button-primary  rounded-md"
//           >
//             Send Request
//           </button>
//         </form>

     
//       </div>
//     </div>
//   );
// };

// export default Modal;






// 'use client';

// import { RxCross1 } from "react-icons/rx";
// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJkMmZiM2JjMTAwYjg5NmJlMGFhYjkxODY1MjU3OGRlMmEzYzc1NjE5MmIyNjE2ODIzNWM0OWVlNmYxNDg0MWM4YTgxNmQ3NDU0NGFlYzVkIn0.eyJhdWQiOiIyMiIsImp0aSI6IjJkMmZiM2JjMTAwYjg5NmJlMGFhYjkxODY1MjU3OGRlMmEzYzc1NjE5MmIyNjE2ODIzNWM0OWVlNmYxNDg0MWM4YTgxNmQ3NDU0NGFlYzVkIiwiaWF0IjoxNzUwMzg2NDM1LCJuYmYiOjE3NTAzODY0MzUsImV4cCI6MTc4MTkyMjQzNSwic3ViIjoiMTI4NiIsInNjb3BlcyI6W119.mFJ79VJJFn0jG12vRf9Hk4m2gxuC7QBGMCA7fMbGXK47zW9O4QECiTSXZm4rZqwzFRegGWBdiFbG-fpBiK_2yDNtyIusePogCMFP4CApM0uJPa7TrH7aDcfrfmuoKavKiKO2v0mAb1b3xDk1ifCmlmeKCw-whLEOtId0VGuzdcDxEFgtzDFS5tHtXxbUTm_6nIj0IZAKZWeBM8m1Y6dzJFsIbSRXEyqo1oEdS-Tb1nvRyk15PJt4hCeSLZf_vhpFc9HlsDLyGDvP-K__Qd_JzNK69KShye27docoDAmuk4FMka38zfj-9PBxdOPzrgW14SpYbrPHXNLTN3Y_nv7Ui7kumDBJduQPrC5ke8vlu2xZQnMYJjM5q1pZAqDi1ihP7TMpz4lkBj80gbClmL425DRdRu-y89HEc9zbtDt6dRQm0WnGWRMXtO0XvOrUE1I8lDsmrlY1rYFqaSnBQU0L7KVwJebL7ZcYGEMXbD1oKRX5mTTgxpGZUZOJ6894AoCjV7doCWggeBfdSJTtfJnNfshFAAKD3lVwbk5p2i0py_OXUgYRwAsAvq89mrdVUkcmeEvCZ2NJWau3I5_2BPc2wwaur3z2_xQ4pfYM5VMrWkQsX4eVruyrZmNwH__M94HUg4aFNnkgqctlRVnLRk_de0KZYrYhHI6wy-foSJ1hxws';

// const Modal = ({ isOpen, onClose }) => {
//   const [estimateParcel, setEstimateParcel] = useState("");
//   const [note, setNote] = useState("");
//   const [pickupAddress, setPickupAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchAddress = async () => {
//       try {
//         const res = await fetch("https://system.packnexa.com/api/user-info", {
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch address");
//         }

//         const data = await res.json();
//         setPickupAddress(data?.user?.address || "");
//       } catch (err) {
//         toast.error("❌ Failed to load pickup address");
//         console.error(err);
//       }
//     };

//     if (isOpen) {
//       fetchAddress();
//     }
//   }, [isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("https://system.packnexa.com/api/pick-up-request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           pickup_address: pickupAddress,
//           estimate_parcel: estimateParcel,
//           note: note,
//         }),
//       });

//       const result = await res.json();

//       if (result.message === "Pickup request add Successfully") {
//         toast.success("✅ Request sent!");
//         setEstimateParcel("");
//         setNote("");
//         onClose();
//       } else {
//         toast.error("❌ Something went wrong");
//       }
//     } catch (error) {
//       toast.error(`❌ ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null; 

//   return (
//     <>
//       <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
//         <div className="bg-white w-[90%] sm:w-[80%] md:w-[35%] rounded-lg shadow-lg transition-transform p-6 relative">
//           <div className="flex justify-between items-center mb-4 border-b pb-2">
//             <h2 className="text-lg font-bold text-primary">Pickup Address</h2>
//             <RxCross1 onClick={onClose} className="cursor-pointer text-2xl" />
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Estimated Parcel</label>
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded mt-1"
//                 value={estimateParcel}
//                 onChange={(e) => setEstimateParcel(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Note</label>
//               <textarea
//                 className="w-full border p-2 rounded mt-1"
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-white py-2 rounded disabled:opacity-50"
//             >
//               {loading ? "Sending..." : "Send Request"}
//             </button>
//           </form>
//         </div>
//       </div>

//       <ToastContainer />
//     </>
//   );
// };

// export default Modal;
