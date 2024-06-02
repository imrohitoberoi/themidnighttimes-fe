import {
    Autocomplete,
    Button,
    TextField
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchNews, getNewsArticleHistory } from "../services";
import { NewsCardList } from "../components";

type NewsArticleType = {
    id: number;
    published_at: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    source_id: string | null;
    source_name: string | null;
};

const SearchNews: React.FC = () => {
    const [userHistory, setUserHistory] = useState<string[]>([]);
    const [newsArticle, setNewsArticle] = useState<NewsArticleType[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const handleSearch = () => {
        if (keyword) {
            fetchNews({ keyword, page }).then((response) => {
                setNewsArticle(response.results);
                setTotalPages(Math.ceil(response.count/10));
            })
        }
    };

    useEffect(() => {
        getNewsArticleHistory().then((response) => {
            setUserHistory(response.map((item: any) => item.keyword));
        });
    }, []);

    useEffect(() => {
        handleSearch();
    }, [page]);

    return (
        <>
            <Autocomplete
                freeSolo
                id="search-news"
                options={userHistory}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search Articles" />}
                onInputChange={(_event, newInputValue) => {
                    setKeyword(newInputValue);
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={keyword ? false : true}
            >
                Search
            </Button>
            {newsArticle.length > 0 && <NewsCardList articles={newsArticle} totalPages={totalPages} page={page} setPage={setPage}/>}
        </>
    );
};

export default SearchNews;
