export const getUserData = () => {
  const loggedInUserData = localStorage.getItem("user");
  return loggedInUserData ? JSON.parse(loggedInUserData) : null;
};

export const getAuthToken = () => {
  const loggedInUserData = localStorage.getItem("user");
  return loggedInUserData ? JSON.parse(loggedInUserData).token : null;
};
