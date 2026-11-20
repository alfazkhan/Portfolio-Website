import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage, { metadata } from "../privacy/page";

vi.mock("@chakra-ui/react", () => {
  const Wrapper = ({ as: Element = "div", children, ...props }) => (
    <Element {...props}>{children}</Element>
  );

  return {
    Box: Wrapper,
    Container: Wrapper,
    Flex: Wrapper,
    Link: ({ children, asChild, href, ...props }) => {
      if (asChild) return <>{children}</>;
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    },
  };
});

vi.mock("react-icons/fi", () => ({
  FiArrowLeft: () => <span data-icon="arrow-left" />,
}));

vi.mock("@/components/ManageCookiePreferencesButton", () => ({
  default: () => <button>Manage Cookie Preferences</button>,
}));

vi.mock("@/components/Footer", () => ({
  default: () => <footer aria-label="Site Footer" />,
}));

describe("Privacy Page Route (/privacy)", () => {
  it("exports correct metadata for SEO and canonical URL", () => {
    expect(metadata.title).toBe("Privacy Policy | Alfaz Khan");
    expect(metadata.alternates.canonical).toBe("/privacy");
    expect(metadata.openGraph.url).toBe("https://www.theonlyalfaz.com/privacy");
  });

  it("renders the static privacy policy HTML and navigation actions", () => {
    render(<PrivacyPage />);

    expect(
      screen.getByRole("link", { name: /Back to Portfolio/i }),
    ).toHaveAttribute("href", "/");

    const cookieButtons = screen.getAllByRole("button", {
      name: "Manage Cookie Preferences",
    });
    expect(cookieButtons.length).toBeGreaterThan(0);

    expect(screen.getByRole("contentinfo", { name: "Site Footer" })).toBeInTheDocument();
  });
});
