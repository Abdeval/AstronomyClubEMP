// import ArticleList from "@/components/articles/article-list";
import ArticlesList from "@/components/articles/articles-list";

export default function Articles() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-muted-foreground font-bold mb-6">
        Articles
      </h1>
      <ArticlesList />
    </div>
  );
}
