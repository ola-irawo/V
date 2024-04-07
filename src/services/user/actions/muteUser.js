import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const muteUser = createAsyncThunk(
  "user/muteUser",
  async ({ options, userUid, postId }) => {
    const response = await getFetch(
      `${API_URL}/user/muteUser/${userUid}`,
      options
    );
    return { response, userId: userUid };
  }
);
