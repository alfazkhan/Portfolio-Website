import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorModeProvider, useColorMode } from "../ui/color-mode";

function ThemeProbe() {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  return (
    <div>
      <span data-testid="color-mode">{colorMode || "uninitialized"}</span>
      <button onClick={toggleColorMode}>Toggle</button>
      <button onClick={() => setColorMode("system")}>Use system</button>
    </div>
  );
}

function renderThemeProbe() {
  return render(
    <ColorModeProvider>
      <ThemeProbe />
    </ColorModeProvider>,
  );
}

describe("color mode", () => {
  let systemIsDark;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.style.colorScheme = "";
    systemIsDark = false;
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: systemIsDark,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("uses a saved theme instead of the system preference", async () => {
    window.localStorage.setItem("theme", "dark");
    renderThemeProbe();

    await waitFor(() => {
      expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
    });
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("follows the system preference when no theme is saved", async () => {
    systemIsDark = true;
    renderThemeProbe();

    await waitFor(() => {
      expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
    });
    expect(window.localStorage.getItem("theme")).toBeNull();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("persists a toggle and restores system selection on request", async () => {
    const user = userEvent.setup();
    renderThemeProbe();

    await waitFor(() => {
      expect(screen.getByTestId("color-mode")).toHaveTextContent("light");
    });

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");

    await user.click(screen.getByRole("button", { name: "Use system" }));
    expect(screen.getByTestId("color-mode")).toHaveTextContent("light");
    expect(window.localStorage.getItem("theme")).toBe("system");
    expect(document.documentElement).toHaveClass("light");
  });
});
