import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  User,
  ChevronLeft,
  Edit,
  Trash2,
  Clock,
  RotateCcw,
  CheckCircle2,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import EditTaskDialog from "./edit-task-dialog";
import { updateTaskStatus } from "@/lib/data/tasks";
import { TaskType } from "@/lib/types";
import { useTask } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Task, TaskStatus } from "shared-types";
import { toast } from "sonner";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";

interface TaskDetailProps {
  task: TaskType;
}

export default function TaskDetail({ task }: TaskDetailProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { deleteTask, updateTask } = useTask();
  const navigate = useNavigate();

  const handleUpdateTask = (updatedTask: Partial<Task>) => {
    const data = {
      taskId: updatedTask.id as string,
      body: {
        ...updatedTask,
      },
    };
    updateTask(data);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTask = () => {
    try {
      deleteTask(task.id);
      toast("Task has been deleted.", {
        action: {
          label: "Undo",
          onClick: () => console.log("undo"),
        },
      });
      navigate("/members/tasks");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast(`Error: ${error}`);
    }
  };

  const handleUpdateStatus = async (newStatus: TaskStatus) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const data = {
        taskId: task.id as string,
        body: {
          status: newStatus,
        },
      };
      // ? here we will gonna update just the status of the task
      updateTask(data);
      toast(
        `Task status changed to ${newStatus.replace("_", " ").toLowerCase()}.`
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast("Failed to update the task status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "IN_PROGRESS":
        return <RotateCcw className="h-5 w-5 text-blue-500" />;
      case "COMPLETED":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-muted-foreground">
              {task.title}
            </h1>
            <Badge variant={"outline"} className="ml-2">
              <div className="flex items-center gap-1">
                {getStatusIcon(task.status)}
                <span>{task.status.replace("_", " ")}</span>
              </div>
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
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

        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Created on {format(new Date(task.createdAt), "PPP")}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            Assigned to {task.assignedTo.firstName}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Task description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {task.description ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{task.description}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No description provided for this task.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Status update actions */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={task.status === "PENDING" ? "default" : "outline"}
                  onClick={() => handleUpdateStatus("PENDING")}
                  disabled={task.status === "PENDING" || isUpdating}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Mark as Pending
                </Button>
                <Button
                  variant={
                    task.status === "IN_PROGRESS" ? "default" : "outline"
                  }
                  onClick={() => handleUpdateStatus("IN_PROGRESS")}
                  disabled={task.status === "IN_PROGRESS" || isUpdating}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Mark as In Progress
                </Button>
                <Button
                  variant={task.status === "COMPLETED" ? "default" : "outline"}
                  onClick={() => handleUpdateStatus("COMPLETED")}
                  disabled={task.status === "COMPLETED" || isUpdating}
                >
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Assignee info */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={task.assignedTo.avatar || ""}
                    alt={task.assignedTo.firstName as string}
                  />
                  <AvatarFallback>
                    {task.assignedTo.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{task.assignedTo.firstName}</p>
                  <p className="text-sm text-muted-foreground">
                    {task.assignedTo.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">Created</dt>
                  <dd className="font-medium">
                    {format(new Date(task.createdAt), "PPP 'at' p")}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="font-medium flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    <span>{task.status.replace("_", " ")}</span>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm text-muted-foreground">ID</dt>
                  <dd className="font-medium text-xs text-muted-foreground truncate">
                    {task.id}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDeletionDialog
        onDelete={handleDeleteTask}
        onOpenChange={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        item={task.title}
      />

      {/* Edit task dialog */}
      <EditTaskDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        task={task}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}
