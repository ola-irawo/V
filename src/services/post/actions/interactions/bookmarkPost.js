import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const postToBookmark = createAsyncThunk(
  "post/postToBookmark",
  async ({ options, userUid, postId }) => {
    const response = await getFetch(
      `${API_URL}/post/${userUid}/bookmarkPost/${postId}`,
      options
    );
    return { response, postId };
  }
);
