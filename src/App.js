import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/home/Home";
import NavigationMenu from "./layouts/navbar/NavigationMenu";
import Profile from "./pages/profile/Profile";
import Societies from "./pages/societies/Societies";
import Ts from "./utils/Ts";
import SocietyPage from "./features/societies/components/societyPage/SocietyPage";
import Bookmark from "./pages/bookmark/Bookmark";
import Notification from "./pages/notification/Notification";
import Query from "./pages/query/Query";
import SinglePostPage from "./pages/singlePostPage/SinglePostPage";
import CommentPage from "./features/commentPage/CommentPage";
import NotFoundPage from "./pages/404Page/NotFoundPage";
import Settings from "./pages/settings/Settings";
import AccountSetting from "./features/settings/renderSettings/components/accountSetting/AccountSetting";
import ProfileSetting from "./features/settings/renderSettings/components/profileSetting/ProfileSetting";
import NotificationSetting from "./features/settings/renderSettings/components/notificationSetting/NotificationSetting";
import ChangePasswordDetails from "./features/settings/renderSettings/components/accountSetting/components/passwordSetting/ChangePaswordDetails";
import ChangeEmailDetails from "./features/settings/renderSettings/components/accountSetting/components/emailSetting/ChangeEmailDetails";
import BlockedUsersList from "./features/settings/renderSettings/components/usersManagement/components/blockedAccount/BlockedUsersList";
import MutedUsersList from "./features/settings/renderSettings/components/usersManagement/components/mutedAccount/MutedUsersList";
import UsersManagement from "./features/settings/renderSettings/components/usersManagement/UsersManagement";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<NavigationMenu />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Query />} />
        <Route path="/post/:username/:postId" element={<SinglePostPage />} />
        <Route path="/comment/:username/:commentId" element={<CommentPage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/societies" element={<Societies />}></Route>
        <Route
          path="/societies/:societyName/:societyId"
          element={<SocietyPage />}
        />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings">
          <Route index element={<Settings />} />
          <Route path="account">
            <Route index element={<AccountSetting />} />
            <Route path="email" element={<ChangeEmailDetails />} />
            <Route path="password" element={<ChangePasswordDetails />} />
          </Route>
          <Route path="profile" element={<ProfileSetting />} />
          <Route path="notification" element={<NotificationSetting />} />
          <Route path="block_and_mute" element={<UsersManagement />} />
          <Route path="block" element={<BlockedUsersList />} />
          <Route path="mute" element={<MutedUsersList />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="/ts" element={<Ts />} />
    </Routes>
  );
}

export default App;
