import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchNews, getNewsArticleHistory } from "../services";
import { Loader, NewsCardList } from "../components";

type NewsArticleType = {
  id: number;
  published_at: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  source_id: string | null;
  source_name: string | null;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ width: "100%", maxHeight: "90vh", overflow: "scroll" }}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

/**
 * Component for displaying search history and related news articles.
 * Allows users to select a search history item to view related news articles.
 * Displays search results for the selected search history item.
 * @returns {JSX.Element} SearchNewsHistory component.
 */
const SearchNewsHistory: React.FC = () => {
  // State variables for managing user input and data fetching
  const [userHistory, setUserHistory] = useState<string[]>([]);
  const [newsArticle, setNewsArticle] = useState<NewsArticleType[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [value, setValue] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle news search
  const handleSearch = (searchKeyword: string, pageNumber: number) => {
    if (searchKeyword) {
      setIsLoading(true);
      fetchNews({ keyword: searchKeyword, page: pageNumber })
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

  // Function to handle tab change
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setKeyword(userHistory[newValue]);
    handleSearch(userHistory[newValue], 1);
  };

  // Effect to fetch user's search history and initiate search for the first item
  useEffect(() => {
    getNewsArticleHistory()
      .then((response) => {
        const history = response.map((item: any) => item.keyword);
        setUserHistory(history);
        return history;
      })
      .then((response) => {
        setValue(0);
        setKeyword(response[0]);
        handleSearch(response[0], 1);
      });
  }, []);

  // Effect to trigger news search when page changes
  useEffect(() => {
    handleSearch(keyword, page);
  }, [page]);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          maxHeight: "90vh",
          overflow: "scroll",
        }}
      >
        {userHistory.map((item, index) => (
          <Tab key={index} label={item} />
        ))}
      </Tabs>
      {userHistory.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          {isLoading ? (
            <Loader />
          ) : newsArticle.length > 0 ? (
            <NewsCardList
              articles={newsArticle}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              sx={{ maxWidth: "80%", margin: "0 auto" }}
            />
          ) : (
            <Typography sx={{ maxWidth: "80%", margin: "0 auto" }}>
              No results found
            </Typography>
          )}
        </TabPanel>
      ))}
    </Box>
  );
};

export default SearchNewsHistory;
