"use client";

import React from "react";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import ExtensionActionButtons from "./ExtensionActionButtons";
import { CARD_BG, Reveal, primaryGlow } from "./shared";
import subs2learnData from "./data-2s2l";

export default function Subs2LearnCTA({ project = {} }) {
  const cta = subs2learnData.cta;
  const hasActions =
    project.downloadLinks?.chrome || project.downloadLinks?.firefox || project.repoLink;
  if (!cta || !hasActions) return null;

  return (
    <Box as="section" aria-labelledby="subs2learn-cta-title" py={{ base: 14, md: 24 }}>
      <Container maxW="4xl" px={{ base: 4, md: 8 }}>
        <Reveal>
          <Box
            position="relative"
            overflow="hidden"
            borderRadius="3xl"
            borderWidth="1px"
            borderColor="border"
            bg={CARD_BG}
            boxShadow="xl"
            px={{ base: 6, md: 14 }}
            py={{ base: 10, md: 14 }}
          >
            <Box
              position="absolute"
              top="-60%"
              left="50%"
              w="120%"
              h="140%"
              transform="translateX(-50%)"
              pointerEvents="none"
              aria-hidden="true"
              style={{ background: primaryGlow(26) }}
            />
            <Stack position="relative" gap={4} align="center" textAlign="center">
              <Heading
                as="h2"
                id="subs2learn-cta-title"
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="extrabold"
                letterSpacing="tight"
                lineHeight="1.15"
                color="text"
              >
                {cta.title}
              </Heading>
              <Text color="textMuted" fontSize={{ base: "sm", md: "md" }} mb={4}>
                {cta.subtitle}
              </Text>
              <ExtensionActionButtons
                centered
                downloadLinks={project.downloadLinks}
                repoLink={project.repoLink}
                projectTitle={project.title || subs2learnData.general.brandName}
              />
            </Stack>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
