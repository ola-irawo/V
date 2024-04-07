import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../api";
import { getFetch } from "../../../../libs/fetch";

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (payload, id) => {
    const data = await getFetch(`${API_URL}/updatePost/${id}`, payload);
    return data;
  }
);
