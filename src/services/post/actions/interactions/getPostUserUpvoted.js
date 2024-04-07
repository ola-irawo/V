import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const getPostUserUpvoted = createAsyncThunk(
  "post/getPostUserUpvoted",
  async ({ options, userUid }) => {
    const data = await getFetch(
      `${API_URL}/post/${userUid}/upvotedPosts`,
      options
    );

    return data;
  }
);
