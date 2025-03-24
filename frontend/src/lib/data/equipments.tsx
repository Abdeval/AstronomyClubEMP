import type { Equipment } from "@/lib/types";

// Sample equipment data
export const equipmentData: Equipment[] = [
  {
    id: "eq-1",
    name: "Celestron NexStar 8SE Telescope",
    description:
      "8-inch Schmidt-Cassegrain telescope with computerized GoTo mount, perfect for deep-sky observation and astrophotography.",
    group: "astrography",
    status: "available",
    acquisitionDate: "2023-03-15",
    cost: 1199.99,
    manualUrl: "https://www.celestron.com/products/nexstar-8se-computerized-telescope",
    image: "https://images.unsplash.com/photo-1566410824233-a8011929225c",
  },
  {
    id: "eq-2",
    name: "Dell PowerEdge R740 Server",
    description:
      "High-performance server for hosting the club's website, data processing, and image storage. 64GB RAM, 8TB storage.",
    group: "webdev",
    status: "in-use",
    assignedTo: "Web Team",
    acquisitionDate: "2022-11-10",
    cost: 3499.99,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  },
  {
    id: "eq-3",
    name: "Mars Rover Prototype v2",
    description:
      "Second-generation rover prototype with improved suspension, solar panels, and sample collection mechanisms.",
    group: "rovers",
    status: "maintenance",
    assignedTo: "Rover Team Lead",
    acquisitionDate: "2023-06-22",
    cost: 2750.0,
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
  },
  {
    id: "eq-4",
    name: "Canon EOS Ra Astrophotography Camera",
    description:
      "Specialized mirrorless camera for astrophotography with enhanced infrared sensitivity and 30.3 megapixel full-frame sensor.",
    group: "astrography",
    status: "in-use",
    assignedTo: "Sarah Johnson",
    acquisitionDate: "2023-01-05",
    cost: 2499.0,
    manualUrl: "https://www.canon.com/eos-ra",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  },
  {
    id: "eq-5",
    name: "Meeting Room Projector",
    description: "4K projector for presentations, workshops, and viewing astronomy images during club meetings.",
    group: "webdev",
    status: "available",
    acquisitionDate: "2022-09-18",
    cost: 899.99,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
  },
  {
    id: "eq-6",
    name: "Rover Control Station",
    description:
      "Custom-built workstation for rover programming, testing, and remote operation with dual monitors and specialized controllers.",
    group: "rovers",
    status: "available",
    acquisitionDate: "2023-04-30",
    cost: 1850.0,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6",
  },
  {
    id: "eq-7",
    name: "Sky-Watcher EQ6-R Pro Mount",
    description: "Professional equatorial mount for astrophotography with 20kg payload capacity and precise tracking.",
    group: "astrography",
    status: "in-use",
    assignedTo: "Michael Chen",
    acquisitionDate: "2023-02-12",
    cost: 1599.0,
    manualUrl: "https://www.skywatcherusa.com/products/eq6-r-pro",
    image: "https://images.unsplash.com/photo-1518141532615-4305c9f914c9",
  },
  {
    id: "eq-8",
    name: "Raspberry Pi Weather Station",
    description:
      "Custom weather monitoring system for the observatory with temperature, humidity, wind, and cloud cover sensors.",
    group: "webdev",
    status: "maintenance",
    assignedTo: "Tech Support",
    acquisitionDate: "2022-12-05",
    cost: 350.0,
    image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a",
  },
  {
    id: "eq-9",
    name: "Rover Wheel Assembly Kit",
    description:
      "Specialized wheel and suspension components for rover prototypes, designed for rough terrain simulation.",
    group: "rovers",
    status: "available",
    acquisitionDate: "2023-05-17",
    cost: 475.0,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
  },
]

// Function to get a single equipment item by ID
export function getEquipmentById(id: string): Equipment | undefined {
  return equipmentData.find((item) => item.id === id)
}

