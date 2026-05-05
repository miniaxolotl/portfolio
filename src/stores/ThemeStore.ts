import { makeAutoObservable } from "mobx";
import { getCookie, setCookie } from "@/lib/cookies";

const THEME_COOKIE = "theme";

class ThemeStore {
  isDark = false;

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  hydrate = () => {
    if (typeof document === "undefined") return;
    const stored = getCookie(THEME_COOKIE);
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.isDark = stored === "dark" || (!stored && systemPrefersDark);
    this.apply();
  };

  toggle = () => {
    this.isDark = !this.isDark;
    this.apply();
  };

  sync = () => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", this.isDark);
  };

  private apply = () => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", this.isDark);
    setCookie(THEME_COOKIE, this.isDark ? "dark" : "light");
  };
}

export const themeStore = new ThemeStore();
