import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getRepliesByCommentId } from "../actions/crud/getRepliesByCommentId";
import { upvoteComment } from "../actions/interactions/upvoteComment";
import { downvoteComment } from "../actions/interactions/downvoteComment";
import { shareComment } from "../actions/interactions/shareComment";
import { deleteComment } from "../actions/interactions/deleteComment";

const commentRepliesAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  // sortComparer: (a, b) => b._id.localeCompare(a._id), // Sort by post ID in descending order
});

const initialState = commentRepliesAdapter.getInitialState({
  status: "idle",
  error: null,
});

const commentRepliesSlice = createSlice({
  name: "commentReplies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepliesByCommentId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getRepliesByCommentId.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        commentRepliesAdapter.setAll(state, [action.payload]);
      })
      .addCase(getRepliesByCommentId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(upvoteComment.fulfilled, (state, action) => {
        console.log(action.payload);
        commentRepliesAdapter.updateOne(state, {
          id: action.payload.comment._id,
          changes: action.payload.comment.likes,
        });
      })
      .addCase(downvoteComment.fulfilled, (state, action) => {
        console.log(action.payload);
        commentRepliesAdapter.updateOne(state, {
          id: action.payload.comment._id,
          changes: action.payload.comment.unlikes,
        });
      })
      .addCase(shareComment.fulfilled, (state, action) => {
        console.log(action.payload);
        commentRepliesAdapter.updateOne(state, {
          id: action.payload.comment._id,
          changes: action.payload.comment.shares,
        });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        commentRepliesAdapter.removeOne(state, action.payload.commentId);
      });
  },
});

export const {
  selectAll: selectAllCommentReplies,
  selectById: selectCommentRepliesById,
  selectIds: selectCommentRepliesIds,
} = commentRepliesAdapter.getSelectors((state) => state.commentReplies);

export const getCommentRepliesStatus = (state) => state.commentReplies.status;
export const getCommentRepliesError = (state) => state.commentReplies.error;
export default commentRepliesSlice.reducer;
