import { Group, GroupStatus } from "shared-types";

// Sample data
export const initialGroups: Group[] = [
  {
    id: "1",
    name: "Marketing Team",
    description: "Team responsible for marketing campaigns and strategies",
    status: "ACTIVE",
    rating: 4.5,
    image: "/placeholder.svg?height=100&width=100",
    createdAt: new Date(2023, 5, 15),
    // members: [
    //   { id: "m1", : "John Doe", email: "john@example.com", role: "leader" },
    //   { id: "m2", name: "Jane Smith", email: "jane@example.com", role: "member" },
    //   { id: "m3", name: "Alex Johnson", email: "alex@example.com", role: "member" },
    // ],
  },
  {
    id: "2",
    name: "Development Team",
    description: "Software engineers and developers",
    status: "ACTIVE",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
    createdAt: new Date(2023, 3, 10),
    // members: [
    //   { id: "m4", name: "Sarah Williams", email: "sarah@example.com", role: "leader" },
    //   { id: "m5", name: "Mike Brown", email: "mike@example.com", role: "member" },
    // ],
  },
  {
    id: "3",
    name: "Design Team",
    description: "UI/UX designers and graphic artists",
    status: "INACTIVE",
    rating: 3.7,
    image: "/placeholder.svg?height=100&width=100",
    createdAt: new Date(2023, 1, 5),
    // members: [
    //   { id: "m6", name: "Emily Davis", email: "emily@example.com", role: "leader" },
    //   { id: "m7", name: "Chris Wilson", email: "chris@example.com", role: "member" },
    //   { id: "m8", name: "Taylor Moore", email: "taylor@example.com", role: "member" },
    // ],
  },
  {
    id: "4",
    name: "Research Team",
    description: "Market research and analysis",
    status: "ARCHIVED",
    rating: 4.0,
    image: "/placeholder.svg?height=100&width=100",
    createdAt: new Date(2022, 11, 20),
    // members: [
    //   { id: "m9", name: "Jordan Lee", email: "jordan@example.com", role: "leader" },
    //   { id: "m10", name: "Casey Kim", email: "casey@example.com", role: "member" },
    // ],
  },
  {
    id: "5",
    name: "Customer Support",
    description: "Customer service and support",
    status: "PENDING",
    rating: 3.5,
    image: "/placeholder.svg?height=100&width=100",
    createdAt: new Date(2023, 7, 1),
    // members: [
    //   { id: "m11", name: "Riley Parker", email: "riley@example.com", role: "leader" },
    //   { id: "m12", name: "Morgan Taylor", email: "morgan@example.com", role: "member" },
    //   { id: "m13", name: "Jamie Garcia", email: "jamie@example.com", role: "member" },
    // ],
  },
];

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const getStatusColor = (status: GroupStatus) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-500";
    case "INACTIVE":
      return "bg-yellow-500";
    case "ARCHIVED":
      return "bg-gray-500";
    case "PENDING":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
