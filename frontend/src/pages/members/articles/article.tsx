import ArticleDetail from '@/components/articles/article-detail'
import ArticleDetailSkeleton from '@/components/articles/article-detail-loading';
import { Button } from '@/components/ui/button';
import { useArticleInfo } from "@/hooks/use-article";
import { Link, useParams } from 'react-router-dom';
export default function Article() {
  const { id } = useParams<{ id: string }>();
  const { article, isLoading, error } = useArticleInfo(id as string);

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (error || !article) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Article not found</h2>
        <p className="text-muted-foreground mb-4">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/members/articles">Back to Articles</Link>
        </Button>
      </div>
    );
  }

  console.log(article);
  return (
    <ArticleDetail article={article}/>
  )
}
