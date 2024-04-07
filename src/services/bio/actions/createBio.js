import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const createBio = createAsyncThunk("bio/createBio", async (options) => {
  const data = await getFetch(`${API_URL}/bio/createBio`, options);
  return data;
});
