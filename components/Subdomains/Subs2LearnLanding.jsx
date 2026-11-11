"use client";

import React from "react";
import NextImage from "next/image";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Highlight,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaChrome, FaFirefox, FaGithub } from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiSliders,
} from "react-icons/fi";
import { ColorModeButton } from "@/components/ui/color-mode";

const PORTFOLIO_URL = "https://www.theonlyalfaz.com";

const PLATFORM_CARDS = [
  {
    id: "youtube",
    badge: "Caption Sync",
    title: "YouTube",
    summary:
      "Detects available caption tracks directly on the watch page, extracts timed JSON3 captions, and aligns original and translated subtitle streams to playback timecodes.",
    details: [
      "Page-level language selector across available non-ASR caption tracks",
      "Falls back to YouTube auto-translation captions when a requested target track is unavailable",
    ],
  },
  {
    id: "zdf",
    badge: "EBU-TT-D XML",
    title: "ZDF Mediathek",
    summary:
      "Detects ZDF player routes across dynamic navigation, observes subtitle XML resources, parses EBU-TT-D cues, and runs German-to-English background translation.",
    details: [
      "Seeking prioritizes the active subtitle batch so dual captions stay synchronized",
      "Pauses playback briefly while a seeked batch finishes translating when needed",
    ],
  },
];

const ARCHITECTURE_PILLARS = [
  {
    id: "translation",
    icon: FiCpu,
    title: "Browser-Side AI Translation",
    description:
      "Runs Xenova OPUS-MT models with Transformers.js and ONNX Runtime Web — WebGPU-accelerated in a Chromium offscreen document or native WASM on Firefox, with Chrome Translation API support when available. Model files are fetched when needed and cached locally in the browser.",
  },
  {
    id: "overlay",
    icon: FiSliders,
    title: "Customizable Dual Overlay",
    description:
      "Tune font sizes for original and translated tracks independently, adjust overlay width and vertical screen position, and toggle the extension or switch languages from the popup.",
  },
  {
    id: "extension",
    icon: FiGlobe,
    title: "Cross-Browser Manifest V3",
    description:
      "Built with the WXT framework, TypeScript, React, and Tailwind CSS for Chromium-family browsers and Firefox, covered by unit and end-to-end tests.",
  },
];

function ActionLinks({ installLinks }) {
  return (
    <Flex gap={3} wrap="wrap">
      {installLinks.map((action) => (
        <Button
          key={action.id}
          asChild
          size="md"
          colorPalette={action.colorPalette}
          variant={action.variant}
          borderRadius="md"
          fontWeight="semibold"
        >
          <a href={action.href} target="_blank" rel="noopener noreferrer">
            <Icon as={action.icon} aria-hidden="true" />
            {action.label}
          </a>
        </Button>
      ))}
    </Flex>
  );
}

