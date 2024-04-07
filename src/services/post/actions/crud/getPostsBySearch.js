import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";
import { getCurrentUser } from "../../../../libs/getCurrentUser";

const currentUser = getCurrentUser();

const payload = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.userToken}
    `,
  },
};

export const getPostsBySearch = createAsyncThunk(
  "post/getPostsBySearch",
  async (options) => {
    const data = await getFetch(`${API_URL}/post/search`, options);
    return data;
  }
);
