import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchPosts } from "../actions/crud/fetchPosts";
import { createPost } from "../actions/crud/createPost";
import { deletePost } from "../actions/crud/deletePost";
import { updatePost } from "../actions/crud/updatePost";
import { upvotePost } from "../actions/interactions/upvote";
import { downvotePost } from "../actions/interactions/downvote";
import { sharePost } from "../actions/interactions/share";
import { getPostsByUser } from "../../user/actions/getPostsByUser";
import { getPostsBySearch } from "../actions/crud/getPostsBySearch";
import { postToBookmark } from "../actions/interactions/bookmarkPost";
import { reportPost } from "../actions/interactions/reportPost";
import { muteUser } from "../../user/actions/muteUser";
import { blockUser } from "../../user/actions/blockUser";

const postAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => b._id.localeCompare(a._id), // Sort by post ID in descending order
});

const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null,
  userPosts: [],
  searchPosts: [],
  up: [],
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostStatus(state, action) {
      state.status = action.payload;
    },
    setPostError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error.message);
        state.error = action.error.message;
        // if (action.error.message.includes(401)) {
        //   localStorage.removeItem("token");
        // }
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        if (action.payload) {
          postAdapter.addOne(state, action.payload, { prepend: true });
        } else {
          console.error("createPost.fulfilled payload is null or undefined");
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.removeOne(state, action.payload.postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "fulilled";
        postAdapter.updateOne(state, action.payload);
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.searchPosts.push(action.payload);
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(postToBookmark.fulfilled, (state, action) => {
        state.status = "fulfilled";
        postAdapter.updateOne(state, action.payload.response);
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        console.log(action.payload);
        // postAdapter.updateOne(state, action.payload);
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const filteredMutedUserPost = postAdapter
          .getSelectors()
          .selectAll(state)
          .filter((post) => post.user._id !== action.payload.userId);
        postAdapter.setAll(state, filteredMutedUserPost);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const filteredBlockedUserPost = postAdapter
          .getSelectors()
          .selectAll(state)
          .filter((post) => post.user._id !== action.payload.userId);
        postAdapter.setAll(state, filteredBlockedUserPost);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postAdapter.getSelectors((state) => state.posts);

export const { updatePostStatus, setPostError } = postsSlice.actions;

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const getUserPosts = (state) => state.posts.userPosts;
export const getSearchPost = (state) => state.posts.searchPosts;
export const getUp = (state) => state.posts.up;
export default postsSlice.reducer;
