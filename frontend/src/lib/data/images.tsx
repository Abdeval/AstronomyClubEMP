import { CategoryCardType, GroupCardType } from "../types";

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