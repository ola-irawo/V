import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (payload, userId) => {
    const data = getFetch(`${API_URL}/user/unfollowUser/${userId}`);
    return data;
  }
);
