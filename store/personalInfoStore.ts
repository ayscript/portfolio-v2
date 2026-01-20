import { getPersonalInfo } from "@/lib/firebase-utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type personalInfo = {
  name?: string;
  title?: string;
  bio?: string;
  email?: string;
  location?: string;
  jobStatus?: string;
  website?: string;
  profilePicture?: string;
  skills?: string[];
  stats?: string[];
};

interface personalInfoType {
  personalInfo: personalInfo;
  setPersonalInfo: (personalInfo: personalInfo) => void;
  getPersonalInfo: () => void;
}

const personalInfoStore = create(
  persist<personalInfoType>(
    (set, get) => ({
      personalInfo: {},
      setPersonalInfo: (personalInfo) => set({ personalInfo }),
      getPersonalInfo: async function () {
        const response = await getPersonalInfo();
        const { setPersonalInfo } = get();
        setPersonalInfo(response);
      },
    }),
    { name: "personal-info-storage" },
  ),
);

export default personalInfoStore;
