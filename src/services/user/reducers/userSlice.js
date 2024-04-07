import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getUserById } from "../actions/getUserById";
import { getAllUser } from "../actions/getAllUser";
import { muteUser } from "../actions/muteUser";
import { unmuteUser } from "../actions/unmuteUser";
import { blockUser } from "../actions/blockUser";
import { unblockUser } from "../actions/unblockUser";
import { reportUser } from "../actions/reportUser";

const userAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = userAdapter.getInitialState({
  status: "idle",
  error: null,
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        userAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload);
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "fulfilled";
        userAdapter.removeOne(state, action.payload.userId);
        // userAdapter.updateOne(state);
        // userAdapter.updateOne(state, {
        //   id: action.payload._id,
        //   changes: action.payload,
        // });
      })
      .addCase(unmuteUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // userAdapter.removeOne(state, action.payload._id);
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // userAdapter.updateOne(state, action.payload);
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(reportUser.fulfilled, (state, action) => {
        // userAdapter.updateOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllUser,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => state.users);

export const getUserStatus = (state) => state.users.status;
export const getUserErrorMessage = (state) => state.users.error;
export default userSlice.reducer;
