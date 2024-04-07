import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const reportUser = createAsyncThunk(
  "user/reportUser",
  async ({ options, userUid, postId }) => {
    const data = await getFetch(
      `${API_URL}/user/reportUser/${userUid}/${postId}`,
      options
    );
    return data;
  }
);
