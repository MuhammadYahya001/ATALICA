export interface Project {
  id: string;
  slug: string;
  title: string;
  categorySlug: "living" | "bedroom" | "workroom" | "kitchen" | "details" | "exterior";
  categoryLabel: string;
  image: string;
  description: string;
  imageOrientation?: "portrait";
  featured: boolean;
}

// These images are presented as design references. No source material was
// available to verify them as completed ATALICA projects.
export const PROJECTS: Project[] = [
  {
    id: "ref-01",
    slug: "living-space-reference-01",
    title: "Living Spaces 01",
    categorySlug: "living",
    categoryLabel: "Living Spaces",
    image: "/images/optimized/projects/livingroom1.webp",
    description: "Warm neutrals and relaxed upholstery shape a calm, welcoming living space.",
    featured: true,
  },
  {
    id: "ref-02",
    slug: "bedroom-reference-01",
    title: "Bedroom 01",
    categorySlug: "bedroom",
    categoryLabel: "Bedrooms",
    image: "/images/optimized/projects/bedroom2.webp",
    description: "Layered bedding and a soft palette bring quiet comfort to the room.",
    featured: true,
  },
  {
    id: "ref-03",
    slug: "workroom-reference-01",
    title: "Workroom 01",
    categorySlug: "workroom",
    categoryLabel: "Workrooms",
    image: "/images/optimized/projects/office1.webp",
    description: "A composed work setting pairs practical lines with a measured, warm palette.",
    featured: true,
  },
  {
    id: "ref-04",
    slug: "exterior-reference-01",
    title: "Exterior 01",
    categorySlug: "exterior",
    categoryLabel: "Exteriors",
    image: "/images/optimized/projects/exterior.webp",
    description: "A clear façade and balanced proportions define the building’s presence.",
    imageOrientation: "portrait",
    featured: true,
  },
  {
    id: "ref-05",
    slug: "kitchen-reference-01",
    title: "Kitchen 01",
    categorySlug: "kitchen",
    categoryLabel: "Kitchens",
    image: "/images/optimized/projects/kitchen1.webp",
    description: "Clean cabinetry and considered finishes keep the kitchen feeling composed.",
    featured: false,
  },
  {
    id: "ref-06",
    slug: "ceiling-reference-01",
    title: "Ceiling Detail 01",
    categorySlug: "details",
    categoryLabel: "Architectural Details",
    image: "/images/optimized/projects/ceiling1.webp",
    description: "A ceiling detail gives the room structure through line, light, and finish.",
    featured: false,
  },
  {
    id: "ref-07",
    slug: "staircase-reference-01",
    title: "Staircase 01",
    categorySlug: "details",
    categoryLabel: "Architectural Details",
    image: "/images/optimized/projects/stairs.webp",
    description: "Strong geometry and carefully aligned steps bring character to the interior.",
    imageOrientation: "portrait",
    featured: false,
  },
  {
    id: "ref-08",
    slug: "living-space-reference-02",
    title: "Living Spaces 02",
    categorySlug: "living",
    categoryLabel: "Living Spaces",
    image: "/images/optimized/projects/livingroom2.webp",
    description: "Sculptural forms and soft textures create an inviting place to gather.",
    featured: false,
  },
  {
    id: "ref-09",
    slug: "bedroom-reference-02",
    title: "Bedroom 02",
    categorySlug: "bedroom",
    categoryLabel: "Bedrooms",
    image: "/images/optimized/projects/bedroom4b.webp",
    description: "Muted tones and tactile layers give this bedroom a restful quality.",
    featured: false,
  },
];

export const CATEGORIES = [
  { label: "All Projects", slug: "all" },
  { label: "Living Spaces", slug: "living" },
  { label: "Bedrooms", slug: "bedroom" },
  { label: "Workrooms", slug: "workroom" },
  { label: "Kitchens", slug: "kitchen" },
  { label: "Architectural Details", slug: "details" },
  { label: "Exteriors", slug: "exterior" },
] as const;

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
