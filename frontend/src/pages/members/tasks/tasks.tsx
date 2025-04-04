import TasksList from "@/components/tasks/tasks-list";
import TasksLoading from "@/components/tasks/tasks-loading";
import { useTask } from "@/hooks";

export default function TasksPage() {
  const { data: tasks, isLoading: isTasksLoading } = useTask();
  
  return (
    <div className="container mx-auto  px-4">
      <h1 className="text-3xl font-bold mb-6 text-muted-foreground">Tasks Management</h1>
      {
        isTasksLoading ? <TasksLoading />
        : 
        <TasksList tasks={tasks}/>
      }
    </div>
  )
}

