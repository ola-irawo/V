import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authentication/reducers/authSlice.js";
import postSlice from "../services/post/reducers/postSlice.js";
import userSlice from "../services/user/reducers/userSlice.js";
import societySlice from "../services/societies/reducers/societySlice.js";
import bioSlice from "../services/bio/reducers/bioSlice.js";
import societyPostSlice from "../services/societyPost/reducers/societyPostSlice.js";
import downvoteSlice from "../services/post/reducers/downvoteSlice.js";
import upvoteSlice from "../services/post/reducers/upvoteSlice.js";
import bookmarkSlice from "../services/post/reducers/bookmarkSlice.js";
import avatarSlice from "../services/avatar/reducers/avatarSlice.js";
import commentSlice from "../services/comment/reducers/commentSlice.js";
import postFeedbackSlice from "../services/comment/reducers/commentPostSlice.js";
import commentRepliesSlice from "../services/comment/reducers/commentRepliesSlice.js";
import notificationSlice from "../services/notification/reducers/notificationSlice.js";
import notificationSettingSlice from "../services/settings/reducers/notificationSettingSlice.js";
import profileSettingSlice from "../services/settings/reducers/profileSettingSlice.js";
import accountingSettingSlice from "../services/settings/reducers/accountingSettingSlice.js";
import blockedUsersSlice from "../services/blockedUser/reducers/blockedUsersSlice.js";
import mutedUserSlice from "../services/mutedUser/reducers/mutedUserSlice.js";
import currentUserSlice from "../services/user/reducers/currentUserSlice.js";

const store = configureStore({
  reducer: {
    auths: authSlice,
    posts: postSlice,
    currentUser: currentUserSlice,
    users: userSlice,
    societies: societySlice,
    societyPost: societyPostSlice,
    avatar: avatarSlice,
    bio: bioSlice,
    downvotedPost: downvoteSlice,
    upvotedPost: upvoteSlice,
    bookmark: bookmarkSlice,
    comment: commentSlice,
    postFeedback: postFeedbackSlice,
    commentReplies: commentRepliesSlice,
    notification: notificationSlice,
    accountSetting: accountingSettingSlice,
    profileSetting: profileSettingSlice, // might not need this
    notificationSetting: notificationSettingSlice,
    blockedUser: blockedUsersSlice,
    mutedUser: mutedUserSlice,
  },
});

export default store;
