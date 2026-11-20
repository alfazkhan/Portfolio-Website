import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import HomeWebMCPTools from "../HomeWebMCPTools";
import { registerWebMCPTools } from "../WebMCPTools";

afterEach(() => {
  cleanup();
  delete document.modelContext;
  vi.restoreAllMocks();
});

describe("WebMCPTools", () => {
  it("no-ops safely when document.modelContext is unavailable", () => {
    const cleanupTools = registerWebMCPTools([
      {
        name: "noop_tool",
        description: "Test tool",
        inputSchema: { type: "object", properties: {}, required: [] },
        execute: async () => "ok",
      },
    ]);

    expect(() => render(<HomeWebMCPTools />)).not.toThrow();
    expect(() => cleanupTools()).not.toThrow();
  });

  it("registers, executes, and aborts all portfolio WebMCP tools on unmount", async () => {
    const registered = [];
    const registerTool = vi.fn((tool, options) => {
      registered.push({ tool, signal: options?.signal });
      return Promise.resolve();
    });

    Object.defineProperty(document, "modelContext", {
      value: { registerTool },
      configurable: true,
    });

    const { unmount } = render(<HomeWebMCPTools />);

    expect(registerTool).toHaveBeenCalledTimes(4);
    expect(registered.map((r) => r.tool.name)).toEqual([
      "navigate_to_section",
      "get_portfolio_profile",
      "get_resume_links",
      "copy_contact_detail",
    ]);

    for (const { tool, signal } of registered) {
      expect(tool.description.length).toBeGreaterThan(10);
      expect(tool.inputSchema.type).toBe("object");
      expect(signal).toBeInstanceOf(AbortSignal);
      expect(signal.aborted).toBe(false);
    }

    // navigate_to_section
    const scrollToSpy = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    const navTool = registered[0].tool;
    expect(await navTool.execute({ section: "home" })).toContain('"home"');
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    const targetSection = document.createElement("section");
    targetSection.id = "works";
    targetSection.scrollIntoView = vi.fn();
    document.body.appendChild(targetSection);
    expect(await navTool.execute({ section: "works" })).toContain('"works"');
    expect(targetSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
    targetSection.remove();

    // get_portfolio_profile
    const profileTool = registered[1].tool;
    const projectsPayload = JSON.parse(
      await profileTool.execute({ topic: "projects" }),
    );
    expect(projectsPayload.projects.map((p) => p.title)).toEqual([
      "2Subs2Learn",
      "Subreddit Analyzer",
    ]);

    // get_resume_links
    const resumeTool = registered[2].tool;
    const resumePayload = JSON.parse(await resumeTool.execute({ language: "de" }));
    expect(resumePayload.de.route).toBe("/resume/de");
    expect(resumePayload.de.driveUrl).toMatch(/^https:\/\/drive\.google\.com/);

    // copy_contact_detail
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const copyTool = registered[3].tool;
    const copyPayload = JSON.parse(
      await copyTool.execute({ target: "email" }),
    );
    expect(copyPayload).toEqual({
      target: "email",
      value: "khanalfaaz14@gmail.com",
      copied: true,
    });
    expect(writeText).toHaveBeenCalledWith("khanalfaaz14@gmail.com");

    unmount();
    expect(registered.every((r) => r.signal.aborted)).toBe(true);
  });
});
