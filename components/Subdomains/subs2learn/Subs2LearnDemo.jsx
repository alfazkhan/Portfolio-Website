"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Reveal, SectionHeading } from "./shared";
import { MockPlayer, SubtitleOverlayMock } from "./MockPlayer";
import subs2learnData from "./data-2s2l";

/** Mock video player that cycles through example subtitle pairs. */
function SubtitlePlayer({ demo }) {
  const pairs = demo.pairs || [];
  const [index, setIndex] = useState(0);
  const interval = demo.intervalMs || 3200;

  useEffect(() => {
    if (pairs.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % pairs.length), interval);
    return () => clearInterval(id);
  }, [pairs.length, interval]);

  const current = pairs[index];
  if (!current) return null;

  return (
    <MockPlayer label={demo.nowPlayingLabel} ariaLabel={demo.playerAriaLabel}>
      <SubtitleOverlayMock
        original={current.original}
        translation={current.translation}
        contentKey={index}
        bottomPct={12}
      />

      {/* Progress bar */}
      <Box position="absolute" left={4} right={4} bottom={4} h="3px" bg="whiteAlpha.300" borderRadius="full">
        <Box
          h="full"
          bg="primary"
          borderRadius="full"
          transition="width 0.6s ease"
          style={{ width: `${((index + 1) / pairs.length) * 100}%` }}
        />
      </Box>
    </MockPlayer>
  );
}

export default function Subs2LearnDemo() {
  const demo = subs2learnData.demo;
  if (!demo) return null;

  return (
    <Box
      as="section"
      id="how-it-works"
      py={{ base: 14, md: 24 }}
      borderBottomWidth="1px"
      borderColor="border"
      bg="bgAlt"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading eyebrow={demo.eyebrow} title={demo.title} subtitle={demo.subtitle} />

          <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: 10, lg: 12 }} alignItems="center">
            <Box gridColumn={{ lg: "span 7" }}>
              <Reveal>
                <SubtitlePlayer demo={demo} />
              </Reveal>
            </Box>

            <Stack as="ol" gap={0} gridColumn={{ lg: "span 5" }} listStyleType="none">
              {demo.steps.map((step, idx) => {
                const isLast = idx === demo.steps.length - 1;
                return (
                  <Reveal as="li" key={step.title} delay={idx * 0.12} style={{ height: "auto" }}>
                    <Flex gap={4} align="stretch">
                      <Flex direction="column" align="center" flexShrink={0}>
                        <Flex
                          w={10}
                          h={10}
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
                        {!isLast && <Box flex={1} w="2px" my={2} bg="border" minH={6} />}
                      </Flex>
                      <Stack gap={1} pb={isLast ? 0 : 7} pt={1.5}>
                        <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                          {step.title}
                        </Heading>
                        <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                          {step.description}
                        </Text>
                      </Stack>
                    </Flex>
                  </Reveal>
                );
              })}
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
