"use client";

import React from "react";
import { Box, Container, Flex, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import { FaChrome, FaFirefox } from "react-icons/fa6";
import { LuEllipsisVertical, LuLock, LuPin, LuPuzzle, LuSettings } from "react-icons/lu";
import { CARD_BG, Reveal, SectionHeading, withBrand } from "../shared";
import subs2learnData from "../data-2s2l";

const BROWSER_ICONS = { chrome: FaChrome, firefox: FaFirefox };

/** Small orange square standing in for the extension's toolbar icon. */
function ExtensionIcon({ size = 6 }) {
  return (
    <Flex
      w={size}
      h={size}
      flexShrink={0}
      align="center"
      justify="center"
      borderRadius="md"
      bg="primary"
      color="white"
      fontSize="2xs"
      fontWeight="black"
      style={{ fontFamily: subs2learnData.general.fontFamily }}
    >
      2S
    </Flex>
  );
}

function PulseRing() {
  return (
    <motion.span
      style={{
        position: "absolute",
        inset: -4,
        borderRadius: "9999px",
        border: "2px solid var(--chakra-colors-primary)",
      }}
      animate={{ scale: [0.9, 1.25], opacity: [0.9, 0] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/** Illustration of a browser toolbar with the extensions menu open. */
function ToolbarMock({ browser, pin }) {
  const ActionIcon = browser === "firefox" ? LuSettings : LuPin;
  const brand = subs2learnData.general.brandName;

  return (
    <Box
      aria-hidden="true"
      w="full"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border"
      bg={CARD_BG}
      boxShadow="xl"
      overflow="hidden"
    >
      {/* Window bar */}
      <HStack gap={3} px={4} py={3} borderBottomWidth="1px" borderColor="border" bg="bgAlt">
        <HStack gap={1.5}>
          <Box w={2.5} h={2.5} borderRadius="full" bg="red.400" />
          <Box w={2.5} h={2.5} borderRadius="full" bg="yellow.400" />
          <Box w={2.5} h={2.5} borderRadius="full" bg="green.400" />
        </HStack>
        <HStack
          flex={1}
          gap={2}
          px={3}
          py={1.5}
          borderRadius="full"
          bg={CARD_BG}
          borderWidth="1px"
          borderColor="border"
          minW={0}
        >
          <Icon as={LuLock} boxSize={3} color="textMuted" />
          <Text fontSize="xs" color="textMuted" truncate>
            youtube.com
          </Text>
        </HStack>
        <HStack gap={2.5} color="textMuted">
          <Box position="relative" display="inline-flex">
            <ExtensionIcon size={5} />
          </Box>
          <Box position="relative" display="inline-flex" color="primary">
            <PulseRing />
            <Icon as={LuPuzzle} boxSize={4.5} />
          </Box>
          <Icon as={LuEllipsisVertical} boxSize={4} />
        </HStack>
      </HStack>

      {/* Extensions dropdown */}
      <Flex justify="flex-end" p={{ base: 3, md: 5 }} minH="220px" position="relative">
        <Box
          position="absolute"
          inset={0}
          opacity={0.5}
          style={{
            backgroundImage: "radial-gradient(var(--chakra-colors-border) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Box
          position="relative"
          w={{ base: "full", sm: "290px" }}
          borderRadius="xl"
          borderWidth="1px"
          borderColor="border"
          bg={CARD_BG}
          boxShadow="lg"
          p={3}
        >
          <Text fontSize="xs" fontWeight="bold" color="text" px={2} pb={2}>
            {pin.mockMenuTitle}
          </Text>
          <Stack gap={1}>
            {pin.mockOtherExtensions.map((name) => (
              <HStack key={name} justify="space-between" px={2} py={2} borderRadius="md">
                <HStack gap={2.5}>
                  <Box w={5} h={5} borderRadius="md" bg="mutedBox" />
                  <Text fontSize="xs" color="textMuted">
                    {name}
                  </Text>
                </HStack>
                <Icon as={ActionIcon} boxSize={3.5} color="textMuted" />
              </HStack>
            ))}
            <HStack
              justify="space-between"
              px={2}
              py={2}
              borderRadius="md"
              borderWidth="1px"
              borderColor="primary"
              bg="primary/10"
            >
              <HStack gap={2.5}>
                <ExtensionIcon size={5} />
                <Text fontSize="xs" fontWeight="semibold" color="text">
                  {brand}
                </Text>
              </HStack>
              <Box position="relative" display="inline-flex" color="primary">
                <PulseRing />
                <Icon as={ActionIcon} boxSize={3.5} />
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default function WelcomePin({ browser, onBrowserChange }) {
  const pin = subs2learnData.welcome.pin;
  const steps = pin.steps[browser] || pin.steps.chrome;

  return (
    <Box as="section" id="pin" py={{ base: 14, md: 24 }} borderBottomWidth="1px" borderColor="border" bg="bgAlt">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading eyebrow={pin.eyebrow} title={pin.title} subtitle={pin.subtitle} />

          {/* Browser switch */}
          <Flex justify="center">
            <HStack
              role="group"
              aria-label={pin.browserSwitchLabel}
              gap={1}
              p={1}
              borderRadius="full"
              borderWidth="1px"
              borderColor="border"
              bg={CARD_BG}
            >
              {Object.entries(pin.browserLabels).map(([key, label]) => {
                const active = browser === key;
                return (
                  <Box
                    as="button"
                    type="button"
                    key={key}
                    onClick={() => onBrowserChange(key)}
                    aria-pressed={active}
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="semibold"
                    cursor="pointer"
                    bg={active ? "primary" : "transparent"}
                    color={active ? "white" : "textMuted"}
                    _hover={active ? undefined : { color: "primary" }}
                    transition="all 0.2s"
                  >
                    <Icon as={BROWSER_ICONS[key]} boxSize={4} aria-hidden="true" />
                    {label}
                  </Box>
                );
              })}
            </HStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 10, lg: 14 }} alignItems="center">
            <Reveal style={{ height: "auto" }}>
              <ToolbarMock browser={browser} pin={pin} />
            </Reveal>

            <Stack as="ol" gap={5} listStyleType="none" key={browser}>
              {steps.map((step, idx) => (
                <Reveal as="li" key={step} delay={idx * 0.1} style={{ height: "auto" }}>
                  <HStack gap={4} align="flex-start">
                    <Flex
                      w={9}
                      h={9}
                      flexShrink={0}
                      align="center"
                      justify="center"
                      borderRadius="full"
                      bg="primary"
                      color="white"
                      fontWeight="extrabold"
                      fontSize="sm"
                      boxShadow="md"
                    >
                      {idx + 1}
                    </Flex>
                    <Text fontSize={{ base: "md", md: "lg" }} color="text" pt={1} lineHeight="relaxed">
                      {withBrand(step)}
                    </Text>
                  </HStack>
                </Reveal>
              ))}
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
