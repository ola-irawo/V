import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { getCurrentUser } from "../../../libs/getCurrentUser";

const currentUser = getCurrentUser();

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${currentUser.userToken}`,
  },
};

export const getMutedUsers = createAsyncThunk(
  "mutedUsers/getMutedUsers",
  async () => {
    const response = await getFetch(
      `${API_URL}/user/${currentUser.userUid}/muted`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
