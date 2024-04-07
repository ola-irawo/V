import { getFetch } from "../../../libs/fetch";
import { API_URL } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const followUser = createAsyncThunk(
  "user/followUser",
  async ({ options, _id }) => {
    const data = await getFetch(`${API_URL}/user/followUser/${_id}`, options);
    console.log(_id);
    return data;
  }
);
