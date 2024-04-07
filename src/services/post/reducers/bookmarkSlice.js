import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getUserBookmarks } from "../actions/interactions/getUserBookmarks";
import { upvotePost } from "../actions/interactions/upvote";
import { sharePost } from "../actions/interactions/share";
import { downvotePost } from "../actions/interactions/downvote";
import { deletePost } from "../actions/crud/deletePost";
import { postToBookmark } from "../actions/interactions/bookmarkPost";

const bookmarkAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => b._id.localeCompare(a._id),
});

const initialState = bookmarkAdapter.getInitialState({
  status: "idle",
  error: null,
});

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    updateBookmarkStatus(state, action) {
      state.status = action.payload;
    },
    setBookmarkErrorMessage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserBookmarks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserBookmarks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bookmarkAdapter.upsertMany(state, action.payload);
      })
      .addCase(getUserBookmarks.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error.message);
        state.error = action.error.message;
      })
      .addCase(postToBookmark.fulfilled, (state, action) => {
        state.status = "fulfilled";
        if (state.entities[action.payload.postId]) {
          bookmarkAdapter.removeOne(state, action.payload.postId);
          return;
        }
        console.log(action.payload);
        bookmarkAdapter.updateOne(state, action.payload);
      })
      .addCase(upvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bookmarkAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(downvotePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        bookmarkAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bookmarkAdapter.updateOne(state, {
          id: action.payload.post._id,
          changes: action.payload.post,
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bookmarkAdapter.removeOne(state, action.payload.postId);
      });
  },
});

export const {
  selectAll: selectAllBookmarks,
  selectById: selectBookmarkById,
  selectIds: selectBookmarksId,
  selectTotal,
} = bookmarkAdapter.getSelectors((state) => state.bookmark);

export const { updateBookmarkStatus, setBookmarkErrorMessage } =
  bookmarkSlice.actions;
export const getBookmarkStatus = (state) => state.bookmark.status;
export const getBookmarkError = (state) => state.bookmark.error;
export default bookmarkSlice.reducer;
