import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const updateBio = createAsyncThunk(
  "bio/updateBio",
  async ({ options, userUid }) => {
    const data = await getFetch(`${API_URL}/bio/updateBio/${userUid}`, options);
    return data;
  }
);
