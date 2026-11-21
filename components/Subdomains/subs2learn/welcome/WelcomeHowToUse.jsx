"use client";

import React from "react";
import { Box, Button, Container, Flex, Heading, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FiArrowRight, FiDownloadCloud, FiInfo } from "react-icons/fi";
import { CARD_BG, Reveal, SectionHeading, cardHoverProps, withBrand } from "../shared";
import { LOGO_COMPONENTS } from "../Subs2LearnPlatforms";
import { DownloadOverlayMock, MockPlayer } from "../MockPlayer";
import subs2learnData from "../data-2s2l";

function PlatformCard({ platform }) {
  const Logo = LOGO_COMPONENTS[platform.logoType];

  return (
    <Stack gap={5} p={{ base: 6, md: 8 }} {...cardHoverProps}>
      <HStack gap={3}>
        {Logo && <Logo />}
        <Heading as="h3" fontSize="2xl" fontWeight="bold" color="text">
          {platform.title}
        </Heading>
      </HStack>

      <Stack as="ol" gap={3} listStyleType="none" flex={1}>
        {platform.steps.map((step, idx) => (
          <HStack as="li" key={step} gap={3} align="flex-start">
            <Flex
              w={6}
              h={6}
              flexShrink={0}
              align="center"
              justify="center"
              borderRadius="full"
              bg="primary/15"
              color="primary"
              fontSize="xs"
              fontWeight="bold"
            >
              {idx + 1}
            </Flex>
            <Text fontSize="sm" color="text" lineHeight="relaxed" pt="1px">
              {step}
            </Text>
          </HStack>
        ))}
      </Stack>

      {platform.tip && (
        <HStack gap={2.5} align="flex-start" p={3} borderRadius="lg" bg="primary/10">
          <Icon as={FiInfo} color="primary" mt="3px" flexShrink={0} aria-hidden="true" />
          <Text fontSize="xs" color="text" lineHeight="relaxed">
            {platform.tip}
          </Text>
        </HStack>
      )}

      <Button
        asChild
        variant="outline"
        borderRadius="xl"
        borderColor="border"
        color="text"
        alignSelf="flex-start"
        _hover={{ borderColor: "primary", color: "primary" }}
      >
        <a href={platform.action.url} target="_blank" rel="noopener noreferrer">
          {platform.action.label}
          <FiArrowRight aria-hidden="true" />
        </a>
      </Button>
    </Stack>
  );
}

export default function WelcomeHowToUse() {
  const howToUse = subs2learnData.welcome.howToUse;
  const download = howToUse.download;

  return (
    <Box as="section" id="how-to-use" py={{ base: 14, md: 24 }} borderBottomWidth="1px" borderColor="border">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading eyebrow={howToUse.eyebrow} title={howToUse.title} subtitle={howToUse.subtitle} />

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {howToUse.platforms.map((platform, idx) => (
              <Reveal key={platform.id} delay={idx * 0.12}>
                <PlatformCard platform={platform} />
              </Reveal>
            ))}
          </SimpleGrid>

          {download && (
            <Reveal style={{ height: "auto" }}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={{ base: 6, md: 10 }}
                alignItems="center"
                p={{ base: 5, md: 8 }}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="border"
                borderLeftWidth="4px"
                borderLeftColor="primary"
                bg={CARD_BG}
                boxShadow="sm"
              >
                <MockPlayer ariaLabel={download.mockTitle}>
                  <DownloadOverlayMock title={download.mockTitle} note={download.mockNote} />
                </MockPlayer>
                <Stack gap={3}>
                  <HStack gap={3}>
                    <Flex
                      w={10}
                      h={10}
                      align="center"
                      justify="center"
                      borderRadius="xl"
                      bg="primary"
                      color="white"
                      flexShrink={0}
                    >
                      <Icon as={FiDownloadCloud} boxSize={5} aria-hidden="true" />
                    </Flex>
                    <Heading as="h3" fontSize="xl" fontWeight="bold" color="text">
                      {download.title}
                    </Heading>
                  </HStack>
                  <Text fontSize="sm" color="textMuted" lineHeight="relaxed">
                    {withBrand(download.description)}
                  </Text>
                </Stack>
              </SimpleGrid>
            </Reveal>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
