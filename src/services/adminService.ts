import { API_ENDPOINTS, API_METHODS, ENV } from "../constants";

export const getUsers = async () => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.GET,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
    }

    return await response.json();
};

export const createUsers = async (userData: any) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.POST,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add users');
    }

    return await response.json();
};

export const updateUsers = async (userData: any) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}${userData.id}/`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.PUT,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update users');
    }

    return await response.json();
};

export const blockUnblockUsers = async (userData: any) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.USERS}${userData.id}/`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.PATCH,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update users');
    }

    return await response.json();
};
