
import { TaskType } from "../types";

// Sample data for tasks
const sampleTasks: TaskType[] = [
  {
    id: "1",
    title: "Observe Perseid Meteor Shower",
    description:
      "Set up equipment and document the Perseid meteor shower at its peak.",
    assignedToId: "user1",
    assignedTo: {
      id: "user1",
      firstName: "Jane Astronomer",
      email: "jane@example.com",
      avatar: "/avatars/1.png",
      lastName: null,
      role: "USER",
    },
    status: "COMPLETED",
    createdAt: new Date("2023-08-12T22:30:00"),
  },
  {
    id: "2",
    title: "Calibrate Telescope Equipment",
    description:
      "Perform monthly calibration of all observatory telescopes and document results.",
    assignedToId: "user2",
    assignedTo: {
      id: "user2",
      firstName: "Alex Stargazer",
      email: "alex@example.com",
      avatar: "/avatars/2.png",
      lastName: "..",
      role: "USER",
    },
    status: "PENDING",
    createdAt: new Date("2023-09-05T10:15:00"),
  },
  {
    id: "3",
    title: "Analyze Jupiter Observation Data",
    description:
      "Process and analyze the data collected from last week's Jupiter observation session.",
    assignedToId: "user3",
    assignedTo: {
      id: "user3",
      firstName: "Sam Cosmos",
      email: "sam@example.com",
      avatar: "/avatars/3.png",
      role: "USER",
      lastName: null,
    },
    status: "IN_PROGRESS",
    createdAt: new Date("2023-09-10T14:45:00"),
  },
  {
    id: "4",
    title: "Prepare Monthly Newsletter",
    description:
      "Compile recent astronomical events and observations for the monthly astronomy club newsletter.",
    assignedToId: "user1",
    assignedTo: {
      id: "user1",
      firstName: "Jane Astronomer",
      email: "jane@example.com",
      avatar: "/avatars/1.png",
      role: "USER",
      lastName: null,
    },
    status: "PENDING",
    createdAt: new Date("2023-09-20T09:30:00"),
  },
  {
    id: "5",
    title: "Organize Public Viewing Night",
    description:
      "Plan and coordinate the upcoming public viewing night at the observatory.",
    assignedToId: "user2",
    assignedTo: {
      id: "user2",
      firstName: "Alex Stargazer",
      email: "alex@example.com",
      avatar: "/avatars/2.png",
      role: "USER",
      lastName: null,
    },
    status: "IN_PROGRESS",
    createdAt: new Date("2023-09-15T11:00:00"),
  },
];

// Function to get all tasks
export async function getTasks(): Promise<TaskType[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(sampleTasks);
}

// Function to get a single task by ID
export function getTaskById(id: string): Promise<TaskType | undefined>{
  // In a real app, this would fetch from an API or database
  const task = sampleTasks.find((task) => task.id === id);
  return Promise.resolve(task);
}


export async function createTask(taskData: TaskType): Promise<TaskType> {
  const assignedUser = sampleTasks.find(
    (task) => task.assignedToId === taskData.assignedToId
  )?.assignedTo;

  if (!assignedUser) {
    throw new Error("Assigned user not found");
  }

  const newTask: TaskType = {
    ...taskData,
    id: `task-${Date.now()}`,
    assignedTo: assignedUser,
    createdAt: new Date(),
  };

  return Promise.resolve(newTask);
}

// Function to update a task
export async function updateTask(
  id: string,
  taskData: Partial<TaskType>
): Promise<TaskType> {
  // In a real app, this would send data to an API or database
  const taskIndex = sampleTasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  // If assignedToId changed, we need to update the assignedTo object
  let assignedTo = sampleTasks[taskIndex].assignedTo;
  if (
    taskData.assignedToId &&
    taskData.assignedToId !== sampleTasks[taskIndex].assignedToId
  ) {
    const newAssignedUser = sampleTasks.find(
      (task) => task.assignedToId === taskData.assignedToId
    )?.assignedTo;
    if (newAssignedUser) {
      assignedTo = newAssignedUser;
    }
  }

  const updatedTask: TaskType = {
    ...sampleTasks[taskIndex],
    ...taskData,
    assignedTo,
  };

  return Promise.resolve(updatedTask);
}

// Function to update just the status of a task
export async function updateTaskStatus(
  id: string,
  status: string
): Promise<TaskType> {
  // In a real app, this would send data to an API or database
  return updateTask(id, { status: status as any });
}

// Function to delete a task
export async function deleteTask(id: string): Promise<boolean> {
  // In a real app, this would send a request to an API or database
  const taskIndex = sampleTasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return Promise.resolve(false);
  }

  return Promise.resolve(true);
}
