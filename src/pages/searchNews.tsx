import { LockOutlined } from "@mui/icons-material";
import {
    Box,
    Autocomplete,
    Avatar,
    Typography,
    TextField,
    Button
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchNews, getNewsArticleHistory } from "../services";

type NewsArticleType = {
    id: number;
    published_at: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    source_id: string | null;
    source_name: string | null;
}

type NewsArticleListType = {
	count: number;
    next: string | null;
    previous: string | null;
    results: NewsArticleType[]
}[];

const SearchNews: React.FC = () => {
    const [userHistory, setUserHistory] = useState<string[]>([]);
    const [newsArticle, setNewsArticle] = useState<NewsArticleListType>([]);

    const handleSubmit = async (keyword: string) => {
        try {
            const response = await fetchNews({keyword});
            console.log('response', response);
            setNewsArticle(response.results);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        getNewsArticleHistory().then((response) => {
            setUserHistory(response.map((item: any)=>item.keyword));
        });
    }, []);

    return (
        <Autocomplete
            disablePortal
            id="search-news"
            options={userHistory}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search Articles" />}
            onChange={(event, value) => {
                if (value) {
                    handleSubmit(value);
                }
            }}
        />
    );
};

export default SearchNews;
