import { atom } from "nanostores";

export type ViewName = "home" | "uebungen" | "shop" | "einstelugen";

// default value "home"
export const currentView = atom<ViewName>("home");
