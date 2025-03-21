import { deleteApi, getApi, postApi } from "@/lib/api";
import { ImageType } from "@/lib/types";
import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";

export const useImage = () => {
  const response = useQuery({
    queryKey: ["images"],
    queryFn: () => getApi("/images"),
  });

  const addImage = async (image: ImageType) => {
    const mutation = useMutation({
      mutationKey: ["add-image"],
      mutationFn: () => postApi("/images/add", image),
    });

    return mutation.mutate;
  };

  const deleteImage = async (imageId: string | number) => {
    const mutation = useMutation({
      mutationKey: ["delete-image"],
      mutationFn: () => deleteApi(`/images/delete/${imageId}`),
    });

    return mutation.mutate;
  };

  const imageInfo = (imageId: string) => {
    const { data } = useQuery({
      queryKey: ["image-by-id", imageId],
      queryFn: () => getApi(`/images/${imageId}`),
      enabled: !!imageId,
    });
    
    return data;
  };

  const getImageDataHistory = (mutationKey: unknown[]) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => mutation.state.data,
    });

    return data;
  };

  //   ! here you must specify the imageId to get its details

  return {
    ...response,
    addImage,
    deleteImage,
    getImageDataHistory,
    imageInfo,
  };
};
