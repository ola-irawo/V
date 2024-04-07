import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getUserNotification } from "../actions/getUserNotification";

const notificationAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});
const initialState = notificationAdapter.getInitialState({
  status: "idle",
  error: null,
});

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotificationStatus(state, action) {
      state.status = action.payload;
    },
    setNotificationErrorMessage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserNotification.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserNotification.fulfilled, (state, action) => {
        state.status = "fulfilled";
        notificationAdapter.upsertMany(state, action.payload?.notifications);
      })
      .addCase(getUserNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors((state) => state.notification);

export const { updateNotificationStatus, setNotificationErrorMessage } =
  notificationSlice.actions;
export const getNotificationStatus = (state) => state.notification.status;
export const getNotificationError = (state) => state.notification.error;
export default notificationSlice.reducer;
