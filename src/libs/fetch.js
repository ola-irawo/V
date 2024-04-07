// Default options for the fetch request
const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// Function to construct the URL with optional ID and parameters
const constructURL = (url, id, params) => {
  let urlWithParams = url;
  if (id) {
    urlWithParams += `/${id}`;
  }
  if (params) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    if (queryString) {
      urlWithParams += `?${queryString}`;
    }
  }
  return urlWithParams;
};

/**
 * Perform a fetch request to the specified URL with optional parameters.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - Additional options for the fetch request.
 * @param {string} [id] - An optional identifier to append to the URL.
 * @param {Object} [params={}] - Optional query parameters to include in the URL.
 * @param {string} [responseFormat='json'] - The expected format of the response data ('json', 'text', or 'bytes').
 * @returns {Promise} A Promise containing the fetched data or an error object.
 */

export const getFetch = async (
  url,
  options,
  id,
  params = {},
  responseFormat = "json"
) => {
  const constructedURL = constructURL(url, id, params);
  const mergedOptions = { ...defaultOptions, ...options };
  console.log("sending");

  try {
    const response = await fetch(constructedURL, mergedOptions);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    let data;
    switch (responseFormat) {
      case "json":
        data = await response.json();
        break;
      case "text":
        data = await response.text();
        break;
      case "bytes":
        data = await response.arrayBuffer();
        break;
      default:
        throw new Error(`Invalid response format: ${responseFormat}`);
    }

    console.log(data);
    return data;
  } catch (error) {
    // if (error.status === 404) {
    //   return {
    //     error: `Oops! The page you are looking for could not be found.`,
    //   };
    //   console.error(`Resource not found: ${url}`);
    // } else if (error.status === 500) {
    //   return {
    //     error: `Sorry, we're experiencing technical difficulties at the moment. We're aware of the problem and are working to fix it. Please try again later.`,
    //   };
    //   console.error(`Internal server error: ${url} `);
    // } else {
    //   return {
    //     error: `Oops! Something went wrong while trying to fetch the data. Please try again later.`,
    //   };
    //   console.error(`General fetch error: ${error.message}`);
    // }
    return { error };
  }
};

// import React, { useState, useEffect } from 'react';
// import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// const useAuth = () => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         setCurrentUser(user);
//       } else {
//         setCurrentUser(null);
//       }
//     });
//   }, []);

//   const login = async (email, password) => {
//     const auth = getAuth();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setCurrentUser(auth.currentUser);
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   const logout = async () => {
//     const auth = getAuth();
//     await signOut(auth);
//     setCurrentUser(null);
//   };

//   return { currentUser, login, logout };
// };

// export default useAuth;
