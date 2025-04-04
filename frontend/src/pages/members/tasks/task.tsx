import TaskDetail from "@/components/tasks/task-detail";
import TaskLoading from "@/components/tasks/task-loading";
import { useTaskInfo } from "@/hooks";
// import { getTaskById } from "@/lib/data";
import { useParams } from "react-router-dom";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { data: task , isLoading } = useTaskInfo(id as string);

  return (
    <div>{isLoading ? <TaskLoading /> : <TaskDetail task={task} />}</div>
  );
  // return <div>hello</div>
}
