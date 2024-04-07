import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getSocietyById = createAsyncThunk(
  "societyPost/getSocietyById",
  async ({ options, societyId }) => {
    const data = await getFetch(
      `${API_URL}/society/getSocietyById/${societyId}`,
      options
    );
    console.log(data);
    return data;
  }
);
