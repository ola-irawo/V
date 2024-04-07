import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getUserSocieties = createAsyncThunk(
  "society/getUserSocieties",
  async ({ options, userUid }) => {
    const data = await getFetch(
      `${API_URL}/society/getUserSocieties/${userUid}`,
      options
    );
    return data;
  }
);
