export type Cassette = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  year: string;
  tag: string;
  screenshots: string[];
  pdf?: string;
  featured?: boolean;
  download?: {
    href: string;
    filename: string;
    label: string;
  };
};

export const cassettes: Cassette[] = [
  {
    id: "cv",
    title: "Resume",
    subtitle: "2026 · A-side: work, B-side: person",
    year: "2026",
    tag: "CV",
    featured: true,
    screenshots: ["/cassettes/cv/01.svg"],
    pdf: "/cv.pdf",
    download: {
      href: "/cv.pdf",
      filename: "Ziaul-Islam-Resume-2026.pdf",
      label: "↓ DOWNLOAD CV",
    },
  },
  {
    id: "gaming",
    title: "Gaming",
    subtitle: "Any platform, any medium",
    description:
      "Love gaming on any platform or medium — PC, console, mobile, VR. Especially competitive games like CS2, Rocket League, Battlefield 6. Story games on console like RDR2, The Last of Us. All-time favourites are souls games — Elden Ring, Black Myth: Wukong. Recently hooked on destroying lobbies in BF6 with my squad.",
    year: "∞",
    tag: "PLAY",
    screenshots: [
      "/cassettes/gaming/01.jpeg",
      "/cassettes/gaming/02.jpeg",
      "/cassettes/gaming/03.jpg",
      "/cassettes/gaming/04.jpg",
      "/cassettes/gaming/05.jpeg",
    ],
  },
  {
    id: "anime",
    title: "Anime",
    subtitle: "Shonen heart, slow stories",
    description:
      "Grew up on Naruto, Bleach, DBZ. Stayed for Attack on Titan's storytelling and Haikyuu's quiet emotional gut-punches. Character over plot, atmosphere over arc — the long arcs always hit hardest.",
    year: "∞",
    tag: "WATCH",
    screenshots: [
      "/cassettes/anime/01.png",
      "/cassettes/anime/02.png",
      "/cassettes/anime/03.jpg",
      "/cassettes/anime/04.jpg",
      "/cassettes/anime/05.jpg",
      "/cassettes/anime/06.png",
    ],
  },
  {
    id: "travel",
    title: "Travel",
    subtitle: "Boarding pass, carry-on, curiosity",
    year: "∞",
    tag: "TRIP",
    screenshots: [
      "/cassettes/travel/01.jpeg",
      "/cassettes/travel/02.jpeg",
      "/cassettes/travel/03.jpeg",
      "/cassettes/travel/04.jpeg",
      "/cassettes/travel/05.jpeg",
      "/cassettes/travel/06.jpeg",
    ],
  },
  {
    id: "hobbies",
    title: "Sketch & Snowy",
    subtitle: "Pencil lines, cat naps",
    description:
      "Sketching my favourite anime characters between projects — pencil on paper, mostly faces and fight scenes. The rest of the off-hours go to my cat Snowy: full of feedback, zero deadlines, the best art director I've worked with.",
    year: "∞",
    tag: "DRAW",
    screenshots: [
      "/cassettes/hobbies/01.jpeg",
      "/cassettes/hobbies/02.jpeg",
      "/cassettes/hobbies/03.jpeg",
      "/cassettes/hobbies/04.jpeg",
    ],
  },
];
