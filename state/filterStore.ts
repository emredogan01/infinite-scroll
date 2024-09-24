// src/store/filterStore.ts
import { create } from "zustand";
import { UrlEnds, Languages } from "@/types";

interface FilterState {
  urlEnd: UrlEnds;
  language: Languages;
  setUrlEnd: (urlEnd: UrlEnds) => void;
  setLanguage: (language: Languages) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  urlEnd: "top_rated",
  language: "en-US",
  setUrlEnd: (urlEnd) => set({ urlEnd }),
  setLanguage: (language) => set({ language }),
}));

export default useFilterStore;
