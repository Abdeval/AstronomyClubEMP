
import { format } from "date-fns"
import { Calendar, ChevronRight, Clock, RotateCcw, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TaskType } from "@/lib/types"
import { Link } from "react-router-dom"

interface TaskCardProps {
  task: TaskType
}

export default function TaskCard({ task }: TaskCardProps) {
  const getStatusIcon = () => {
    switch (task.status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "IN_PROGRESS":
        return <RotateCcw className="h-4 w-4 text-blue-500" />
      case "COMPLETED":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }


  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/members/tasks/${task.id}`} className="hover:underline">
            <h3 className="text-lg font-semibold">{task.title}</h3>
          </Link>
          <Badge variant={"secondary"}>
            <div className="flex items-center gap-1">
              {getStatusIcon()}
              <span>{task.status.replace("_", " ")}</span>
            </div>
          </Badge>
        </div>

        {task.description && <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{task.description}</p>}

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(task.createdAt), "PPP")}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2 flex justify-between items-center border-t mt-auto">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignedTo.avatar || ""} alt={task.assignedTo.firstName as string} />
            <AvatarFallback>{task.assignedTo.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{task.assignedTo.firstName}</span>
        </div>

        <Button variant="secondary" size="sm" asChild>
          <Link to={`/members/tasks/${task.id}`}>
            View <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

