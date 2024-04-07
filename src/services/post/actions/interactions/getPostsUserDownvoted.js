import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const getPostsUserDownvoted = createAsyncThunk(
  "post/getPostsUserDownvoted",
  async ({ options, userUid }) => {
    const data = await getFetch(
      `${API_URL}/post/${userUid}/downvotedPosts`,
      options
    );

    return data;
  }
);
