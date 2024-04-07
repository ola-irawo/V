import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (options) => {
    const data = await getFetch(`${API_URL}/comment/createComment`, options);
    return data;
  }
);
