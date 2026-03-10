import { create } from "zustand";

export type Lang = "cn" | "en";

type LangStore = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLang = create<LangStore>((set) => ({
  lang: "cn",
  setLang: (lang) => set({ lang }),
}));
