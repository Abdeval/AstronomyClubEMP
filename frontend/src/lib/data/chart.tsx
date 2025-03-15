import { ChartConfig } from "@/components/ui/chart";


export const planetData = [
  { browser: "mercury", diameter: 4879, fill: "var(--color-mercury)" },
  { browser: "venus", diameter: 12104, fill: "var(--color-venus)" },
  { browser: "earth", diameter: 12756, fill: "var(--color-earth)" },
  { browser: "mars", diameter: 6792, fill: "var(--color-mars)" },
  { browser: "jupiter", diameter: 142984, fill: "var(--color-jupiter)" },
  { browser: "saturn", diameter: 120536, fill: "var(--color-saturn)" },
  { browser: "uranus", diameter: 51118, fill: "var(--color-uranus)" },
  { browser: "neptune", diameter: 49528, fill: "var(--color-neptune)" },
]


export const chartConfig = {
  // visitors: {
  //   label: "Visitors",
  // },
  mercury: {
    label: "Mercury",
    color: "hsl(var(--chart-1))",
  },
  venus: {
    label: "Venus",
    color: "hsl(var(--chart-2))",
  },
  earth: {
    label: "Earth",
    color: "hsl(var(--chart-3))",
  },
  mars: {
    label: "Mars",
    color: "hsl(var(--chart-4))",
  },
  jupiter: {
    label: "Jupiter",
    color: "hsl(var(--chart-5))",
  },
  saturn: {
    label: "Saturn",
    color: "hsl(var(--chart-1))",
  },
  uranus: {
    label: "Uranus",
    color: "hsl(var(--chart-2))",
  },
  neptune: {
    label: "Neptune",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

