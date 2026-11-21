"use client";

import React from "react";
import { Box, Button, Container, Flex, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import { FaYoutube } from "react-icons/fa6";
import { FiArrowDown, FiCheck, FiExternalLink } from "react-icons/fi";
import { primaryGlow, withBrand } from "../shared";
import subs2learnData from "../data-2s2l";

const BURST_DOTS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return { x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, size: i % 2 ? 6 : 9 };
});

/** Big animated check mark with a small celebratory burst. */
function SuccessBadge() {
  return (
    <Box position="relative" w="112px" h="112px" mx="auto" aria-hidden="true">
      {BURST_DOTS.map((dot, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: dot.size,
            height: dot.size,
            marginTop: -dot.size / 2,
            marginLeft: -dot.size / 2,
            borderRadius: "9999px",
            background: "var(--chakra-colors-primary)",
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{ x: dot.x, y: dot.y, opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
        />
      ))}

      <motion.span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          border: "2px solid var(--chakra-colors-primary)",
        }}
        animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          background: "var(--chakra-colors-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 40px -12px color-mix(in srgb, var(--chakra-colors-primary) 70%, transparent)",
        }}
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </Box>
  );
}

function scrollToSection(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function WelcomeHero() {
  const { hero, navItems } = subs2learnData.welcome;
  const stepLinks = navItems.slice(1, 4);

  return (
    <Box
      as="section"
      id="welcome"
      position="relative"
      py={{ base: 14, md: 20, lg: 24 }}
      borderBottomWidth="1px"
      borderColor="border"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        aria-hidden="true"
        opacity={{ base: 0.7, _dark: 0.5 }}
        style={{
          backgroundImage: "radial-gradient(var(--chakra-colors-border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <Box
        position="absolute"
        top="-10%"
        left="50%"
        w="900px"
        h="600px"
        transform="translateX(-50%)"
        pointerEvents="none"
        aria-hidden="true"
        style={{ background: primaryGlow(24) }}
      />

      <Container maxW="3xl" px={{ base: 4, md: 8 }} position="relative">
        <Stack gap={6} align="center" textAlign="center">
          <SuccessBadge />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Stack gap={5} align="center">
              <HStack
                gap={1.5}
                px={3}
                py={1}
                borderRadius="full"
                borderWidth="1px"
                borderColor="primary"
                bg="primary/10"
              >
                <Icon as={FiCheck} color="primary" boxSize={3.5} aria-hidden="true" />
                <Text fontSize="xs" fontWeight="semibold" color="primary">
                  {hero.eyebrow}
                </Text>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="extrabold"
                lineHeight="1.1"
                letterSpacing="tight"
                color="text"
              >
                {withBrand(hero.title)}
              </Heading>

              <Text fontSize={{ base: "md", md: "lg" }} color="textMuted" lineHeight="relaxed" maxW="xl">
                {hero.subtitle}
              </Text>

              <Flex gap={3} direction={{ base: "column", sm: "row" }} w={{ base: "full", sm: "auto" }} pt={2}>
                <Button
                  asChild
                  size="lg"
                  bg="primary"
                  color="buttonText"
                  borderRadius="xl"
                  fontWeight="bold"
                  boxShadow="md"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg", bg: "primary" }}
                  transition="all 0.2s ease"
                >
                  <a href={hero.primaryAction.url} target="_blank" rel="noopener noreferrer">
                    <FaYoutube aria-hidden="true" />
                    {hero.primaryAction.label}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  borderRadius="xl"
                  fontWeight="bold"
                  borderColor="border"
                  color="text"
                  _hover={{ transform: "translateY(-2px)", borderColor: "primary", color: "primary" }}
                  transition="all 0.2s ease"
                >
                  <a href={hero.secondaryAction.url} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink aria-hidden="true" />
                    {hero.secondaryAction.label}
                  </a>
                </Button>
              </Flex>

              {/* Quick jump links to the three setup steps */}
              <HStack as="nav" aria-label="Setup steps" gap={2} wrap="wrap" justify="center" pt={4}>
                {stepLinks.map((item, idx) => (
                  <Box
                    as="a"
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor="border"
                    fontSize="sm"
                    color="textMuted"
                    _hover={{ borderColor: "primary", color: "primary" }}
                    transition="all 0.2s"
                  >
                    <Flex
                      w={5}
                      h={5}
                      align="center"
                      justify="center"
                      borderRadius="full"
                      bg="primary"
                      color="white"
                      fontSize="2xs"
                      fontWeight="bold"
                    >
                      {idx + 1}
                    </Flex>
                    {item.label}
                    <Icon as={FiArrowDown} boxSize={3.5} aria-hidden="true" />
                  </Box>
                ))}
              </HStack>
            </Stack>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
