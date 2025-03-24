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
    { title: "mercury", url: "/planet-icons/earth.png" , border: "" },
    { title: "venus", url: "/planet-icons/jupiter.png", border: ""},
    { title: "earth", url: "/planet-icons/mars.png", border: "" },
    { title: "mars", url: "/planet-icons/perpule.png", border: "" },
    { title: "jupiter", url: "/planet-icons/earth.png", border: "" },
    { title: "saturn", url: "/planet-icons/mars.png", border: "" },
    { title: "uranus", url: "/planet-icons/jupiter.png", border: "" },
    { title: "neptune", url: "/planet-icons/perpule.png", border: "" },
] 