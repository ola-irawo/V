import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload) => {
    const response = await getFetch(`${API_URL}/post/createPost`, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
