import { getProjects } from "@/lib/firebase-utils";
import { create } from "zustand";

type Project = {
  id: string;
  title?: string;
  link?: string;
  createdAt?: string;
  tags?: string[];
  image?: string;
  description?: string;
  featured?: string
};

interface ProjectState {
  projects: Project[];
  // Action to update certificates
  setProjects: (certificates: Project[]) => void;
  // Action to add a single certificate
  addProjects: (certificate: Project) => void;
  getProjects: () => void
}

const useProjectsStore = create<ProjectState>((set, get) => ({
  projects: [],

  setProjects: (projects) => set({ projects }),

  addProjects: (certificate) =>
    set((state) => ({
      projects: [...state.projects, certificate],
    })),

  getProjects: async function () {
    const response = await getProjects();
    const { setProjects } = get();
    setProjects(response);
  },
}));

export default useProjectsStore;