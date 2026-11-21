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
import { FiCheckCircle } from "react-icons/fi";
import { CARD_BG, Reveal, SectionHeading, cardHoverProps } from "./shared";
import subs2learnData from "./data-2s2l";

function CheckList({ items, size = "sm" }) {
  return (
    <Stack as="ul" gap={2.5} listStyleType="none">
      {items.map((item) => (
        <Flex as="li" key={item} gap={2.5} align="flex-start">
          <Icon as={FiCheckCircle} color="primary" mt="3px" flexShrink={0} aria-hidden="true" />
          <Text fontSize={size} color="text" lineHeight="relaxed">
            {item}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
}

function GlanceColumn({ title, items }) {
  if (!items?.length) return null;
  return (
    <Stack gap={4}>
      <Heading as="h3" fontSize="md" fontWeight="bold" color="text">
        {title}
      </Heading>
      <CheckList items={items} />
    </Stack>
  );
}

export default function Subs2LearnEngineering({ features = [], challengesSolved = [] }) {
  const engineeringData = subs2learnData.engineering;
  const glance = engineeringData.atAGlance || {};
  const hasGlance = features?.length > 0 || challengesSolved?.length > 0;

  return (
    <Box
      as="section"
      id="highlights"
      py={{ base: 14, md: 24 }}
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading
            eyebrow={engineeringData.eyebrow}
            title={engineeringData.title}
            subtitle={engineeringData.subtitle}
          />

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {engineeringData.highlights.map((card, idx) => (
              <Reveal key={card.id} delay={(idx % 2) * 0.1}>
                <Stack gap={4} p={{ base: 6, md: 8 }} {...cardHoverProps}>
                  <Flex align="center" gap={3}>
                    <Flex
                      w={11}
                      h={11}
                      align="center"
                      justify="center"
                      borderRadius="xl"
                      bg="primary"
                      color="white"
                      boxShadow="sm"
                      flexShrink={0}
                    >
                      <Icon as={card.icon} boxSize={5} aria-hidden="true" />
                    </Flex>
                    <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                      {card.title}
                    </Heading>
                  </Flex>

                  <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                    {card.description}
                  </Text>

                  <Box pt={4} borderTopWidth="1px" borderColor="border">
                    <CheckList items={card.bullets} />
                  </Box>
                </Stack>
              </Reveal>
            ))}
          </SimpleGrid>

          {hasGlance && (
            <Reveal style={{ height: "auto" }}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={{ base: 8, md: 12 }}
                p={{ base: 6, md: 10 }}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="border"
                borderLeftWidth="4px"
                borderLeftColor="primary"
                bg={CARD_BG}
                boxShadow="sm"
              >
                <GlanceColumn title={glance.featuresTitle} items={features} />
                <GlanceColumn title={glance.challengesTitle} items={challengesSolved} />
              </SimpleGrid>
            </Reveal>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
