import { ImageCategory } from "shared-types";
import { CategoryCardType, GroupCardType } from "../types";
import { ImageType } from "../types";
import { Telescope, Users, ActivityIcon as EventIcon, Star, ImageIcon } from "lucide-react";

export const groupList: GroupCardType[] = [
  {
    name: "rovers",
    icon: "/images/groups/rover.png",
    isActive: true,
    image: "/images/groups/rover.jpg",
  },
  {
    name: "development",
    icon: "/images/groups/web.png",
    isActive: true,
    image: "/images/groups/web.jpg",
  },
  {
    name: "astrography",
    icon: "Telescope",
    isActive: false,
    image: "/images/groups/astrography.jpg",
  },
];

export const categoryList: CategoryCardType[] = [
  {
    name: "planets",
    image: "/images/categories/planets.jpg",
  },
  {
    name: "galaxies",
    image: "/images/categories/galaxies.jpg",
  },
  {
    name: "sinners",
    image: "/images/categories/sinners.jpg",
  },
];


export const planetsImages:Partial<ImageType>[] = [
    { title: "mercury", url: "/planet-icons/earth.png" ,  },
    { title: "venus", url: "/planet-icons/jupiter.png", },
    { title: "earth", url: "/planet-icons/mars.png",  },
    { title: "mars", url: "/planet-icons/perpule.png",  },
    { title: "jupiter", url: "/planet-icons/earth.png",  },
    { title: "saturn", url: "/planet-icons/mars.png",  },
    { title: "uranus", url: "/planet-icons/jupiter.png",  },
    { title: "neptune", url: "/planet-icons/perpule.png",  },
] 

// Get category icon
export const getCategoryIcon = (category: ImageCategory) => {
  switch (category) {
    case "GROUP":
      return <Users className="h-4 w-4" />
    case "OBSERVATION":
      return <Telescope className="h-4 w-4" />
    case "EVENT":
      return <EventIcon className="h-4 w-4" />
    case "OTHER":
      return <Star className="h-4 w-4" />
    default:
      return <ImageIcon className="h-4 w-4" />
  }
}

// Get category label
export const getCategoryLabel = (category: ImageCategory) => {
  switch (category) {
    case "GROUP":
      return "Group"
    case "OBSERVATION":
      return "Observation"
    case "EVENT":
      return "Event"
    case "OTHER":
      return "Other"
    default:
      return category
  }
}