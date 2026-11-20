"use client";

import { Button, Flex } from "@chakra-ui/react";
import { FaChrome, FaEye, FaFirefox, FaGithub } from "react-icons/fa6";
import { useColorMode } from "@/components/ui/color-mode";

const ALLOWED_PLATFORMS = ["MacIntel", "Win32", "Linux x86_64"];

export default function ProjectFooter({
  projectTitle,
  repoLink,
  liveLink,
  downloadLinks,
}) {
  const { colorMode } = useColorMode();
  const isDesktopPlatform =
    typeof navigator !== "undefined" &&
    ALLOWED_PLATFORMS.includes(navigator.platform);
  const labelSuffix = projectTitle ? ` — ${projectTitle}` : "";

  if (downloadLinks) {
    return (
      <Flex gap={2} flexWrap="wrap" justifyContent="center">
        <Button
          type="button"
          size="md"
          bgColor={colorMode === "light" ? "black" : "white"}
          color={colorMode === "light" ? "gray.100" : "gray.900"}
          aria-label={projectTitle ? `Github Repo${labelSuffix}` : undefined}
          onClick={() => window.open(repoLink)}
          width="full"
        >
          <FaGithub aria-hidden="true" />
          Github Repo
        </Button>
        <Flex gap={2} w="full">
          <Button
            type="button"
            display={!isDesktopPlatform && "none"}
            size="sm"
            colorPalette="blue"
            flex={1}
            aria-label={projectTitle ? `Chrome Store${labelSuffix}` : undefined}
            onClick={() => window.open(downloadLinks.chrome)}
          >
            <FaChrome aria-hidden="true" />
            Chrome Store
          </Button>
          <Button
            type="button"
            display={!isDesktopPlatform && "none"}
            size="sm"
            colorPalette="orange"
            flex={1}
            aria-label={projectTitle ? `Firefox Store${labelSuffix}` : undefined}
            onClick={() => window.open(downloadLinks.firefox)}
          >
            <FaFirefox aria-hidden="true" />
            Firefox Store
          </Button>
        </Flex>
      </Flex>
    );
  }

  if (repoLink && liveLink) {
    return (
      <Flex gap={2} flexWrap="wrap" justifyContent="center" w="full">
        <Button
          type="button"
          size="md"
          bgColor={colorMode === "light" ? "black" : "white"}
          color={colorMode === "light" ? "gray.100" : "gray.900"}
          aria-label={projectTitle ? `Github Repo${labelSuffix}` : undefined}
          onClick={() => window.open(repoLink)}
          width="full"
        >
          <FaGithub aria-hidden="true" />
          Github Repo
        </Button>
        <Button
          type="button"
          size="md"
          colorPalette="green"
          color="gray.100"
          width="full"
          aria-label={projectTitle ? `Live Preview${labelSuffix}` : undefined}
          onClick={() => window.open(liveLink)}
        >
          <FaEye aria-hidden="true" />
          Live Preview
        </Button>
      </Flex>
    );
  }

  return null;
}
