import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getMutedUsers } from "../actions/getMutedUsers";
import { unmuteUser } from "../../user/actions/unmuteUser";

const mutedUsersAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});
const initialState = mutedUsersAdapter.getInitialState({
  status: "idle",
  error: null,
});

const mutedUserSlice = createSlice({
  name: "mutedUsers",
  initialState,
  reducers: {
    updateMutedUserStatus(state, action) {
      state.status = action.payload;
    },
    setMutedUserErrorMessage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMutedUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMutedUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        mutedUsersAdapter.upsertMany(state, action.payload.muted);
      })
      .addCase(getMutedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unmuteUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
        mutedUsersAdapter.removeOne(state, action.payload._id);
      });
  },
});

export const {
  selectAll: selectAllMutedUsers,
  selectById: selectMutedUserById,
  selectIds: selectMutedUsersIds,
} = mutedUsersAdapter.getSelectors((state) => state.mutedUser);

export const { updateMutedUserStatus, setMutedUserErrorMessage } =
  mutedUserSlice.actions;
export const getMutedUserStatus = (state) => state.mutedUser.status;
export const getMutedUserErrorMessage = (state) => state.mutedUser.error;
export default mutedUserSlice.reducer;
