import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getUserBio = createAsyncThunk(
  "bio/getUserBio",
  async ({ options, userUid }) => {
    const data = await getFetch(`${API_URL}/bio/${userUid}`, options);
    return data;
  }
);
