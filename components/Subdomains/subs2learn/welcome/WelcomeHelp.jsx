"use client";

import React from "react";
import { Box, Container, Flex, Heading, HStack, Icon, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { FiArrowRight, FiMessageSquare, FiStar } from "react-icons/fi";
import { Reveal, SectionHeading, cardHoverProps } from "../shared";
import subs2learnData from "../data-2s2l";

const CARD_ICONS = { rate: FiStar, issue: FiMessageSquare, star: FaGithub };

export default function WelcomeHelp({ browser }) {
  const { help, overviewLabel } = subs2learnData.welcome;
  const reviewUrl = help.reviewLinks[browser] || help.reviewLinks.chrome;

  return (
    <Box as="section" id="help" py={{ base: 14, md: 24 }}>
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading eyebrow={help.eyebrow} title={help.title} subtitle={help.subtitle} />

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {help.cards.map((card, idx) => {
              const url = card.id === "rate" ? reviewUrl : card.url;
              return (
                <Reveal key={card.id} delay={idx * 0.1}>
                  <Stack
                    as="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    gap={4}
                    p={{ base: 6, md: 7 }}
                    className="group"
                    {...cardHoverProps}
                  >
                    <Flex
                      w={11}
                      h={11}
                      align="center"
                      justify="center"
                      borderRadius="xl"
                      bg="primary"
                      color="white"
                      boxShadow="sm"
                    >
                      <Icon as={CARD_ICONS[card.id] || FiStar} boxSize={5} aria-hidden="true" />
                    </Flex>
                    <Stack gap={1.5} flex={1}>
                      <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                        {card.title}
                      </Heading>
                      <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                        {card.description}
                      </Text>
                    </Stack>
                    <HStack gap={1.5} color="primary" fontSize="sm" fontWeight="semibold">
                      <span>{card.actionLabel}</span>
                      <Box
                        as="span"
                        display="inline-flex"
                        transition="transform 0.2s"
                        _groupHover={{ transform: "translateX(3px)" }}
                      >
                        <Icon as={FiArrowRight} aria-hidden="true" />
                      </Box>
                    </HStack>
                  </Stack>
                </Reveal>
              );
            })}
          </SimpleGrid>

          <Flex justify="center">
            <Link
              href={subs2learnData.general.subdomainUrl}
              fontSize="sm"
              fontWeight="semibold"
              color="textMuted"
              _hover={{ color: "primary" }}
            >
              {overviewLabel}
              <Icon as={FiArrowRight} aria-hidden="true" />
            </Link>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
