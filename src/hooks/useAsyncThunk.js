import React from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

const useAsyncThunk = (actionType, thunkCreator) => {
  const dispatch = useDispatch();

  const createAsyncAction = (payload) => {
    return dispatch(thunkCreator(payload));
  };

  const handleLoading = (loading) => {
    // Update loading state in your UI
  };

  const handleError = (error) => {
    // Display error message or handle error in your UI
  };

  const handleSuccess = (result) => {
    // Update data in your UI based on the result
  };

  return {
    createAsyncAction,
    handleLoading,
    handleError,
    handleSuccess,
  };
};

export default useAsyncThunk;

const fetchUserData = createAsyncThunk("fetchUserData", async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
});

// const MyComponent = () => {
//   const { createAsyncAction, handleLoading, handleError, handleSuccess } = useAsyncThunk('fetchUserData', fetchUserData);

//   const handleFetchUserData = () => {
//     const userId = 123;
//     createAsyncAction(userId);
//   };

//   return (
//     <div>
//       {loading && <p>Loading user data...</p>}
//       {error && <p>Error: {error}</p>}
//       {userData && (
//         <div>
//           <h2>User Name: {userData.name}</h2>
//           <p>User Email: {userData.email}</p>
//         </div>
//       )}
//       <button onClick={handleFetchUserData}>Fetch User Data</button>
//     </div>
//   );
// };

// export default MyComponent;
