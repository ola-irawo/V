import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";
import { getCurrentUser } from "../../../../libs/getCurrentUser";

const currentUser = getCurrentUser();

const payload = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.userToken}
    `,
  },
};

/**
 * Async thunk function to fetch posts from the server.
 * @returns {Promise} A promise containing the fetched posts.
 */

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await getFetch(`${API_URL}/post/getAllPosts`, payload);
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
});
