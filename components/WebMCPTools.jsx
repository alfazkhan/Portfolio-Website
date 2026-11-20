"use client";

import { useEffect } from "react";

/**
 * Registers imperative WebMCP tools on document.modelContext (or navigator.modelContext)
 * when supported by the browser, and unregisters them cleanly on unmount.
 */
export function registerWebMCPTools(tools) {
  const modelContext =
    typeof document !== "undefined"
      ? document.modelContext ?? navigator?.modelContext
      : null;

  if (!modelContext || typeof modelContext.registerTool !== "function") {
    return () => {};
  }

  const controller = new AbortController();

  for (const tool of tools) {
    try {
      const registration = modelContext.registerTool(tool, {
        signal: controller.signal,
      });
      if (registration && typeof registration.catch === "function") {
        registration.catch(() => {});
      }
    } catch {
      // Ignore registration failures when the experimental API or permission policy rejects.
    }
  }

  return () => {
    controller.abort();
  };
}

/**
 * React hook that ties imperative WebMCP tool registration to component lifecycle.
 */
export function useWebMCPTools(createTools, deps = []) {
  useEffect(() => {
    const tools = createTools();
    if (!Array.isArray(tools) || tools.length === 0) {
      return undefined;
    }
    return registerWebMCPTools(tools);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
