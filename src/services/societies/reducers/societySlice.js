import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllSociety } from "../action/getAllSociety";
import { joinSociety } from "../action/joinSociety";
import { getSocietyById } from "../action/getSocietyById";
import { getUserSocieties } from "../action/getUserSocieties";
import { getSocietyPosts } from "../../societyPost/actions/getSocietyPosts";
import { exitSociety } from "../action/exitSociety";

const societyAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = societyAdapter.getInitialState({
  status: "idle",
  error: null,
  joinedSocieties: [],
  societyPosts: [],
});

const societySlice = createSlice({
  name: "society",
  initialState,
  reducers: {
    updateSocietyStatus(state, action) {
      state.status = action.payload;
    },
    setSocietyErrorMessage(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSociety.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllSociety.fulfilled, (state, action) => {
        state.status = "fulfilled";
        societyAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllSociety.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(joinSociety.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const currentSocietyToJoin = societyAdapter
          .getSelectors()
          .selectAll(state)
          .filter((society) => society._id === action.payload.societyId);

        const updatedSocieties = currentSocietyToJoin.map((society) => ({
          ...society,
          societyMembers: [...society.societyMembers, action.payload.userId], // Add userId to societyMembers
        }));
        societyAdapter.upsertMany(state, updatedSocieties);
      })
      .addCase(exitSociety.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const currentSocietyToExit = societyAdapter
          .getSelectors()
          .selectAll(state)
          .filter((society) => society._id === action.payload.societyId);

        const updatedSocieties = currentSocietyToExit.map((society) => {
          // Check if the societyMembers array includes the userId
          if (society.societyMembers.includes(action.payload.userId)) {
            // Create a new object with the same properties as the current society,
            // but with a new societyMembers array that excludes the userId
            return {
              ...society,
              societyMembers: society.societyMembers.filter(
                (memberId) => memberId !== action.payload.userId
              ),
            };
          } else {
            // If the society does not need modification, return it as is
            return society;
          }
        });
        societyAdapter.upsertMany(state, updatedSocieties);
      })
      // .addCase(getSocietyById.fulfilled, (state, action) => {
      //   state.status = "fulfilled";
      //   societyAdapter.upsertMany(state, action.payload);
      // })
      .addCase(getUserSocieties.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.joinedSocieties = [...action.payload];
      });
  },
});

export const {
  selectAll: selectAllSociety,
  selectById: selectSocietyById,
  selectIds: selectSocietyIds,
} = societyAdapter.getSelectors((state) => state.societies);

export const { updateSocietyStatus, setSocietyErrorMessage } =
  societySlice.actions;
export const getSoceityStatus = (state) => state.societies.status;
export const getSoceityErrorMessage = (state) => state.societies.error;
export const getUserJoinedSocieties = (state) =>
  state.societies.joinedSocieties;
export default societySlice.reducer;
