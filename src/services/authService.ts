import { API_ENDPOINTS, API_METHODS, ENV } from "../constants";

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

export const logout = async () => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.LOGOUT}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.POST,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
    }

    return await response.json();
};
