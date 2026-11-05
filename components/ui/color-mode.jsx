"use client";

import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const STORAGE_KEY = "theme";
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";
const ThemeContext = React.createContext(null);

function getStoredTheme() {
  try {
    const theme = window.localStorage.getItem(STORAGE_KEY);
    return theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";
  } catch {
    return "system";
  }
}

function resolveTheme(theme, systemIsDark) {
  return theme === "system" ? (systemIsDark ? "dark" : "light") : theme;
}

function applyTheme(theme) {
  const root = document.documentElement;
  const style = document.createElement("style");
  style.textContent =
    "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
  document.head.appendChild(style);

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;

  window.getComputedStyle(document.body);
  window.setTimeout(() => style.remove(), 1);
}

export function ColorModeProvider({ children }) {
  const [theme, setThemeState] = React.useState();
  const [resolvedTheme, setResolvedTheme] = React.useState();
  const themeRef = React.useRef();

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_QUERY);

    const updateTheme = (nextTheme = getStoredTheme()) => {
      const nextResolvedTheme = resolveTheme(nextTheme, mediaQuery.matches);
      themeRef.current = nextTheme;
      setThemeState(nextTheme);
      setResolvedTheme(nextResolvedTheme);
      applyTheme(nextResolvedTheme);
    };

    const handleSystemChange = () => {
      if (themeRef.current === "system") updateTheme("system");
    };
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) updateTheme();
    };

    updateTheme();
    mediaQuery.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setTheme = React.useCallback((nextTheme) => {
    const value =
      typeof nextTheme === "function"
        ? nextTheme(themeRef.current || "system")
        : nextTheme;

    themeRef.current = value;
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Theme changes still apply for this page when storage is unavailable.
    }

    const resolved = resolveTheme(
      value,
      window.matchMedia(SYSTEM_QUERY).matches,
    );
    setThemeState(value);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("Color-mode hooks must be used within ColorModeProvider.");
  }
  return context;
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode = resolvedTheme;
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();
    return (
      <ClientOnly fallback={<Skeleton boxSize="9" />}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
          size="sm"
          ref={ref}
          {...props}
          css={{
            _icon: {
              width: "5",
              height: "5",
            },
          }}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    );
  },
);

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme light"
      colorPalette="gray"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  );
});

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  );
});