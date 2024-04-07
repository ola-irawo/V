import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getPostUserUpvoted } from "../actions/interactions/getPostUserUpvoted";
import { blockUser } from "../../user/actions/blockUser";
import { muteUser } from "../../user/actions/muteUser";

const upvoteAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = upvoteAdapter.getInitialState({
  status: "idle",
  error: "null",
  isUpvoted: false,
});

const upvoteSlice = createSlice({
  name: "upvote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostUserUpvoted.fulfilled, (state, action) => {
        console.log(action.payload);
        upvoteAdapter.upsertMany(state, action.payload);
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // backend needs to remove it for blocked and muted
        console.log(action.payload);
        const filteredMutedUserPost = upvoteAdapter
          .getSelectors()
          .selectAll(state)
          .filter((post) => post.user._id !== action.payload.userId);
        upvoteAdapter.setAll(state, filteredMutedUserPost);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const filteredBlockedUserPost = upvoteAdapter
          .getSelectors()
          .selectAll(state)
          .filter((post) => post.user._id !== action.payload.userId);
        upvoteAdapter.setAll(state, filteredBlockedUserPost);
      });
  },
});

export const {
  selectAll: selectAllUpvotedPosts,
  selectById: selectUpvotedPostById,
  selectEntities: selectUpvotedPostEntities,
  selectIds: selectUpvotedPostIds,
} = upvoteAdapter.getSelectors((state) => state.upvotedPost);

export default upvoteSlice.reducer;
