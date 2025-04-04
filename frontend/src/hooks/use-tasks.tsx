import { deleteApi, getApi, patchApi, postApi } from "@/lib/api";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Task } from "shared-types";

export const useTask = () => {
  const queryClient = useQueryClient();

  const response = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getApi("/tasks"),
  });

  const addTaskMutation = useMutation({
    mutationKey: ["add-task"],
    mutationFn: (task: Omit<Task, "id" | "createdAt">) =>
      postApi("/tasks/create", task),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (taskId: string) => deleteApi(`/tasks/delete/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationKey: ["update-task"],
    mutationFn: (data: { taskId: string; body: Partial<Task> }) =>
      patchApi(`/tasks/update/${data.taskId}`, data.body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["task-by-id", variables.taskId],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const getTaskDataHistory = (mutationKey: unknown[]) => {
    const data = useMutationState({
      filters: { mutationKey },
      select: (mutation) => mutation.state.data,
    });

    return data;
  };

  return {
    ...response,
    addTask: addTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    getTaskDataHistory,
  };
};

export const useTaskInfo = (taskId: string) => {
  return useQuery({
    queryKey: ["task-by-id", taskId], 
    queryFn: () => getApi(`/tasks/${taskId}`),
    enabled: !!taskId,
  });
};

