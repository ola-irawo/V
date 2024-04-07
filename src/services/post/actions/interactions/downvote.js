import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const downvotePost = createAsyncThunk(
  "post/dowvotePost",
  async (payload) => {
    const data = await getFetch(`${API_URL}/post/upDownvote`, payload);
    return data;
  }
);
