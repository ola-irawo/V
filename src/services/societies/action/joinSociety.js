import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const joinSociety = createAsyncThunk(
  "society/joinSociety",
  async ({ options, societyId, userId }) => {
    const response = await getFetch(`${API_URL}/society/joinSociety`, options);
    return { response, societyId, userId };
  }
);
