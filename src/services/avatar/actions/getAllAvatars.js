import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getAllAvatars = createAsyncThunk(
  "avatar/getAllAvatars",
  async (options) => {
    const data = await getFetch(`${API_URL}/avatar/getAllAvatars`, options);
    return data;
  }
);
