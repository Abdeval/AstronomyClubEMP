"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  FileText,
  Calendar,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Article } from "shared-types";
import CreateArticleDialog from "./create-article-dialog";
import { useArticle } from "@/hooks";
import { ArticleType } from "@/lib/types";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";
import { toast } from "sonner";

export default function ArticlesList() {
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const { articles, isLoading, error, addArticle, deleteArticle } = useArticle();

  useEffect(() => {
    if (articles) {
      // Filter articles based on search query
      const filtered = articles.filter(
        (article: Article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Sort articles by date
      const sorted = [...filtered].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

      setFilteredArticles(sorted);
    }
  }, [articles, searchQuery, sortOrder]);

  const handleCreateArticle = async (formData: FormData) => {
    try {
      addArticle(formData);
      setIsCreateDialogOpen(false);
      toast(`Article created with success ${formData.get("title")}`)
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  const handleDeleteClick = (article: Article) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (articleToDelete) {
      try {
        deleteArticle(articleToDelete.id);
        setIsDeleteDialogOpen(false);
        setArticleToDelete(null);
      } catch (error) {
        console.error("Failed to delete article:", error);
      }
    }
  };

  if (error) {
    return (
      <div className="text-center p-12 border rounded-lg bg-muted/20">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Error loading articles</h3>
        <p className="text-muted-foreground mb-4">
          {error.message || "Failed to load articles"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-background"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                <Calendar className="mr-2 h-4 w-4" />
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                <Calendar className="mr-2 h-4 w-4" />
                Oldest first
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs defaultValue="grid" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" onClick={() => setViewType("grid")}>
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" onClick={() => setViewType("list")}>
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "No articles match your search criteria."
              : "Start by creating your first article."}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </div>
      ) : viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden flex flex-col h-full"
            >
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="mb-2 flex-1">
                  <h3 className="text-xl font-semibold line-clamp-2 mb-2">
                    <Link
                      to={`/members/articles/${article.id}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}
                    ...
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={article.author?.avatar || ""}
                        alt={article.author?.firstName || "Author"}
                      />
                      <AvatarFallback>
                        {article.author?.firstName?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm">
                        {article.author?.firstName || "Unknown Author"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(article.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/members/articles/${article.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div className="flex items-center gap-1">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(article)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="p-4 flex gap-4">
                <div className="flex-1">
                  <Link
                    to={`/members/articles/${article.id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-lg font-semibold mb-1">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}
                    ...
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(article.createdAt), "PPP")}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author?.firstName || "Unknown Author"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={article.author?.avatar || ""}
                        alt={article.author?.firstName || "Author"}
                      />
                      <AvatarFallback>
                        {article.author?.firstName?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/members/articles/${article.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/articles/edit/${article.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(article)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateArticleDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateArticle={handleCreateArticle}
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
