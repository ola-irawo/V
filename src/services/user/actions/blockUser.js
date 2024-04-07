import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const blockUser = createAsyncThunk(
  "user/blockUser",
  async ({ options, userUid }) => {
    const response = await getFetch(
      `${API_URL}/user/blockUser/${userUid}`,
      options
    );
    return { response, userId: userUid };
  }
);
