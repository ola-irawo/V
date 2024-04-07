import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { toggleMention } from "../actions/notificationSettingAction/toggleMention";
import { toggleCommentNotfication } from "../actions/notificationSettingAction/toggleCommentNotification";
import { togglePostUpvoteNotifications } from "../actions/notificationSettingAction/togglePostUpvoteNotifications";
import { toggleReplyNotifications } from "../actions/notificationSettingAction/toggleReplyNotifications";
import { getNotificationsActiveState } from "../actions/notificationSettingAction/getNotificationsActiveState";
import { toggleCommentUpvoteNotifications } from "../actions/notificationSettingAction/toggleCommentUpvoteNotifications";

const notificationSettingAdapter = createEntityAdapter({});
const initialState = notificationSettingAdapter.getInitialState({
  status: "idle",
  error: null,
});

const notificationSettingSlice = createSlice({
  name: "notficationSetting",
  initialState,
  reducers: {
    updateNotificationSettingStatus(state, action) {
      state.status = action.payload;
    },
    setNotificationSettingErrorMessgae(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleMention.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(toggleMention.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(toggleCommentNotfication.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(togglePostUpvoteNotifications.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(toggleReplyNotifications.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(toggleCommentUpvoteNotifications.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(getNotificationsActiveState.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getNotificationsActiveState.fulfilled, (state, action) => {
        state.status = "fulfilled";
        notificationSettingAdapter.upsertMany(state, [action.payload]);
      })
      .addCase(getNotificationsActiveState.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllNotificationsState,
  selectById,
  selectIds,
} = notificationSettingAdapter.getSelectors(
  (state) => state.notificationSetting
);

export const {
  updateNotificationSettingStatus,
  setNotificationSettingErrorMessgae,
} = notificationSettingSlice.actions;

export const getNotficationSettingStatus = (state) =>
  state.notificationSetting.status;
export const getNotficationSettingErrorMessage = (state) =>
  state.notificationSetting.error;
export default notificationSettingSlice.reducer;
