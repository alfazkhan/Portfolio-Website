"use client";

import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { FaChrome, FaFirefox, FaGithub } from "react-icons/fa6";
import subs2learnData from "./data-2s2l";

const liftOnHover = {
  _hover: { transform: "translateY(-2px)", boxShadow: "lg" },
  transition: "all 0.2s ease",
};

export default function ExtensionActionButtons({
  downloadLinks,
  repoLink,
  projectTitle = subs2learnData.general.brandName,
  centered = false,
}) {
  const actions = subs2learnData.hero.actions;
  const labelSuffix = projectTitle ? ` — ${projectTitle}` : "";
  const hasStoreLinks = downloadLinks?.chrome || downloadLinks?.firefox;

  return (
    <Flex
      direction="column"
      gap={3}
      w="full"
      maxW="460px"
      mx={centered ? "auto" : undefined}
    >
      {hasStoreLinks && (
        <Flex gap={3} w="full" direction={{ base: "column", sm: "row" }}>
          {downloadLinks?.chrome && (
            <Button
              asChild
              type="button"
              size="lg"
              colorPalette="blue"
              borderRadius="xl"
              fontWeight="bold"
              flex={1}
              boxShadow="md"
              {...liftOnHover}
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
              size="lg"
              colorPalette="orange"
              borderRadius="xl"
              fontWeight="bold"
              flex={1}
              boxShadow="md"
              {...liftOnHover}
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

      {repoLink && (
        <Button
          asChild
          type="button"
          size="md"
          variant="outline"
          borderRadius="xl"
          borderColor="border"
          bg={{ base: "black", _dark: "white" }}
          color={{ base: "gray.100", _dark: "gray.900" }}
          width="full"
          {...liftOnHover}
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
    </Flex>
  );
}
