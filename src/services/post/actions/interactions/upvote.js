import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const upvotePost = createAsyncThunk(
  "post/upvotePost",
  async (payload) => {
    const data = await getFetch(`${API_URL}/post/upUpvote`, payload);
    return data;
  }
);
