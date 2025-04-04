import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Edit, Trash2, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useArticle } from "@/hooks";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";
import { ArticleType } from "@/lib/types";
import EditArticleDialog from "./edit-article-dialog";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export default function ArticleDetail({ article }: { article: ArticleType }) {
  const navigate = useNavigate();
  const { deleteArticle, updateArticle } = useArticle();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // ! confirm the deletion
  const handleDeleteConfirm = () => {
    if (article) {
      deleteArticle(article.id);
      setIsDeleteDialogOpen(false);
      navigate("/members/articles");
    }
  };

  // ! handle the update

  const handleUpdateArticle = async (formData: FormData) => {
    try {
      updateArticle(formData);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  // ! Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article?.title || "Astronomy article",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("sharing the article...")
    }
  };

  // ! loging the article to discover the issues
  console.log(article);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-muted-foreground capitalize">
          {article.title}
        </h1>

        <div className="flex items-center gap-8 mt-4">

          {/* showing the category of the article */}
          <Badge variant={"default"}>
            {article.category}
          </Badge>

          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage
                src={article.author?.avatar || ""}
                alt={article.author?.firstName || "Author"}
              />
              <AvatarFallback>
                {article.author?.firstName?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {article.author?.firstName || "Unknown Author"}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(article.createdAt), "MMMM d, yyyy")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            onClick={() => setIsEditDialogOpen(true)}
          >
            <div className="flex gap-1 items-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </div>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Main image of the article */}
          <Card>
            <CardContent className="p-2">
              <img src={article.image} alt="article image" 
                  className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>
          {/* about the author */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">About the Author</h2>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={article.author?.avatar || ""}
                    alt={article.author?.firstName || "Author"}
                  />
                  <AvatarFallback>
                    {article.author?.firstName?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {article.author?.firstName || "Unknown Author"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {article.author?.email || ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* other details */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Article Details</h2>
              <dl className="space-y-3">
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">Published</dt>
                  <dd className="font-medium">
                    {format(new Date(article.createdAt), "PPP 'at' p")}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">ID</dt>
                  <dd className="font-medium text-xs text-muted-foreground truncate">
                    {article.id}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditArticleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdateArticle={handleUpdateArticle}
        article={article}
      />

      <ConfirmDeletionDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteConfirm}
        item="article"
      />
    </div>
  );
}
