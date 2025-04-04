"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Filter,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  User,
  ClipboardList,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TaskCard from "./task-card";
import CreateTaskDialog from "./create-task-dialog";
import { Link } from "react-router-dom";
import { TaskType } from "@/lib/types";
import { Task } from "shared-types";
import { useTask } from "@/hooks";

export default function TasksList({ tasks }: { tasks: TaskType[] }) {
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [statusFilters, setStatusFilters] = useState<string[]>([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]);

  // ! task hook
  const { addTask } = useTask();

  useEffect(() => {
    // Filter tasks based on search query and status filters
    const filtered = tasks.filter(
      (task) =>
        (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description &&
            task.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))) &&
        statusFilters.includes(task.status)
    );

    // Sort tasks by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTasks(sorted);
  }, [tasks, searchQuery, sortOrder, statusFilters]);

  const handleCreateTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    addTask(newTask);
    setIsCreateDialogOpen(false);
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "IN_PROGRESS":
        return <RotateCcw className="h-4 w-4 text-blue-500" />;
      case "COMPLETED":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
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
                <SortDesc className="mr-2 h-4 w-4" />
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                <SortAsc className="mr-2 h-4 w-4" />
                Oldest first
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("PENDING")}
                onCheckedChange={() => toggleStatusFilter("PENDING")}
              >
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("IN_PROGRESS")}
                onCheckedChange={() => toggleStatusFilter("IN_PROGRESS")}
              >
                <RotateCcw className="mr-2 h-4 w-4 text-blue-500" />
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("COMPLETED")}
                onCheckedChange={() => toggleStatusFilter("COMPLETED")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                Completed
              </DropdownMenuCheckboxItem>
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
            New Task
          </Button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilters.length < 3
              ? "No tasks match your search criteria."
              : "Start by creating your first task."}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      ) : viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <div className="p-4 flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center">
                  {getStatusIcon(task.status)}
                </div>
                <div className="flex-1">
                  <Link
                    to={`/members/tasks/${task.id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                  </Link>
                  {task.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                      {task.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(task.createdAt), "PPP")}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {task.assignedTo.firstName}
                    </div>
                    <Badge variant={"secondary"} className="ml-auto">
                      {task.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={task.assignedTo.avatar || ""}
                      alt={task.assignedTo.firstName as string}
                    />
                    <AvatarFallback>
                      {task.assignedTo.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
}
