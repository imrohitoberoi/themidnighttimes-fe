import { API_ENDPOINTS, API_METHODS, ENV } from "../constants";
import { getAuthToken } from "./utils";

/**
 * Fetches news articles based on the provided query parameters.
 * 
 * @param {Record<string, string | number | null>} queryParams - The query parameters to filter the news articles.
 * @returns {Promise<any>} A promise that resolves to the list of fetched news articles.
 * @throws {Error} Throws an error if the request fails.
 */
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

/**
 * Fetches the history of viewed news articles.
 * 
 * @returns {Promise<any>} A promise that resolves to the list of viewed news articles.
 * @throws {Error} Throws an error if the request fails.
 */
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
