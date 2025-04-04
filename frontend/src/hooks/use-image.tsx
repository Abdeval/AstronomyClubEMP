import { deleteApi, getApi, patchApi, postApi } from "@/lib/api";
import { useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "shared-types";

export const useImage = () => {
  const queryClient = useQueryClient();


  const response = useQuery({
    queryKey: ["images"],
    queryFn: () => getApi("/images"),
  });

  const addImageMutation = useMutation({
    mutationKey: ["add-image"],
    mutationFn: (formData: FormData) => postApi("/images/create", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"]
      })
    }
  });

  const deleteImageMutation = useMutation({
    mutationKey: ["delete-image"],
    mutationFn: (imageId: string | number) => deleteApi(`/images/delete/${imageId}`),
  });

  const updateImageMutation = useMutation({
    mutationKey: ["update-image"],
    mutationFn: (data: {
      imageId: string,
      body: Partial<Image>
    }) => patchApi(`/images/update/${data.imageId}`, data.body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["images"]
      })

      queryClient.invalidateQueries({
        queryKey: ["image-by-id", variables.imageId]
      })
    }
  });
  

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
    addImage: addImageMutation.mutate,
    updateImage: updateImageMutation.mutate,
    deleteImage: deleteImageMutation.mutate,
    getImageDataHistory,
  };
};


export const useImageInfo = (imageId: string) => {
  const { data: image, isLoading: isImageLoading, isError: isImageError } = useQuery({
    queryKey: ["image-by-id", imageId],
    queryFn: () => getApi(`/images/${imageId}`),
    enabled: !!imageId,
  });
  
  return { image, isImageError, isImageLoading };
};