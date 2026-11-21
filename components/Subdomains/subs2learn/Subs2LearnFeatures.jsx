"use client";

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Reveal, SectionHeading, cardHoverProps } from "./shared";
import subs2learnData from "./data-2s2l";

export default function Subs2LearnFeatures() {
  const featuresData = subs2learnData.features;

  return (
    <Box
      as="section"
      id="features"
      py={{ base: 14, md: 24 }}
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading
            eyebrow={featuresData.eyebrow}
            title={featuresData.title}
            subtitle={featuresData.subtitle}
          />

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
            {featuresData.items.map((feature, idx) => (
              <Reveal key={feature.id} delay={idx * 0.1}>
                <Stack
                  gap={4}
                  p={{ base: 6, md: 7 }}
                  position="relative"
                  overflow="hidden"
                  className="group"
                  {...cardHoverProps}
                >
                  {/* Large faded index number */}
                  <Text
                    as="span"
                    position="absolute"
                    top={3}
                    right={5}
                    fontSize="5xl"
                    fontWeight="black"
                    lineHeight="1"
                    color="border"
                    aria-hidden="true"
                    userSelect="none"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </Text>

                  <Flex
                    w={12}
                    h={12}
                    align="center"
                    justify="center"
                    borderRadius="xl"
                    bg="primary"
                    color="white"
                    boxShadow="md"
                    transition="transform 0.25s ease"
                    _groupHover={{ transform: "rotate(-6deg) scale(1.06)" }}
                  >
                    <Icon as={feature.icon} boxSize={6} aria-hidden="true" />
                  </Flex>

                  <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                    {feature.title}
                  </Heading>

                  <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                    {feature.description}
                  </Text>
                </Stack>
              </Reveal>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
