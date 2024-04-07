import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";

export const getPostsByUser = createAsyncThunk(
  "posts/postsByUser",
  async ({ options, _id }) => {
    const data = await getFetch(`${API_URL}/post/postsByUser/${_id}`, options);
    console.log(data);
    return data;
  }
);
