import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createComment } from "../actions/crud/createComment";

const commentAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => b._id.localeCompare(a._id), // Sort by post ID in descending order
});

const initialState = commentAdapter.getInitialState({
  status: "idle",
  error: null,
  postComments: [],
  replies: {},
});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        commentAdapter.addOne(state, action.payload, { prepend: true });
      })
      .addCase(createComment.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentAdapter.getSelectors((state) => state.comment);

export const getPostComment = (state) => state.comment.postComments;
export const getReplies = (state) => state.comment.replies;
export default commentSlice.reducer;
