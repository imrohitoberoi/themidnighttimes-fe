import { API_ENDPOINTS, API_METHODS, ENV } from "../constants";
import { getAuthToken } from "./utils";

export const fetchNews = async (queryParams: Record<string, string | number | null>) => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.NEWS}`;
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
        }
    });
    const apiUrlWithParams = `${apiUrl}?${searchParams.toString()}`;
    const response = await fetch(apiUrlWithParams, {
        method: API_METHODS.GET,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
    }

    return await response.json();
};

export const getNewsArticleHistory = async () => {
    const apiUrl = `${ENV.BASE_URL}${API_ENDPOINTS.NEWS_HISTORY}`;
    const response = await fetch(apiUrl, {
        method: API_METHODS.GET,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getAuthToken()}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news history');
    }

    return await response.json();
};
