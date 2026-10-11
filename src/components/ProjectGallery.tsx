"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project, CATEGORIES } from "@/lib/projects";

interface ProjectGalleryProps {
  projects: Project[];
  initialCategory?: string;
}

export default function ProjectGallery({
  projects,
  initialCategory = "all",
}: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.categorySlug === selectedCategory);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="gallery-filter-scroll -mx-6 mb-10 flex items-center justify-start gap-6 overflow-x-auto border-b border-[#E8E6E1] px-6 pb-4 text-[10px] font-montserrat uppercase tracking-[0.17em] sm:mx-0 sm:mb-14 sm:gap-8 sm:px-0 sm:text-[11px] sm:tracking-[0.2em]"
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              aria-pressed={isActive}
              className={`pb-3 -mb-px whitespace-nowrap transition-colors duration-200 border-b focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A5B] ${
                isActive
                  ? "text-[#1A1A1A] border-[#1A1A1A] font-semibold"
                  : "text-gray-400 border-transparent hover:text-[#1A1A1A]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`animate-gallery-enter ${idx % 3 === 1 ? "lg:mt-16" : idx % 3 === 2 ? "lg:mt-8" : ""}`}
              style={{ animationDelay: `${Math.min(idx, 8) * 55}ms` }}
            >
              <ProjectCard project={project} priority={idx < 2} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-[#E8E6E1] rounded-sm p-8">
          <p className="text-gray-500 text-sm font-light">
            No projects in this category.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="mt-4 text-xs font-montserrat uppercase tracking-[0.18em] text-[#C98A5B] hover:underline"
          >
            View All Projects
          </button>
        </div>
      )}
    </div>
  );
}
