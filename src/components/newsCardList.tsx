import React from "react";
import NewsCard from "./newsCard";
import { Box, BoxProps, Pagination, Stack } from "@mui/material";

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
} & BoxProps;

/**
 * Displays a list of news cards and pagination controls.
 * @param articles - List of news articles to display.
 * @param totalPages - Total number of pages.
 * @param page - Current page number.
 * @param setPage - Function to set the current page.
 * @returns The NewsCardList component.
 */
const NewsCardList: React.FC<Props> = ({
  articles,
  totalPages,
  page,
  setPage,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box {...rest}>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
      <Stack spacing={2} alignItems="center">
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default NewsCardList;
