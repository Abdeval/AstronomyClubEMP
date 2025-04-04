import { deleteApi, getApi, patchApi, postApi } from "@/lib/api";
import { ArticleType } from "@/lib/types";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Article } from "shared-types";

export const useArticle = () => {
  const queryClient = useQueryClient();

  const { data: articles, isLoading, error } = useQuery<ArticleType[]>({
    queryKey: ["articles"],
    queryFn: () => getApi("/articles"),
  });

  const addArticleMutation = useMutation({
    mutationKey: ["add-article"],
    mutationFn: (formData: FormData) =>
      postApi("/articles/create", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationKey: ["delete-article"],
    mutationFn: (articleId: string) =>
      deleteApi(`/articles/delete/${articleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });

  const updateArticleMutation = useMutation({
    mutationKey: ["update-article"],
    mutationFn: (formData: FormData) =>
      patchApi(`/articles/update/${formData.get("articleId")}`, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["article-by-id", variables.get("articleId")],
      });
    },
  });



  const getArticleDataHistory = (mutationKey: unknown[]) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => mutation.state.data,
    });

    return data;
  };

  return {
    articles,
    isLoading,
    error,
    addArticle: addArticleMutation.mutate,
    deleteArticle: deleteArticleMutation.mutate,
    updateArticle: updateArticleMutation.mutate,
    getArticleDataHistory,
  };
};

export const useArticleInfo = (articleId: string) => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article-by-id", articleId],
    queryFn: () => getApi(`/articles/${articleId}`),
    enabled: !!articleId,
  });

  return { article, isLoading, error }
}
