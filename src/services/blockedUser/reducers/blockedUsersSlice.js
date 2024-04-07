import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getBlockedUsers } from "../actions/getBlockedUsers";
import { unblockUser } from "../../user/actions/unblockUser";

const blockedUsersAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});
const initialState = blockedUsersAdapter.getInitialState({
  status: "idle",
  error: null,
});

const blockedUserSlice = createSlice({
  name: "blockedUsers",
  initialState,
  reducers: {
    updateBlockedUserStatus(state, action) {
      state.status = action.payload;
    },
    setBlockUserErrorMessage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlockedUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBlockedUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        blockedUsersAdapter.upsertMany(state, action.payload.blocked);
        console.log(action.payload.blocked);
      })
      .addCase(getBlockedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        blockedUsersAdapter.removeOne(state, action.payload.userId);
      });
  },
});

export const {
  selectAll: selectAllBlockedUsers,
  selectById: selectBlockedUserById,
  selectIds: selectBlockedUsersIds,
} = blockedUsersAdapter.getSelectors((state) => state.blockedUser);

export const { updateBlockedUserStatus, setBlockUserErrorMessage } =
  blockedUserSlice.actions;
export const getBlockedUserStatus = (state) => state.blockedUser.status;
export const getBlockedUserErrorMessage = (state) => state.blockedUser.error;
export default blockedUserSlice.reducer;
