import { CategoryCardType, GroupCardType } from "../types";
import { ImageType } from "../types";

export const groupList: GroupCardType[] = [
  {
    name: "rovers",
    icon: "/images/groups/rover.png",
    isActive: true,
    image: "/images/groups/rover.jpg",
  },
  {
    name: "web dev",
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
    { title: "mercury", image: "/planet-icons/earth.png" , border: "" },
    { title: "venus", image: "/planet-icons/jupiter.png", border: ""},
    { title: "earth", image: "/planet-icons/mars.png", border: "" },
    { title: "mars", image: "/planet-icons/perpule.png", border: "" },
    { title: "jupiter", image: "/planet-icons/earth.png", border: "" },
    { title: "saturn", image: "/planet-icons/mars.png", border: "" },
    { title: "uranus", image: "/planet-icons/jupiter.png", border: "" },
    { title: "neptune", image: "/planet-icons/perpule.png", border: "" },
] 