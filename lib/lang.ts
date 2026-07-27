import { create } from "zustand";

export type Lang = "cn" | "en";

type LangStore = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

// Site is English-only. `lang` is pinned to "en" and setLang is a no-op.
// Chinese copy is archived in _archive/chinese-copy-archive.md — to restore
// bilingual mode, revert this default and re-add the CN branches + Navbar toggle.
export const useLang = create<LangStore>((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
}));
