export const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("token")) || {};

  return currentUser;
};
