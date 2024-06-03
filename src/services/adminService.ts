import { API_ENDPOINTS, API_METHODS, ENV } from "../constants";
import { getAuthToken } from "./utils";

/**
 * Fetches the list of users from the API.
 * 
 * @returns {Promise<any>} A promise that resolves to the list of users.
 * @throws {Error} Throws an error if the request fails.
 */
export const getUsers = async () => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.GET,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
    }

    return await response.json();
};

/**
 * Creates a new user in the API.
 * 
 * @param {any} userData - The data of the user to be created.
 * @returns {Promise<any>} A promise that resolves to the created user.
 * @throws {Error} Throws an error if the request fails.
 */
export const createUsers = async (userData: any) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.POST,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add users');
    }

    return await response.json();
};

/**
 * Updates an existing user in the API.
 * 
 * @param {any} userData - The data of the user to be updated, including the user ID.
 * @returns {Promise<any>} A promise that resolves to the updated user.
 * @throws {Error} Throws an error if the request fails.
 */
export const updateUsers = async (userData: any) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}${userData.id}/`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.PUT,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update users');
    }

    return await response.json();
};

/**
 * Blocks or unblocks a user in the API.
 * 
 * @param {any} userData - The data of the user to be blocked or unblocked, including the user ID.
 * @returns {Promise<any>} A promise that resolves to the updated user.
 * @throws {Error} Throws an error if the request fails.
 */
export const blockUnblockUsers = async (userData: any) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}${userData.id}/`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.PATCH,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update users');
    }

    return await response.json();
};

/**
 * Fetches the most searched keyword from the API.
 * 
 * @returns {Promise<any>} A promise that resolves to the most searched keyword.
 * @throws {Error} Throws an error if the request fails.
 */
export const getMostSearchedKeyword = async () => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.MOST_SEARCHED_KEYWORD}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.GET,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch most searched keyword');
    }

    return await response.json();
};
