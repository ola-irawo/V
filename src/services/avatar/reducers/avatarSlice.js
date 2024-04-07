import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllAvatars } from "../actions/getAllAvatars";

const avatarAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = avatarAdapter.getInitialState({
  status: "idle",
  error: null,
});

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAvatars.fulfilled, (state, action) => {
      //   console.log(action.payload);
      avatarAdapter.upsertMany(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllAvatars,
  selectById: selectAvatarById,
  selectIds: selectAvatarsIds,
} = avatarAdapter.getSelectors((state) => state.avatar);

export default avatarSlice.reducer;
