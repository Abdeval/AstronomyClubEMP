import { Observation } from "../types"

// Sample data for observations
const sampleObservations: Observation[] = [
  {
    id: "1",
    title: "Perseid Meteor Shower",
    details:
      "Observed approximately 30 meteors per hour at the peak. The sky was exceptionally clear with minimal light pollution. Most meteors appeared to originate from the Perseus constellation as expected. Several bright fireballs were visible, with one particularly spectacular one leaving a persistent train that remained visible for about 10 seconds.",
    location: "Mountainside Observatory",
    date: new Date("2023-08-12T22:30:00"),
    userId: "user1",
    user: {
      id: "user1",
      firstName: "Jane Astronomer",
      email: "jane@example.com",
      image: "/avatars/1.png",
      role: "MEMBER"
    },
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0",
        title: "Meteor streak across night sky",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        title: "Milky Way with meteor",
      },
    ],
  },
  {
    id: "2",
    title: "Saturn Opposition",
    details:
      "Observed Saturn at opposition using a 10-inch Dobsonian telescope. The rings were clearly visible, as were several of Saturn's moons including Titan, Rhea, and Dione. Atmospheric conditions were good with seeing rated at 7/10. Used a 9mm eyepiece for detailed viewing.",
    location: "Backyard Observatory",
    date: new Date("2023-08-27T21:15:00"),
    userId: "user2",
    user: {
      id: "user2",
      firstName: "Alex Stargazer",
      email: "alex@example.com",
      image: "/avatars/2.png",
      role: "MEMBER"
    },
    images: [
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
        title: "Saturn through telescope",
      },
    ],
  },
  {
    id: "3",
    title: "Lunar Eclipse",
    details:
      "Observed the total lunar eclipse from start to finish. The Moon took on a deep red color during totality. Photographed the event using a 200mm lens with a 2x teleconverter. Weather conditions were perfect with no cloud cover.",
    location: "City Park",
    date: new Date("2023-10-28T19:45:00"),
    userId: "user1",
    user: {
      id: "user1",
      firstName: "Jane Astronomer",
      email: "jane@example.com",
      image: "/avatars/1.png",
      role: "MEMBER"
    },
    images: [
      {
        id: "img4",
        url: "https://images.unsplash.com/photo-1548087113-87d27ca20cff",
        title: "Blood moon during eclipse",
      },
      {
        id: "img5",
        url: "https://images.unsplash.com/photo-1540562558394-e6b267df2e6a",
        title: "Eclipse sequence",
      },
      {
        id: "img6",
        url: "https://images.unsplash.com/photo-1518141532615-4305c9f914c9",
        title: "Moon entering umbra",
      },
    ],
  },
  {
    id: "4",
    title: "Andromeda Galaxy (M31)",
    details:
      "Observed the Andromeda Galaxy using both binoculars and a 6-inch reflector telescope. The galaxy's core was clearly visible, with hints of the spiral arms under dark sky conditions. Sketched the observation and compared with reference images.",
    location: "Dark Sky Preserve",
    date: new Date("2023-09-15T23:00:00"),
    userId: "user3",
    user: {
      id: "user3",
      firstName: "Sam Cosmos",
      email: "sam@example.com",
      image: "/avatars/3.png",
      role: "MEMBER"
    },
    images: [
      {
        id: "img7",
        url: "https://images.unsplash.com/photo-1579566346927-c68383817a25",
        title: "Andromeda Galaxy long exposure",
      },
    ],
  },
  {
    id: "5",
    title: "Jupiter and Its Moons",
    details:
      "Observed Jupiter and its four Galilean moons: Io, Europa, Ganymede, and Callisto. The Great Red Spot was visible during the observation period. Used a 12mm eyepiece with a 2x Barlow lens for detailed viewing. Atmospheric turbulence was minimal.",
    location: "University Observatory",
    date: new Date("2023-11-03T20:30:00"),
    userId: "user2",
    user: {
      id: "user2",
      firstName: "Alex Stargazer",
      email: "alex@example.com",
      image: "/avatars/2.png",
      role: "MEMBER"
    },
    images: [
      {
        id: "img8",
        url: "https://images.unsplash.com/photo-1630839437035-dac17da580d0",
        title: "Jupiter with visible bands",
      },
      {
        id: "img9",
        url: "https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4",
        title: "Jupiter and moons alignment",
      },
    ],
  },
]

// Function to get all observations
export async function getObservations(): Promise<Observation[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(sampleObservations)
}

// Function to get a single observation by ID
export async function getObservationById(id: string): Promise<Observation | null> {
  // In a real app, this would fetch from an API or database
  const observation = sampleObservations.find((obs) => obs.id === id)
  return Promise.resolve(observation || null)
}

// Function to create a new observation
export async function createObservation(observation: Omit<Observation, "id">): Promise<Observation> {
  // In a real app, this would send data to an API or database
  const newObservation: Observation = {
    ...observation,
    id: `new-${Date.now()}`,
  }

  return Promise.resolve(newObservation)
}

// Function to update an observation
export async function updateObservation(id: string, observation: Partial<Observation>): Promise<Observation | null> {
  // In a real app, this would send data to an API or database
  const index = sampleObservations.findIndex((obs) => obs.id === id)

  if (index === -1) {
    return Promise.resolve(null)
  }

  const updatedObservation: Observation = {
    ...sampleObservations[index],
    ...observation,
  }

  return Promise.resolve(updatedObservation)
}

// Function to delete an observation
export async function deleteObservation(id: string): Promise<boolean> {
  // In a real app, this would send a request to an API or database
  const index = sampleObservations.findIndex((obs) => obs.id === id)

  if (index === -1) {
    return Promise.resolve(false)
  }

  return Promise.resolve(true)
}

