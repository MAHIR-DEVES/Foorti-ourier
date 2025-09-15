// "use client";

// import { createContext, useState, useEffect } from "react";
// import toast from "react-hot-toast";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const tokenString = localStorage.getItem("token");
//         alert(tokenString)

//         if (!tokenString) {
//           toast.error("Token not found");
//           setLoading(false);
//           return;
//         }

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

//   return (
//     <UserContext.Provider value={{ user, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

'use client';

import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) {
          toast.error('Token not found');
          setLoading(false);
          return;
        }

        let token;
        try {
          const parsed = JSON.parse(tokenString);
          token = parsed.token;
        } catch (e) {
          token = tokenString;
        }

        if (!token) {
          toast.error('Invalid token format');
          setLoading(false);
          return;
        }

        console.log('Using Token:', token);

        const response = await fetch('/api/user-info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          const errMsg = data?.error || data?.message || 'API fetch failed';
          toast.error(errMsg);
          setLoading(false);
          return;
        }

        if (!data.user) {
          toast.error('User data not found in API response');
          setLoading(false);
          return;
        }

        setUser(data.user);
        toast.success('User loaded successfully');
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error(`Failed to fetch user info: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
