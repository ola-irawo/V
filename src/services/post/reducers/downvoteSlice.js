import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getPostsUserDownvoted } from "../actions/interactions/getPostsUserDownvoted";
import { blockUser } from "../../user/actions/blockUser";
import { muteUser } from "../../user/actions/muteUser";

const downvoteAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = downvoteAdapter.getInitialState({
  status: "idle",
  error: null,
  isDownvoted: false,
});

const downvoteSlice = createSlice({
  name: "downvote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsUserDownvoted.fulfilled, (state, action) => {
        console.log(action.payload);
        downvoteAdapter.upsertMany(state, action.payload);
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // backend needs to remove it for blocked and muted
        console.log(action.payload);
        const filteredMutedUserPost = downvoteAdapter
          .getSelectors()
          .selectAll(state)
          .filter((post) => post.user._id !== action.payload.userId);
        downvoteAdapter.setAll(state, filteredMutedUserPost);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const filteredBlockedUserPost = downvoteAdapter
          .getSelectors()
          .selectAll(state)
          .filter((post) => post.user._id !== action.payload.userId);
        downvoteAdapter.setAll(state, filteredBlockedUserPost);
      });
  },
});

export const {
  selectAll: selectDownvotedPost,
  selectById: selectDownvotedPostId,
  selectIds: selectDownvotedIds,
} = downvoteAdapter.getSelectors((state) => state.downvotedPost);

export default downvoteSlice.reducer;
