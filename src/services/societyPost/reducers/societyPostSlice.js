import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getSocietyPosts } from "../actions/getSocietyPosts";
import { sharePost } from "../../post/actions/interactions/share";
import { downvotePost } from "../../post/actions/interactions/downvote";
import { upvotePost } from "../../post/actions/interactions/upvote";
import { deletePost } from "../../post/actions/crud/deletePost";
import { createPost } from "../../post/actions/crud/createPost";

const societyPostAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => b._id.localeCompare(a._id), // Sort by post ID in descending order
});

const initialState = societyPostAdapter.getInitialState({
  status: "idle",
  error: null,
});

const societyPostSlice = createSlice({
  name: "societyPost",
  initialState,
  reducers: {
    updateSocietyPostStatus(state, action) {
      state.status = action.payload;
    },
    setSocietyPostErrorMesssage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSocietyPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSocietyPosts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        societyPostAdapter.setAll(state, {});
        societyPostAdapter.setAll(state, action.payload.posts);
      })
      .addCase(getSocietyPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        societyPostAdapter.setAll(state, {});
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        if (action.payload) {
          societyPostAdapter.addOne(state, action.payload, {
            prepend: true,
          });
        } else {
          console.error("createPost.fulfilled payload is null or undefined");
        }
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        societyPostAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        societyPostAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        societyPostAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        societyPostAdapter.removeOne(state, action.payload.postId);
      });
  },
});

export const {
  selectAll: selectSocietyPosts,
  selectById: selectSocietyPostById,
  selectIds: selectSocietyPostIds,
} = societyPostAdapter.getSelectors((state) => state.societyPost);

export const { updateSocietyPostStatus, setSocietyPostErrorMesssage } =
  societyPostSlice.actions;
export const getSocietyPostStatus = (state) => state.societyPost.status;
export const getSocietyPostErrorMessage = (state) => state.societyPost.error;
export default societyPostSlice.reducer;
