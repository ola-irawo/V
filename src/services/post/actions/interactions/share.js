import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const sharePost = createAsyncThunk("post/sharePost", async (payload) => {
  const data = await getFetch(
    `${API_URL}/post/${payload._id}/share`,
    payload.options
  );
  return data;
});
