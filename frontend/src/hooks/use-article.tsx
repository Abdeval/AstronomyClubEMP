import { deleteApi, getApi, postApi } from "@/lib/api";
import { ArticleType } from "@/lib/types";
import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";

export const useArticle = () => {
  const response = useQuery({
    queryKey: ["articles"],
    queryFn: () => getApi("/articles"),
  });

  const addArticle = async (article: ArticleType) => {
    const mutation = useMutation({
      mutationKey: ["add-article"],
      mutationFn: () => postApi("/articles/add", article),
    });

    return mutation.mutate;
  };

  const deleteArticle = async (articleId: string | number) => {
    const mutation = useMutation({
      mutationKey: ["delete-article"],
      mutationFn: () => deleteApi(`/articles/delete/${articleId}`),
    });

    return mutation.mutate;
  };

  const getArticleDataHistory = (mutationKey: unknown[]) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => mutation.state.data,
    });

    return data;
  };

  return { ...response, addArticle, deleteArticle, getArticleDataHistory };
};
