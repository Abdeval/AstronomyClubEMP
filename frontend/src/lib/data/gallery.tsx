export interface AstronomyImage {
    src: string
    thumbnail?: string // Optional smaller version for grid
    title: string
    description: string
    date: string
    credit?: string
    tags: string[]
  }
  
  export const astronomyImages: AstronomyImage[] = [
    {
      src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
      title: "Milky Way Galaxy",
      description:
        "A stunning view of the Milky Way galaxy stretching across the night sky. This long-exposure photograph captures the dense band of stars that make up our home galaxy.",
      date: "June 15, 2023",
      credit: "NASA/ESA",
      tags: ["Galaxy", "Milky Way", "Night Sky"],
    },
    {
      src: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700",
      title: "Andromeda Galaxy (M31)",
      description:
        "The Andromeda Galaxy, also known as Messier 31, is a spiral galaxy approximately 2.5 million light-years from Earth. It is the nearest major galaxy to the Milky Way.",
      date: "January 22, 2023",
      credit: "ESO/Hubble",
      tags: ["Galaxy", "Andromeda", "M31"],
    },
    {
      src: "https://images.unsplash.com/photo-1614642535054-8f358fe9036d",
      title: "Lunar Eclipse",
      description:
        "A total lunar eclipse occurs when the Earth comes between the Sun and the Moon, casting a shadow on the Moon. This gives the Moon a reddish appearance, often called a 'Blood Moon'.",
      date: "May 26, 2022",
      credit: "Amateur Astronomy Association",
      tags: ["Moon", "Eclipse", "Lunar"],
    },
    {
      src: "https://images.unsplash.com/photo-1614642240262-a452c2c11724",
      title: "Saturn and Its Rings",
      description:
        "Saturn is the sixth planet from the Sun and is known for its prominent ring system, which consists of nine continuous main rings and three discontinuous arcs.",
      date: "July 10, 2023",
      credit: "NASA/JPL-Caltech",
      tags: ["Planet", "Saturn", "Rings"],
    },
    {
      src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
      title: "Northern Lights (Aurora Borealis)",
      description:
        "The Aurora Borealis, or Northern Lights, is a natural light display in the Earth's sky, predominantly seen in high-latitude regions. It's caused by disturbances in the magnetosphere by solar wind.",
      date: "March 5, 2023",
      credit: "Arctic Observatory",
      tags: ["Aurora", "Northern Lights", "Atmosphere"],
    },
    {
      src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
      title: "Orion Nebula (M42)",
      description:
        "The Orion Nebula is a diffuse nebula situated in the Milky Way, south of Orion's Belt. It is one of the brightest nebulae and is visible to the naked eye in the night sky.",
      date: "December 18, 2022",
      credit: "ESO/VLT",
      tags: ["Nebula", "Orion", "M42"],
    },
    {
      src: "https://images.unsplash.com/photo-1465101162946-4377e57745c3",
      title: "Solar Flare",
      description:
        "A solar flare is a sudden flash of increased brightness on the Sun, usually observed near its surface. Flares are often accompanied by a coronal mass ejection.",
      date: "August 3, 2023",
      credit: "NASA Solar Dynamics Observatory",
      tags: ["Sun", "Solar Flare", "Star"],
    },
    {
      src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031",
      title: "International Space Station",
      description:
        "The International Space Station (ISS) is a modular space station in low Earth orbit. It's a multinational collaborative project involving NASA, Roscosmos, JAXA, ESA, and CSA.",
      date: "February 12, 2023",
      credit: "NASA",
      tags: ["ISS", "Space Station", "Orbit"],
    },
    {
      src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
      title: "Meteor Shower",
      description:
        "A meteor shower is a celestial event in which a number of meteors are observed to radiate from one point in the night sky. These meteors are caused by streams of cosmic debris entering Earth's atmosphere at extremely high speeds.",
      date: "August 12, 2022",
      credit: "International Meteor Organization",
      tags: ["Meteor", "Shower", "Perseids"],
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      title: "Hubble Deep Field",
      description:
        "The Hubble Deep Field is an image of a small region in the constellation Ursa Major, constructed from a series of observations by the Hubble Space Telescope. It shows some of the most distant galaxies ever captured by an optical telescope.",
      date: "April 30, 2023",
      credit: "NASA/ESA/Hubble",
      tags: ["Deep Field", "Hubble", "Galaxies"],
    },
    {
      src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
      title: "Crab Nebula (M1)",
      description:
        "The Crab Nebula is a supernova remnant in the constellation of Taurus. The nebula was first observed in 1731 by John Bevis, and corresponds to a bright supernova recorded by Chinese astronomers in 1054 AD.",
      date: "November 5, 2022",
      credit: "Chandra X-ray Observatory",
      tags: ["Nebula", "Supernova", "M1"],
    },
    {
      src: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45",
      title: "Mars Surface",
      description:
        "This high-resolution image of the Martian surface shows the characteristic red soil and rocky terrain. The image was captured by a rover exploring the planet's surface.",
      date: "October 15, 2023",
      credit: "NASA/JPL-Caltech",
      tags: ["Mars", "Planet", "Surface"],
    },
  ]
  
  