function LandingHeader({ title }) {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={40}
      bg="bg"
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl" py={4} px={{ base: 4, md: 8 }}>
        <Flex align="center" justify="space-between" gap={4}>
          <HStack gap={3}>
            <Text fontWeight="bold" fontSize="lg" color="text" letterSpacing="tight">
              {title}
            </Text>
            <Badge bg="primary" color="white" variant="solid" size="sm">
              Manifest V3
            </Badge>
          </HStack>

          <HStack gap={3}>
            <Link
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              fontWeight="medium"
              color="textMuted"
              display="inline-flex"
              alignItems="center"
              gap={1}
              _hover={{ color: "primary", textDecoration: "none" }}
            >
              Portfolio by Alfaz Khan
              <Icon as={FiArrowUpRight} aria-hidden="true" />
            </Link>
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

function HeroSection({ project, installLinks }) {
  const imageProps =
    typeof project.img === "string"
      ? { src: project.img, width: 1280, height: 720 }
      : { src: project.img };

  return (
    <Box as="section" py={{ base: 10, md: 16 }} borderBottomWidth="1px" borderColor="border">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: 8, lg: 12 }} alignItems="center">
          <Stack gap={6} gridColumn={{ lg: "span 6" }}>
            <HStack gap={2} wrap="wrap">
              <Badge colorPalette="primary" variant="solid" borderRadius="full" px={3} py={0.5}>
                {project.year}
              </Badge>
              <Badge variant="outline" borderRadius="full" px={3} py={0.5} color="textMuted">
                {project.category}
              </Badge>
            </HStack>

            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              lineHeight="1.15"
              color="text"
            >
              <Highlight
                query={["dual subtitles"]}
                styles={{
                  px: "2",
                  py: "0.5",
                  color: "white",
                  bg: "primary",
                  borderRadius: "sm",
                }}
              >
                Learn languages faster with dual subtitles on YouTube &amp; ZDF
              </Highlight>
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="textMuted" lineHeight="relaxed">
              {project.summary}
            </Text>

            <ActionLinks installLinks={installLinks} />
          </Stack>

          <Box
            gridColumn={{ lg: "span 6" }}
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            overflow="hidden"
            bg="bgAlt"
            boxShadow="lg"
          >
            <NextImage
              {...imageProps}
              alt="2Subs2Learn dual-subtitle overlay preview on YouTube"
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function PlatformIntegrations() {
  return (
    <Box as="section" py={{ base: 10, md: 14 }} borderBottomWidth="1px" borderColor="border">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={8}>
          <Stack gap={2}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="text">
              Platform Integrations
            </Heading>
            <Text color="textMuted" maxW="2xl">
              Platform-specific caption extraction keeps both subtitle tracks aligned with playback.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {PLATFORM_CARDS.map((platform) => (
              <Stack
                key={platform.id}
                gap={4}
                p={6}
                borderWidth="1px"
                borderColor="border"
                borderRadius="lg"
                bg="bgAlt"
              >
                <Flex align="center" justify="space-between" gap={3}>
                  <Heading as="h3" fontSize="xl" fontWeight="bold" color="text">
                    {platform.title}
                  </Heading>
                  <Badge variant="outline" color="primary" borderColor="primary">
                    {platform.badge}
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                  {platform.summary}
                </Text>
                <Stack as="ul" gap={2} listStyleType="none">
                  {platform.details.map((detail) => (
                    <Flex as="li" key={detail} gap={2.5} align="flex-start">
                      <Icon
                        as={FiCheckCircle}
                        color="primary"
                        mt="3px"
                        flexShrink={0}
                        aria-hidden="true"
                      />
                      <Text fontSize="sm" color="text">
                        {detail}
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

function ArchitecturePillars() {
  return (
    <Box as="section" py={{ base: 10, md: 14 }} borderBottomWidth="1px" borderColor="border">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={8}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="text">
            How It Works
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {ARCHITECTURE_PILLARS.map((pillar) => (
              <Stack
                key={pillar.id}
                gap={3}
                p={6}
                borderWidth="1px"
                borderColor="border"
                borderRadius="lg"
                bg="bg"
              >
                <Flex
                  w={10}
                  h={10}
                  align="center"
                  justify="center"
                  borderRadius="md"
                  bg={{ base: "orange.50", _dark: "whiteAlpha.100" }}
                  borderWidth="1px"
                  borderColor="border"
                  color="primary"
                >
                  <Icon as={pillar.icon} boxSize={5} aria-hidden="true" />
                </Flex>
                <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                  {pillar.title}
                </Heading>
                <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                  {pillar.description}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

function TechnicalBreakdown({ features, challengesSolved, techStack }) {
  const lists = [
    { id: "features", heading: "Key Features", items: features },
    { id: "challenges", heading: "Engineering Highlights", items: challengesSolved },
  ];

  return (
    <Box as="section" py={{ base: 10, md: 14 }}>
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={10}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {lists.map((list) => (
              <Stack
                key={list.id}
                gap={4}
                p={6}
                borderWidth="1px"
                borderColor="border"
                borderRadius="lg"
                bg="bgAlt"
              >
                <Heading as="h2" fontSize="xl" fontWeight="bold" color="text">
                  {list.heading}
                </Heading>
                <Stack as="ul" gap={2.5} listStyleType="none">
                  {list.items.map((item) => (
                    <Flex as="li" key={item} gap={2.5} align="flex-start">
                      <Icon
                        as={FiCheckCircle}
                        color="primary"
                        mt="3px"
                        flexShrink={0}
                        aria-hidden="true"
                      />
                      <Text fontSize="sm" color="text">
                        {item}
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>

          <Stack gap={4} p={6} borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg">
            <HStack gap={2}>
              <Icon as={FiLayers} color="primary" aria-hidden="true" />
              <Heading as="h2" fontSize="lg" fontWeight="bold" color="text">
                Tech Stack
              </Heading>
            </HStack>
            <Flex gap={2} wrap="wrap">
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="subtle"
                  colorPalette="gray"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                >
                  {tech}
                </Badge>
              ))}
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function LandingFooter({ installLinks }) {
  return (
    <Box as="footer" borderTopWidth="1px" borderColor="border" bg="bgAlt">
      <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={4}
        >
          <Text fontSize="sm" color="textMuted">
            2Subs2Learn — Built by{" "}
            <Link
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              fontWeight="medium"
            >
              Alfaz Khan
            </Link>
          </Text>

          <Flex gap={5} wrap="wrap">
            {installLinks.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                color="textMuted"
                _hover={{ color: "primary" }}
              >
                {action.label}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default function Subs2LearnLanding({ project }) {
  const installLinks = [
    project.downloadLinks?.chrome && {
      id: "chrome",
      label: "Install for Chrome",
      href: project.downloadLinks.chrome,
      icon: FaChrome,
      colorPalette: "blue",
      variant: "solid",
    },
    project.downloadLinks?.firefox && {
      id: "firefox",
      label: "Install for Firefox",
      href: project.downloadLinks.firefox,
      icon: FaFirefox,
      colorPalette: "orange",
      variant: "solid",
    },
    project.repoLink && {
      id: "github",
      label: "GitHub Repo",
      href: project.repoLink,
      icon: FaGithub,
      colorPalette: "gray",
      variant: "outline",
    },
  ].filter(Boolean);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <LandingHeader title={project.title} />
      <Box as="main" flex={1}>
        <HeroSection project={project} installLinks={installLinks} />
        <PlatformIntegrations />
        <ArchitecturePillars />
        <TechnicalBreakdown
          features={project.features}
          challengesSolved={project.challengesSolved}
          techStack={project.techStack}
        />
      </Box>
      <LandingFooter installLinks={installLinks} />
    </Box>
  );
}
