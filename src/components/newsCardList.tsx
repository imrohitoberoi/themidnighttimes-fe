import React from 'react';
import NewsCard from './newsCard';
import { Pagination, Stack, Typography } from '@mui/material';

type NewsArticleType = {
    id: number;
    published_at: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    source_id: string | null;
    source_name: string | null;
};

type Props = {
    articles: NewsArticleType[];
    totalPages: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const NewsCardList: React.FC<Props> = ({ articles, totalPages, page, setPage }) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            {articles.map(article => (
                <NewsCard key={article.id} article={article} />
            ))}
            <Stack spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>
        </div>
    );
};

export default NewsCardList;
