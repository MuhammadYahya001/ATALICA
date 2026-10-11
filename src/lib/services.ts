export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "service-interior-design",
    slug: "interior-design",
    title: "Interior Design",
    shortDesc: "Residential interior design for spaces shaped around your needs.",
    fullDesc: "A considered approach to planning and designing residential interiors.",
    image: "/images/optimized/projects/livingroom1.webp",
  },
  {
    id: "service-construction",
    slug: "construction",
    title: "Construction",
    shortDesc: "Residential construction services.",
    fullDesc: "Discuss your residential construction requirements with ATALICA.",
    image: "/images/optimized/projects/exterior.webp",
  },
  {
    id: "service-decor-styling",
    slug: "decor-and-styling",
    title: "Décor & Styling",
    shortDesc: "Décor and styling for residential interiors.",
    fullDesc: "Finishing details and styling for residential spaces.",
    image: "/images/optimized/projects/livingroom4.webp",
  },
];

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
