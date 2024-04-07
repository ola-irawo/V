import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const exitSociety = createAsyncThunk(
  "society/exitSociety",
  async ({ options, societyId, userId }) => {
    const response = await getFetch(`${API_URL}/society/exitSociety`, options);
    return { response, societyId, userId };
  }
);
