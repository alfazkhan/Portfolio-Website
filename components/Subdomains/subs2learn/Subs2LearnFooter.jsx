"use client";

import React from "react";
import NextLink from "next/link";
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import BrandName from "./BrandName";
import subs2learnData from "./data-2s2l";
import { openCookieSettings } from "@/lib/analytics";

function handleScrollToTop(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Subs2LearnFooter({ project = {} }) {
  const footerData = subs2learnData.footer;

  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border" bg="bg">
      <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={4}
        >
          <HStack gap={2} wrap="wrap">
            <BrandName fontSize="md" color="text" />
            <Text fontSize="xs" color="textMuted">
              {footerData.creatorPrefix}
              <Link
                href={footerData.creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
                aria-label={footerData.creatorName}
              >
                {footerData.creatorName}
              </Link>
            </Text>
          </HStack>

          <Flex gap={5} wrap="wrap" align="center">
            {project.downloadLinks?.chrome && (
              <Link
                href={project.downloadLinks.chrome}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="xs"
                color="textMuted"
                _hover={{ color: "primary" }}
              >
                {footerData.links.chromeLabel}
              </Link>
            )}
            {project.downloadLinks?.firefox && (
              <Link
                href={project.downloadLinks.firefox}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="xs"
                color="textMuted"
                _hover={{ color: "primary" }}
              >
                {footerData.links.firefoxLabel}
              </Link>
            )}
            {project.repoLink && (
              <Link
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="xs"
                color="textMuted"
                _hover={{ color: "primary" }}
              >
                {footerData.links.githubLabel}
              </Link>
            )}
            <Link
              asChild
              fontSize="xs"
              color="textMuted"
              _hover={{ color: "primary" }}
            >
              <NextLink href="/privacy">Privacy Policy</NextLink>
            </Link>
            <Box
              as="button"
              type="button"
              onClick={openCookieSettings}
              fontSize="xs"
              color="textMuted"
              _hover={{ color: "primary" }}
              cursor="pointer"
              background="none"
              border="none"
              padding={0}
              font="inherit"
              aria-label="Open cookie preferences dialog"
            >
              Cookie Settings
            </Box>
            <Link
              href="#about"
              onClick={handleScrollToTop}
              fontSize="xs"
              color="textMuted"
              _hover={{ color: "primary" }}
            >
              {footerData.links.backToTopLabel}
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
