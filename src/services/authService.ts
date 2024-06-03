import { API_ENDPOINTS, API_METHODS, ENV } from "../constants";
import { getAuthToken } from "./utils";

/**
 * Logs in a user using the provided email and password.
 * 
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} A promise that resolves to the response data from the login request.
 * @throws {Error} Throws an error if the login request fails.
 */
export const login = async (email: string, password: string) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.LOGIN}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
};

/**
 * Logs out the currently authenticated user.
 * 
 * @returns {Promise<any>} A promise that resolves to the response data from the logout request.
 * @throws {Error} Throws an error if the logout request fails.
 */
export const logout = async () => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.LOGOUT}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.POST,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
    }

    return await response.json();
};
