import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Intro from "../PageSections/Intro";
import websiteData from "../../data";

vi.mock("@chakra-ui/react", () => {
  const Wrapper = ({ as: Element = "div", children, id }) => (
    <Element id={id}>{children}</Element>
  );

  return {
    Box: Wrapper,
    Flex: Wrapper,
    Heading: ({ children }) => <h1>{children}</h1>,
    Highlight: ({ children }) => <>{children}</>,
  };
});

vi.mock("next/image", () => ({
  default: ({ src, alt }) => (
    <span
      role="img"
      aria-label={alt}
      data-src={typeof src === "string" ? src : src?.src || ""}
    />
  ),
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, style }) => <div style={style}>{children}</div>,
    p: ({ children }) => <p>{children}</p>,
    span: ({ children, style }) => <span style={style}>{children}</span>,
  },
}));

vi.mock("@/components/ui/CVDownloadButton", () => ({
  default: () => <button>Download CV</button>,
}));

afterEach(() => cleanup());

describe("Intro", () => {
  it("renders the profile introduction, image, and CV action", () => {
    render(<Intro />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      websiteData.introData.headline,
    );
    expect(screen.getByText(websiteData.introData.para)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Alfaz Profile" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download CV" }),
    ).toBeInTheDocument();
  });
});
