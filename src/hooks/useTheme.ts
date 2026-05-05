"use client";

import { useCallback, useEffect, useState } from "react";
import { ThemeMode } from "@/enums/theme";

const STORAGE_KEY = "theme";

const getStoredTheme = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const setStoredTheme = (value: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
};

export const useTheme = () => {
  // Default to true (dark) to match server-rendered html class="dark"
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = getStoredTheme();
    const prefersDark =
      stored === "dark" ||
      (!stored && document.documentElement.classList.contains("dark"));
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        setStoredTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        setStoredTheme("light");
      }
      return next;
    });
  }, []);

  return {
    theme: isDark ? ThemeMode.Dark : ThemeMode.Light,
    toggle,
    isDark,
  };
};
