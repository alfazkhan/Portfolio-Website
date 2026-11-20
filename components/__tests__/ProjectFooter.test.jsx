import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectFooter from "../ProjectFooter";

vi.mock("@chakra-ui/react", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    Button: ({ children, onClick, display, type, "aria-label": ariaLabel }) =>
      display === "none" ? null : (
        <button type={type} aria-label={ariaLabel} onClick={onClick}>
          {children}
        </button>
      ),
    Flex: ({ children }) => <div>{children}</div>,
  };
});

vi.mock("@/components/ui/color-mode", () => ({
  useColorMode: () => ({ colorMode: "light" }),
}));

vi.mock("react-icons/fa6", () => ({
  FaChrome: (props) => <span {...props} data-icon="fa-chrome" />,
  FaEye: (props) => <span {...props} data-icon="fa-eye" />,
  FaFirefox: (props) => <span {...props} data-icon="fa-firefox" />,
  FaGithub: (props) => <span {...props} data-icon="fa-github" />,
}));

describe("ProjectFooter", () => {
  beforeEach(() => {
    vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders repository and live-preview actions without download links", async () => {
    const user = userEvent.setup();
    render(
      <ProjectFooter
        repoLink="https://github.com/example/sample"
        liveLink="https://example.com"
      />,
    );

    const repoButton = screen.getByRole("button", { name: "Github Repo" });
    const previewButton = screen.getByRole("button", { name: "Live Preview" });

    expect(
      screen.queryByRole("button", { name: /Chrome Store|Firefox Store/i }),
    ).not.toBeInTheDocument();

    await user.click(repoButton);
    await user.click(previewButton);

    expect(window.open).toHaveBeenNthCalledWith(
      1,
      "https://github.com/example/sample",
    );
    expect(window.open).toHaveBeenNthCalledWith(2, "https://example.com");
  });

  it("renders repository and store download actions on supported desktop platforms", async () => {
    const user = userEvent.setup();
    vi.spyOn(window.navigator, "platform", "get").mockReturnValue("Win32");

    const downloadLinks = {
      chrome: "https://example.com/chrome",
      firefox: "https://example.com/firefox",
    };

    render(
      <ProjectFooter
        repoLink="https://github.com/example/extension"
        liveLink="https://example.com"
        downloadLinks={downloadLinks}
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Live Preview" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Github Repo" }));
    await user.click(screen.getByRole("button", { name: "Chrome Store" }));
    await user.click(screen.getByRole("button", { name: "Firefox Store" }));

    expect(window.open).toHaveBeenNthCalledWith(
      1,
      "https://github.com/example/extension",
    );
    expect(window.open).toHaveBeenNthCalledWith(2, downloadLinks.chrome);
    expect(window.open).toHaveBeenNthCalledWith(3, downloadLinks.firefox);
  });

  it("hides browser store buttons on unsupported platforms", () => {
    vi.spyOn(window.navigator, "platform", "get").mockReturnValue("iPhone");

    render(
      <ProjectFooter
        repoLink="https://github.com/example/extension"
        downloadLinks={{
          chrome: "https://example.com/chrome",
          firefox: "https://example.com/firefox",
        }}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Github Repo" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Chrome Store" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Firefox Store" }),
    ).not.toBeInTheDocument();
  });

  it("disambiguates button accessible names when projectTitle is provided", () => {
    render(
      <ProjectFooter
        projectTitle="Subreddit Analyzer"
        repoLink="https://github.com/example/analyzer"
        liveLink="https://analyzer.example.com"
      />,
    );

    expect(
      screen.getByRole("button", { name: "Github Repo — Subreddit Analyzer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Live Preview — Subreddit Analyzer" }),
    ).toBeInTheDocument();
  });
});
