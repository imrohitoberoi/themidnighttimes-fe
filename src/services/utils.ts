/**
 * Retrieves user data from local storage.
 * @returns {Object | null} User data retrieved from local storage, or null if no data is found.
 */
export const getUserData = () => {
  const loggedInUserData = localStorage.getItem("user");
  return loggedInUserData ? JSON.parse(loggedInUserData) : null;
};

/**
 * Retrieves authentication token from user data stored in local storage.
 * @returns {string | null} Authentication token retrieved from local storage, or null if no token is found.
 */
export const getAuthToken = () => {
  const loggedInUserData = localStorage.getItem("user");
  return loggedInUserData ? JSON.parse(loggedInUserData).token : null;
};
