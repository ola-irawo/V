import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { changeEmail } from "../actions/accountSettingAction/changeEmail";
import { changePassword } from "../actions/accountSettingAction/changePassword";

const accountSettingAdapter = createEntityAdapter({});
const initialState = accountSettingAdapter.getInitialState({
  status: "idle",
  error: null,
});

const accountSettingSlice = createSlice({
  name: "accountSetting",
  initialState,
  reducers: {
    updateAccountSettingStatus(state, action) {
      state.status = action.payload;
    },
    setAccountSettingErrorMessgae(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeEmail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.status = "fulfilled";
        console.log(action.payload);
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAll,
  selectById,
  selectIds,
} = accountSettingAdapter.getSelectors((state) => state.accountSetting);

export const { updateAccountSettingStatus, setAccountSettingErrorMessgae } =
  accountSettingSlice.actions;
export const getAccountSettingStatus = (state) => state.accountSetting.status;
export const getAccountSettingErrorMessage = (state) =>
  state.accountSetting.error;
export default accountSettingSlice.reducer;
