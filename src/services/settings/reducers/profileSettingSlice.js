import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const profileSettingAdapater = createEntityAdapter({});
const initialState = profileSettingAdapater.getInitialState({
  status: "idle",
  error: null,
});

const profileSettingSlice = createSlice({
  name: "profileSetting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {
  selectAll: selectAll,
  selectById,
  selectIds,
} = profileSettingAdapater.getSelectors((state) => state.profileSettingSlice);
export default profileSettingSlice.reducer;
