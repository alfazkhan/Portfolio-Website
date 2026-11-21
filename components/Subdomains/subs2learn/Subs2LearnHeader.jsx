"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Stack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { ColorModeButton } from "@/components/ui/color-mode";
import BrandName from "./BrandName";
import subs2learnData from "./data-2s2l";

function handleScrollTo(e, id) {
  if (e && e.preventDefault) e.preventDefault();
  if (id === "top") {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }
  if (typeof document !== "undefined") {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}

/** Tracks which section is currently in the middle of the viewport. */
function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    if (typeof document === "undefined" || typeof IntersectionObserver === "undefined") {
      return undefined;
    }
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export default function Subs2LearnHeader({ repoLink, navItems: navItemsProp }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerData = subs2learnData.header;
  const navItems = navItemsProp || headerData.navItems;
  const homeId = navItems[0]?.id || "top";
  const activeRepoLink = repoLink || subs2learnData.general.repoUrl;
  const activeId = useActiveSection(navItems.map((item) => item.id));
  const scrolled = useScrolled();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg="bg/80"
      borderBottomWidth="1px"
      borderColor="border"
      boxShadow={scrolled ? "sm" : "none"}
      transition="box-shadow 0.2s ease"
      style={{ backdropFilter: "saturate(180%) blur(12px)", WebkitBackdropFilter: "saturate(180%) blur(12px)" }}
    >
      <Container maxW="6xl" py={3.5} px={{ base: 4, md: 8 }}>
        <Flex align="center" justify="space-between" gap={4}>
          {/* Logo with official Tropika font and NO orange dot */}
          <Link
            href={`#${homeId}`}
            onClick={(e) => handleScrollTo(e, homeId)}
            _hover={{ textDecoration: "none" }}
          >
            <BrandName fontSize="2xl" />
          </Link>

          {/* Section scroll navigation */}
          <HStack
            as="nav"
            gap={1}
            display={{ base: "none", lg: "flex" }}
            align="center"
          >
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  aria-current={isActive ? "location" : undefined}
                  fontSize="sm"
                  fontWeight={isActive ? "semibold" : "medium"}
                  color={isActive ? "primary" : "textMuted"}
                  bg={isActive ? "primary/10" : "transparent"}
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  _hover={{ color: "primary", textDecoration: "none" }}
                  transition="color 0.2s, background-color 0.2s"
                >
                  {item.label}
                </Link>
              );
            })}
          </HStack>

          {/* Right actions: GitHub, ColorMode, and the main orange button "Alfaz Khan" */}
          <HStack gap={3}>
            {repoLink && (
              <Link
                href={activeRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={headerData.githubAriaLabel}
                color="textMuted"
                display={{ base: "none", sm: "inline-flex" }}
                _hover={{ color: "primary" }}
                p={2}
              >
                <Icon as={FaGithub} boxSize={5} aria-hidden="true" />
              </Link>
            )}

            <ColorModeButton />

            {/* Orange Button with text "Alfaz Khan" that links to main portfolio */}
            <Button
              asChild
              size="sm"
              bg="primary"
              color="buttonText"
              borderRadius="full"
              px={5}
              py={2}
              fontWeight="bold"
              fontSize="sm"
              boxShadow="sm"
              _hover={{
                opacity: 0.92,
                transform: "translateY(-1px)",
                boxShadow: "md",
              }}
              transition="all 0.2s ease"
            >
              <a
                href={headerData.ctaButton.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={headerData.ctaButton.ariaLabel}
              >
                {headerData.ctaButton.label}
              </a>
            </Button>

            {/* Mobile hamburger menu toggle */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              display={{ base: "inline-flex", lg: "none" }}
              aria-label={isOpen ? headerData.menuCloseLabel : headerData.menuOpenLabel}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              p={1.5}
            >
              <Icon as={isOpen ? IoCloseOutline : IoMenuOutline} boxSize={6} />
            </Button>
          </HStack>
        </Flex>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <Box
            display={{ base: "block", lg: "none" }}
            pt={4}
            pb={3}
            borderTopWidth="1px"
            borderColor="border"
            mt={3}
          >
            <Stack gap={3}>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    handleScrollTo(e, item.id);
                    setIsOpen(false);
                  }}
                  fontSize="sm"
                  fontWeight="medium"
                  color={activeId === item.id ? "primary" : "text"}
                  py={1}
                  _hover={{ color: "primary" }}
                >
                  {item.label}
                </Link>
              ))}
              {repoLink && (
                <Link
                  href={activeRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  fontSize="sm"
                  fontWeight="medium"
                  color="textMuted"
                  py={1}
                >
                  {headerData.githubLabel}
                </Link>
              )}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
