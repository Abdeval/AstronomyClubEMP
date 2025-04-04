// import { User } from "shared-types"
import { UserType } from "../types"

// Sample data for users
const sampleUsers: UserType[] = [
  {
      id: "user1",
      firstName: "Jane",
      email: "jane@example.com",
      avatar: "/avatars/1.png",
      lastName: "Astronomer",
      role: "USER",
    },
  {
    id: "user2",
    firstName: "Alex",
    email: "alex@example.com",
    avatar: "/avatars/2.png",
    lastName: "Stargazer",
    role: "USER"
  },
  {
    id: "user3",
    firstName: "Alex",
    email: "alex@example.com",
    avatar: "/avatars/2.png",
    lastName: "Stargazer",
    role: "USER"
  },
]

// Function to get all users
export async function getUsers(): Promise<UserType[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(sampleUsers)
}

// Function to get a single user by ID
export async function getUserById(id: string): Promise<UserType | null> {
  // In a real app, this would fetch from an API or database
  const user = sampleUsers.find((user) => user.id === id)
  return Promise.resolve(user || null)
}

