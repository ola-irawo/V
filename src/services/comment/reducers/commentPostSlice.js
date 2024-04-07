import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllCommentsByPostId } from "../actions/crud/getAllCommentsByPostId";
import { upvoteComment } from "../actions/interactions/upvoteComment";
import { downvoteComment } from "../actions/interactions/downvoteComment";
import { shareComment } from "../actions/interactions/shareComment";
import { deleteComment } from "../actions/interactions/deleteComment";
import { createComment } from "../actions/crud/createComment";

const postFeedbackAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => b._id.localeCompare(a._id), // Sort by post ID in descending order
});

const initialState = postFeedbackAdapter.getInitialState({
  status: "idle",
  error: null,
});

const postFeedbackSlice = createSlice({
  name: "commentPost",
  initialState,
  reducers: {
    updatePostFeebackStatus(state, action) {
      state.status = action.payload;
    },
    setPostFeedbackError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentsByPostId.pending, (state, action) => {
        state.status = "loading";
        // postFeedbackAdapter.setAll(state, {});
      })
      .addCase(getAllCommentsByPostId.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload.comments);
        const allComments = postFeedbackAdapter.getSelectors().selectAll(state);
        // console.log(allComments);
        if (action.payload) {
          postFeedbackAdapter.setAll(state, action.payload.comments);
        }
      })
      .addCase(getAllCommentsByPostId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        const allComments = postFeedbackAdapter.getSelectors().selectAll(state);
        console.log(allComments);
        // postFeedbackAdapter.upsertMany(state, [
        //   action.payload,
        //   ...(allComments.length > 0 ? allComments : []),
        // ]);
      })
      .addCase(upvoteComment.fulfilled, (state, action) => {
        console.log(action.payload);
        postFeedbackAdapter.updateOne(state, {
          id: action.payload.comment._id,
          changes: action.payload.comment,
        });
      })
      .addCase(downvoteComment.fulfilled, (state, action) => {
        console.log(action.payload);
        postFeedbackAdapter.updateOne(state, {
          id: action.payload.comment._id,
          changes: action.payload.comment,
        });
      })
      .addCase(shareComment.fulfilled, (state, action) => {
        console.log(action.payload);
        postFeedbackAdapter.updateOne(state, {
          id: action.payload.comment._id,
          changes: action.payload.comment,
        });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        postFeedbackAdapter.removeOne(state, action.payload.commentId);
      });
  },
});

export const {
  selectAll: selectAllPostFeedback,
  selectById: selectPostFeedbackById,
  selectIds: selectPostFeedbackIds,
} = postFeedbackAdapter.getSelectors((state) => state.postFeedback);

export const { updatePostFeebackStatus, setPostFeedbackError } =
  postFeedbackSlice.actions;

export const getPostFeedbackStatus = (state) => state.postFeedback.status;
export const getPostFeedbackError = (state) => state.postFeedback.error;
export default postFeedbackSlice.reducer;
