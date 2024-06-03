import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchNews, getNewsArticleHistory } from "../services";
import { Filter, Loader, NewsCardList } from "../components";
import { FilterData } from "../components/filter";

type NewsArticleType = {
  id: number;
  published_at: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  source_id: string | null;
  source_name: string | null;
};

/**
 * Component for searching news articles.
 * Allows users to search for news articles based on keywords and filters.
 * Displays search results and provides pagination functionality.
 * @returns {JSX.Element} SearchNews component.
 */
const SearchNews: React.FC = () => {
  // State variables for managing user input and data fetching
  const [userHistory, setUserHistory] = useState<string[]>([]);
  const [newsArticle, setNewsArticle] = useState<NewsArticleType[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterData>({
    date: "",
    sourceId: "",
    sourceName: "",
  });

  // Function to handle news search
  const handleSearch = (page: number) => {
    if (keyword) {
      setIsLoading(true);
      fetchNews({
        keyword,
        page,
        published_at: filter.date || null,
        source_id: filter.sourceId || null,
        source_name: filter.sourceName || null,
      })
        .then((response) => {
          setNewsArticle(response.results);
          setTotalPages(Math.ceil(response.count / 10));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  // Effect to fetch user's search history
  useEffect(() => {
    setIsLoading(true);
    getNewsArticleHistory()
      .then((response) => {
        setUserHistory(response.map((item: any) => item.keyword));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Effect to trigger news search when page changes
  useEffect(() => {
    handleSearch(page);
  }, [page]);

  return (
    <Box sx={{ display: "flex", gap: "20px" }}>
      <Box
        sx={{
          flex: 0.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Filter
          filter={filter}
          setFilter={setFilter}
          handleFiltering={handleSearch}
        />
      </Box>
      <Box sx={{ flex: 2 }}>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Autocomplete
            freeSolo
            id="search-news"
            options={userHistory}
            renderInput={(params) => (
              <TextField {...params} label="Search Articles" autoFocus />
            )}
            onInputChange={(_event, newInputValue) => {
              setKeyword(newInputValue);
            }}
            sx={{ width: "90%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch(1)}
            disabled={keyword ? false : true}
          >
            Search
          </Button>
        </Box>
        <Divider sx={{ marginBlock: "20px" }}>NEWS</Divider>
        <Box>
          {isLoading ? (
            <Loader />
          ) : newsArticle.length > 0 ? (
            <NewsCardList
              articles={newsArticle}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          ) : (
            <Typography>No News found for your searched keyword</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchNews;
