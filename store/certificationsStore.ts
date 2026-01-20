import { getCertifications } from "@/lib/firebase-utils";
import { create } from "zustand";

type Certificate = {
  id: string;
  title?: string;
  date?: string;
  image?: string;
  issuer?: string;
  link?: string;
};

interface CertificationState {
  certificates: Certificate[];
  // Action to update certificates
  setCertificates: (certificates: Certificate[]) => void;
  // Action to add a single certificate
  addCertificate: (certificate: Certificate) => void;
  getCertificates: () => void;
}

const useCertificationStore = create<CertificationState>((set, get) => ({
  certificates: [],

  setCertificates: (certificates) => set({ certificates }),

  addCertificate: (certificate) =>
    set((state) => ({
      certificates: [...state.certificates, certificate],
    })),

  getCertificates: async function () {
    const response = await getCertifications();
    const { setCertificates } = get();
    setCertificates(response);
  },
}));

export default useCertificationStore;
