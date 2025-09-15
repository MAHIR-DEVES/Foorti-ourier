// "use client";

// import { useEffect, useState,createContext } from "react";
// import toast from "react-hot-toast";

// const MyAccount = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const tokenString = localStorage.getItem("token");
//         if (!tokenString) {
//           toast.error("Token not found");
//           setLoading(false);
//           return;
//         }

//         let token;
//         try {
//           const parsed = JSON.parse(tokenString);
//           token = parsed.token;
//         } catch {
//           token = tokenString;
//         }

//         if (!token) {
//           toast.error("Invalid token format");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch("/api/user-info", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });

//         const data = await response.json();
        

//         if (!response.ok) {
//           const errMsg = data.error || "API fetch failed";
//           throw new Error(errMsg);
//         }

//         if (!data.user) {
//           toast.error("User data not found in API response");
//           setLoading(false);
//           return;
//         }

//         setUser(data.user);
//         toast.success("User loaded successfully");
//       } catch (error) {
//         console.error("Error fetching user info:", error);
//         toast.error(`Failed to fetch user info: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) return <div className="text-gray-600">Loading user info...</div>;
//   if (!user) return <div className="text-red-600">User data not found.</div>;

//   const userInfo = [
//     { label: "User ID", value: user.id },
//     { label: "Name", value: user.name },
//     { label: "Email", value: user.email },
//     { label: "Mobile", value: user.mobile },
//     { label: "Address", value: user.address },
//   ];

//   return (
//     <div className="bg-white overflow-hidden shadow rounded-lg">
//       <div className="px-4 py-5 sm:px-6">
//         <h3 className="text-lg font-medium text-gray-900">User Profile</h3>
//         <p className="mt-1 text-sm text-gray-500">
//           Basic information about the user.
//         </p>
//       </div>
//       <div className="border-t border-gray-200 px-4 py-5">
//         <dl className="sm:divide-y sm:divide-gray-200">
//           {userInfo.map((item, index) => (
//             <div
//               key={index}
//               className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
//             >
//               <dt className="text-sm font-medium text-gray-500">
//                 {item.label}
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
//                 {item.value || "N/A"}
//               </dd>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </div>
//   );
// };

// export default MyAccount;





"use client";
import { useContext } from "react";
import { UserContext } from "@/app/api/UserProvider/UserProvider";


const MyAccount = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div className="text-gray-600">Loading user info...</div>;
  if (!user) return <div className="text-red-600">User data not found.</div>;

  const userInfo = [
    { label: "User ID", value: user.id },
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Mobile", value: user.mobile },
    { label: "Address", value: user.address },
  ];

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">User Profile</h3>
        <p className="mt-1 text-sm text-gray-500">Basic information about the user.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5">
        <dl className="sm:divide-y sm:divide-gray-200">
          {userInfo.map((item, index) => (
            <div key={index} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{item.value || "N/A"}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default MyAccount;
