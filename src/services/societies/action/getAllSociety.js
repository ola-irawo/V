import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { getCurrentUser } from "../../../libs/getCurrentUser";

const currentUser = getCurrentUser();

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.userToken}
    `,
  },
};

export const getAllSociety = createAsyncThunk(
  "society/getAllSociety",
  async () => {
    const response = await getFetch(
      `${API_URL}/society/getAllSociety`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
