import { deleteApi, getApi, postApi } from "@/lib/api";
import { ArticleType } from "@/lib/types";
import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";


export const useArticle = () => {
  const response = useQuery({
    queryKey: ["articles"],
    queryFn: () => getApi("/articles"),
  });

  return { ...response };
};

export const addArticle = async (article: ArticleType) => {
  const mutation = useMutation({
    mutationKey: ["add-article"],
    mutationFn: () => postApi("/articles/add", article),
  });

  return mutation.mutate;
};

export const deleteArticle = async (articleId: string | number) => {
  const mutation = useMutation({
    mutationKey: ["delete-article"],
    mutationFn: () => deleteApi(`/articles/delete/${articleId}`),
  });

  return mutation.mutate;
};

export const getArticleDataHistory = (mutationKey: unknown[]) => {

  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.data,
  });

  return data;
};
