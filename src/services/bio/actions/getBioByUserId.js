import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getUserBioById = createAsyncThunk(
  "bio/getBioByUserId",
  async ({ options, userUid }) => {
    const data = await getFetch(
      `${API_URL}/bio/getBioByUserId/${userUid}`,
      options
    );
    return data;
  }
);
