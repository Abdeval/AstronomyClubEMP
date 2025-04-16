import { deleteApi, getApi, patchApi, postApi } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useObservation = () => {
  const queryClient = useQueryClient();

  // ! get observations
  const { data: observations, isLoading: isObservationsLoading } = useQuery({
    queryKey: ["observations"],
    queryFn: () => getApi("/observations"),
  });

  const addObservationMutation = useMutation({
    mutationKey: ["add-observation"],
    mutationFn: (formData: FormData) =>
      postApi("/observations/create", formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations"],
      });
    },
  });

  const deleteObservationMutation = useMutation({
    mutationKey: ["delete-observation"],
    mutationFn: (obsId: string) => deleteApi(`/observations/delete/${obsId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations"],
      });
    },
  });

  const updateObservationMutation = useMutation({
    mutationKey: ["update-observation"],
    mutationFn: (formData: FormData) => patchApi(`/observations/update/${formData.get("id")}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["observation-by-id"]
      })
    },
  });

  return {
    observations,
    isObservationsLoading,
    addObservation: addObservationMutation.mutate,
    deleteObservation: deleteObservationMutation.mutate,
    updateObservation: updateObservationMutation.mutate
  };
};

export const useObservationInfo = (obsId: string) => {
  const { data: observation, isLoading: isObservationLoading, isError: isObservationError } = useQuery({
    queryKey: ["observation-by-id", obsId],
    queryFn: () => getApi(`/observations/${obsId}`),
    enabled: !!obsId,
  });

  return {
    observation,
    isObservationError, 
    isObservationLoading
  }
}
