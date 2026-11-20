import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const URN_REGEX =
  /^urn:air:([a-zA-Z0-9.-]+)(?::([a-zA-Z0-9._:-]+))?:([a-zA-Z0-9._-]+)$/;
const STANDARD_ARD_TYPES = new Set([
  "application/ai-catalog+json",
  "application/agent-card+json",
  "application/a2a-agent-card+json",
  "application/mcp-server-card+json",
  "application/agent-skills+json",
  "application/agent-skills+md",
  'text/markdown; profile="urn:air:agent-skills"',
  "application/ai-registry",
  "application/ai-registry+json",
]);

describe("agentic discovery manifests", () => {
  it("provides a valid ARD v0.91 manifest at /.well-known/ard.json with linked assets", () => {
    const ardPath = path.join(PUBLIC_DIR, ".well-known", "ard.json");
    const ard = JSON.parse(fs.readFileSync(ardPath, "utf8"));

    expect(Array.isArray(ard.entries)).toBe(true);
    expect(ard.entries.length).toBeGreaterThan(0);

    for (const entry of ard.entries) {
      expect(entry.identifier).toMatch(URN_REGEX);
      expect(entry.displayName).toBeTruthy();
      expect(entry.type).toBeTruthy();
      expect(
        STANDARD_ARD_TYPES.has(entry.type) ||
          entry.type.startsWith("application/"),
      ).toBe(true);

      const hasUrl = typeof entry.url === "string";
      const hasData = typeof entry.data === "object" && entry.data !== null;
      expect(hasUrl !== hasData).toBe(true);

      expect(Array.isArray(entry.representativeQueries)).toBe(true);
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2);
      expect(entry.representativeQueries.length).toBeLessThanOrEqual(5);

      if (hasUrl && entry.url.startsWith("https://www.theonlyalfaz.com/")) {
        const relativePath = entry.url.replace(
          "https://www.theonlyalfaz.com/",
          "",
        );
        const targetFile = path.join(PUBLIC_DIR, relativePath);
        expect(fs.existsSync(targetFile)).toBe(true);
        if (targetFile.endsWith(".json")) {
          expect(() =>
            JSON.parse(fs.readFileSync(targetFile, "utf8")),
          ).not.toThrow();
        }
      }
    }
  });

  it("advertises /.well-known/ard.json in robots.txt and keeps llms.txt accurate", () => {
    const robots = fs.readFileSync(path.join(PUBLIC_DIR, "robots.txt"), "utf8");
    expect(robots).toMatch(/^Agentmap:\s+https:\/\/.+\/\.well-known\/ard\.json$/m);

    const llms = fs.readFileSync(path.join(PUBLIC_DIR, "llms.txt"), "utf8");
    expect(llms).toMatch(/^# Alfaz Khan/m);
    expect(llms).toContain("https://www.theonlyalfaz.com/.well-known/ard.json");
    expect(llms).not.toContain("README.md");
    expect(llms).not.toContain("Screenshots");
  });
});
