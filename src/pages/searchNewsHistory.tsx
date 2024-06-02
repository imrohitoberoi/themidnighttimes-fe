import {
    Box,
    Tab,
    Tabs,
    Typography
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

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const SearchNewsHistory: React.FC = () => {
    const [userHistory, setUserHistory] = useState<string[]>([]);
    const [newsArticle, setNewsArticle] = useState<NewsArticleType[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [value, setValue] = useState<number>(-1);

    const handleSearch = (searchKeyword: string, pageNumber: number) => {
        if (searchKeyword) {
            fetchNews({ keyword: searchKeyword, page: pageNumber }).then((response) => {
                setNewsArticle(response.results);
                setTotalPages(Math.ceil(response.count/10));
            })
        }
    };

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setKeyword(userHistory[newValue]);
        handleSearch(userHistory[newValue], 1);
    };

    useEffect(() => {
        getNewsArticleHistory().then((response) => {
            setUserHistory(response.map((item: any) => item.keyword));
        });
    }, []);

    useEffect(() => {
        handleSearch(keyword, page);
    }, [page]);

    return (
        <>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '90vh' }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {userHistory.map((item, index) => (
                        <Tab key={index} label={item} {...a11yProps(index)} />
                    ))}
                </Tabs>
                {userHistory.map((item, index) => (
                    <TabPanel key={index} value={value} index={index}>
                        {item}
                    </TabPanel>
                ))}
            </Box>
            {newsArticle.length > 0 && <NewsCardList articles={newsArticle} totalPages={totalPages} page={page} setPage={setPage} />}
        </>
    );
};

export default SearchNewsHistory;
