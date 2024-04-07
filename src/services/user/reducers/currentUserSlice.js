import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../actions/getUserById";
import { muteUser } from "../actions/muteUser";

const currentUserAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});
const initialState = currentUserAdapter.getInitialState({
  status: "idle",
  error: null,
});

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getUserById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        currentUserAdapter.upsertMany(state, [action.payload]);
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        console.log(action.payload.id);
        state.status = "fulfilled";
        const currentUser = currentUserAdapter
          .getSelectors()
          .selectById(state, action.payload.id);
        const allIds = currentUserAdapter.getSelectors().selectIds(state);
        const entityIdArray = Array.from(allIds);
        console.log("All entity IDs:", entityIdArray);
        // if (currentUser && currentUser.muted) {
        //   // Add the user ID to the muted users array if it's not already muted
        //   if (!currentUser.muted.includes(action.payload.id)) {
        //     currentUser.muted.push(action.payload.id);
        //   }
        // }

        // // Update the state using currentUserAdapter
        // currentUserAdapter.updateOne(state, currentUser);
      });
  },
});

export const { selectAll: selectCurrentUser } = currentUserAdapter.getSelectors(
  (state) => state.currentUser
);
export default currentUserSlice.reducer;
