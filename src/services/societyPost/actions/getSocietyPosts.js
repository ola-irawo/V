import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getSocietyPosts = createAsyncThunk(
  "societyPost/getSocietyPosts",
  async ({ options, societyId }) => {
    const response = await getFetch(
      `${API_URL}/society/getSocietyPosts/${societyId}`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
