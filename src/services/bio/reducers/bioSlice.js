import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createBio } from "../actions/createBio";
import { updateBio } from "../actions/updateBio";
import { getUserBio } from "../actions/getUserBio";
import { getUserBioById } from "../actions/getBioByUserId";
import { getAllUserBios } from "../actions/getAllUserBios";

const bioAdapater = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = bioAdapater.getInitialState({
  status: "idle",
  error: null,
  userBio: [],
});

const bioSlice = createSlice({
  name: "bio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBio.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createBio.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        bioAdapater.addOne(state, action.payload);
      })
      .addCase(createBio.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bioAdapater.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
      })
      .addCase(getUserBio.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userBio = action.payload;
        bioAdapater.upsertOne(state, action.payload);
      })
      .addCase(getUserBioById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bioAdapater.upsertOne(state, action.payload);
      })
      .addCase(getAllUserBios.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUserBios.fulfilled, (state, action) => {
        state.status = "fulfilled";
        bioAdapater.upsertMany(state, action.payload);
      })
      .addCase(getAllUserBios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectBio,
  selectById: selectBioById,
  selectIds: selectBioIds,
} = bioAdapater.getSelectors((state) => state.bio);

export const getBioStatus = (state) => state.bio.status;
export const getBioError = (state) => state.bio.error;
export const getBio = (state) => state.bio.userBio;
export default bioSlice.reducer;
