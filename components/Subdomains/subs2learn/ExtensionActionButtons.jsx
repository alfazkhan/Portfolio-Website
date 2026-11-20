"use client";

import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { FaChrome, FaFirefox, FaGithub } from "react-icons/fa6";
import subs2learnData from "./data-2s2l";

export default function ExtensionActionButtons({
  downloadLinks,
  repoLink,
  projectTitle = subs2learnData.general.brandName,
}) {
  const actions = subs2learnData.hero.actions;
  const labelSuffix = projectTitle ? ` — ${projectTitle}` : "";

  return (
    <Flex direction="column" gap={2.5} w="full" maxW="440px">
      {repoLink && (
        <Button
          asChild
          type="button"
          size="md"
          bg={{ base: "black", _dark: "white" }}
          color={{ base: "gray.100", _dark: "gray.900" }}
          width="full"
          _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
          transition="all 0.2s"
        >
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${actions.githubAriaLabel}${labelSuffix}`}
          >
            <FaGithub aria-hidden="true" />
            {actions.githubLabel}
          </a>
        </Button>
      )}

      {(downloadLinks?.chrome || downloadLinks?.firefox) && (
        <Flex gap={2} w="full">
          {downloadLinks?.chrome && (
            <Button
              asChild
              type="button"
              size="sm"
              colorPalette="blue"
              flex={1}
              _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              <a
                href={downloadLinks.chrome}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${actions.chromeAriaLabel}${labelSuffix}`}
              >
                <FaChrome aria-hidden="true" />
                {actions.chromeLabel}
              </a>
            </Button>
          )}

          {downloadLinks?.firefox && (
            <Button
              asChild
              type="button"
              size="sm"
              colorPalette="orange"
              flex={1}
              _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              <a
                href={downloadLinks.firefox}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${actions.firefoxAriaLabel}${labelSuffix}`}
              >
                <FaFirefox aria-hidden="true" />
                {actions.firefoxLabel}
              </a>
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
}
