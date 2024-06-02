import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

type NewsArticleType = {
    id: number;
    published_at: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    source_id: string | null;
    source_name: string | null;
};

type NewsCardProps = {
    article: NewsArticleType;
}

const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {article.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {formatDate(article.published_at)}
                </Typography>
                <Typography variant="body2">
                    {article.description}
                </Typography>
            </CardContent>
            <CardActions>
                {article.url && (
                    <Button size="small" href={article.url} target="_blank" rel="noopener noreferrer">
                        Read More
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default NewsCard;
