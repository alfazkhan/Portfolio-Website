"use client";

import React from "react";
import NextImage from "next/image";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { FiCheck, FiCpu, FiGlobe } from "react-icons/fi";
import ExtensionActionButtons from "./ExtensionActionButtons";
import { CARD_BG, primaryGlow } from "./shared";
import subs2learnData from "./data-2s2l";

function OrbitalRings() {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w={{ base: "360px", sm: "480px", md: "600px", lg: "700px" }}
      h={{ base: "360px", sm: "480px", md: "600px", lg: "700px" }}
      pointerEvents="none"
      zIndex={0}
      opacity={{ base: 0.45, _dark: 0.28 }}
      color="border"
    >
      <motion.svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="300" cy="300" r="110" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="300" cy="300" r="185" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="300" cy="300" r="295" stroke="currentColor" strokeWidth="1" />
        <circle cx="485" cy="300" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="165" cy="165" r="3" fill="currentColor" opacity="0.5" />
      </motion.svg>
    </Box>
  );
}

/** Hand-drawn style underline beneath the highlighted words in the headline. */
function Underline() {
  return (
    <Box
      as="span"
      position="absolute"
      left={0}
      right={0}
      bottom="-0.18em"
      h="0.3em"
      color="primary"
      aria-hidden="true"
      pointerEvents="none"
    >
      <motion.svg
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <motion.path
          d="M3 14 C 70 4, 160 2, 297 9"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
        />
      </motion.svg>
    </Box>
  );
}

function FloatingBadge({ icon, label, delay = 0, ...position }) {
  return (
    <Box
      position="absolute"
      zIndex={2}
      display={{ base: "none", md: "block" }}
      {...position}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.4, delay },
          scale: { duration: 0.4, delay },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
        }}
      >
        <HStack
          gap={2}
          px={3.5}
          py={2}
          borderRadius="full"
          bg={CARD_BG}
          borderWidth="1px"
          borderColor="border"
          boxShadow="lg"
        >
          <Flex
            w={6}
            h={6}
            align="center"
            justify="center"
            borderRadius="full"
            bg="primary"
            color="white"
          >
            <Icon as={icon} boxSize={3.5} aria-hidden="true" />
          </Flex>
          <Text fontSize="xs" fontWeight="semibold" color="text" whiteSpace="nowrap">
            {label}
          </Text>
        </HStack>
      </motion.div>
    </Box>
  );
}

export default function Subs2LearnHero({ project = {} }) {
  const heroData = subs2learnData.hero;

  return (
    <Box
      as="section"
      id="about"
      position="relative"
      py={{ base: 12, md: 18, lg: 22 }}
      borderBottomWidth="1px"
      borderColor="border"
      overflow="hidden"
    >
      {/* Dotted backdrop that fades out toward the edges */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        aria-hidden="true"
        opacity={{ base: 0.7, _dark: 0.5 }}
        style={{
          backgroundImage:
            "radial-gradient(var(--chakra-colors-border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      <Container maxW="6xl" px={{ base: 4, md: 8 }} position="relative">
        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          gap={{ base: 10, lg: 8 }}
          alignItems="center"
        >
          {/* Left column: copy and install actions */}
          <Stack gap={6} gridColumn={{ lg: "span 5" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {heroData.eyebrow && (
                <HStack
                  display="inline-flex"
                  gap={2}
                  px={3}
                  py={1}
                  mb={5}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor="primary"
                  bg="primary/10"
                >
                  <Box position="relative" w={2} h={2} aria-hidden="true">
                    <motion.span
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "9999px",
                        background: "var(--chakra-colors-primary)",
                      }}
                      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                    <Box position="absolute" inset={0} borderRadius="full" bg="primary" />
                  </Box>
                  <Text fontSize="xs" fontWeight="semibold" color="primary">
                    {heroData.eyebrow}
                  </Text>
                </HStack>
              )}

              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "52px" }}
                fontWeight="extrabold"
                lineHeight="1.12"
                letterSpacing="tight"
                color="text"
                mb={5}
              >
                {heroData.headlinePrefix}
                <Box as="span" color="primary" position="relative" whiteSpace="nowrap">
                  {heroData.headlineHighlight}
                  <Underline />
                </Box>
              </Heading>

              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="textMuted"
                lineHeight="relaxed"
                maxW="xl"
                mb={8}
              >
                {project.summary || heroData.summary}
              </Text>

              <ExtensionActionButtons
                downloadLinks={project.downloadLinks}
                repoLink={project.repoLink}
                projectTitle={project.title || subs2learnData.general.brandName}
              />

              {heroData.trustPoints?.length > 0 && (
                <HStack as="ul" gap={{ base: 3, sm: 5 }} mt={6} wrap="wrap" listStyleType="none">
                  {heroData.trustPoints.map((point) => (
                    <HStack as="li" key={point} gap={1.5}>
                      <Icon as={FiCheck} color="primary" boxSize={4} aria-hidden="true" />
                      <Text fontSize="sm" color="textMuted" fontWeight="medium">
                        {point}
                      </Text>
                    </HStack>
                  ))}
                </HStack>
              )}
            </motion.div>
          </Stack>

          {/* Right column: tilted laptop mockup */}
          <Flex
            gridColumn={{ lg: "span 7" }}
            position="relative"
            align="center"
            justify="center"
            py={{ base: 8, md: 12 }}
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              w="130%"
              h="130%"
              transform="translate(-50%, -50%)"
              pointerEvents="none"
              aria-hidden="true"
              style={{ background: primaryGlow(32) }}
            />
            <OrbitalRings />

            {heroData.floatingBadges?.languages && (
              <FloatingBadge
                icon={FiGlobe}
                label={heroData.floatingBadges.languages}
                delay={0.6}
                top={{ md: "8%" }}
                left={{ md: "0%" }}
              />
            )}
            {heroData.floatingBadges?.runtime && (
              <FloatingBadge
                icon={FiCpu}
                label={heroData.floatingBadges.runtime}
                delay={0.9}
                bottom={{ md: "10%" }}
                right={{ md: "0%" }}
              />
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.15 },
                scale: { duration: 0.6, delay: 0.15 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {/* Static 3D tilt lives on its own wrapper so motion's transform doesn't override it */}
              <div
                style={{
                  transform:
                    "perspective(1200px) rotateY(-11deg) rotateX(6deg) rotateZ(-3deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <NextImage
                  src={heroData.laptopImage}
                  alt={heroData.laptopAlt}
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.22))",
                  }}
                />
              </div>
            </motion.div>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
