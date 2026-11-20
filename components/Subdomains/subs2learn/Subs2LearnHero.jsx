"use client";

import React from "react";
import NextImage from "next/image";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import ExtensionActionButtons from "./ExtensionActionButtons";
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
        <circle
          cx="300"
          cy="300"
          r="110"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle cx="300" cy="300" r="185" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="300"
          cy="300"
          r="250"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <circle cx="300" cy="300" r="295" stroke="currentColor" strokeWidth="1" />
        <circle cx="485" cy="300" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="165" cy="165" r="3" fill="currentColor" opacity="0.5" />
      </motion.svg>
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
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <SimpleGrid
          columns={{ base: 1, lg: 12 }}
          gap={{ base: 10, lg: 8 }}
          alignItems="center"
        >
          {/* Left Column: Heading, Direct Technical Summary, and Extension Action Buttons */}
          <Stack gap={6} gridColumn={{ lg: "span 6" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "5xl" }}
                fontWeight="extrabold"
                lineHeight="1.15"
                letterSpacing="tight"
                color="text"
                mb={5}
              >
                {heroData.headlinePrefix}
                <Box as="span" color="primary">
                  {heroData.headlineHighlight}
                </Box>
              </Heading>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="textMuted"
                lineHeight="relaxed"
                maxW="xl"
                mb={6}
              >
                {project.summary || heroData.summary}
              </Text>

              <ExtensionActionButtons
                downloadLinks={project.downloadLinks}
                repoLink={project.repoLink}
                projectTitle={project.title || subs2learnData.general.brandName}
              />
            </motion.div>
          </Stack>

          {/* Right Column: Bigger and 3D Tilted Laptop Mockup */}
          <Flex
            gridColumn={{ lg: "span 6" }}
            position="relative"
            align="center"
            justify="center"
            py={{ base: 8, md: 12 }}
          >
            <OrbitalRings />
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "680px",
                transform:
                  "perspective(1200px) rotateY(-11deg) rotateX(6deg) rotateZ(-3deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <NextImage
                src={heroData.laptopImage}
                alt={heroData.laptopAlt}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.22))",
                }}
              />
            </motion.div>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
