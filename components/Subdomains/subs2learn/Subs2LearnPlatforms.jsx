"use client";

import React from "react";
import {
  Badge,
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
import { FiCheckCircle } from "react-icons/fi";
import subs2learnData from "./data-2s2l";

function YouTubeLogo() {
  return (
    <Flex
      w={10}
      h={10}
      align="center"
      justify="center"
      borderRadius="xl"
      bg="#FF0000"
      color="white"
      boxShadow="sm"
      flexShrink={0}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    </Flex>
  );
}

function ZDFLogo() {
  return (
    <Flex
      w={10}
      h={10}
      align="center"
      justify="center"
      borderRadius="xl"
      bg="#FA7D19"
      color="white"
      boxShadow="sm"
      flexShrink={0}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="14" fill="#FA7D19" />
        <text
          x="16"
          y="20"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill="white"
          letterSpacing="-0.3px"
        >
          ZDF
        </text>
      </svg>
    </Flex>
  );
}

const LOGO_COMPONENTS = {
  youtube: YouTubeLogo,
  zdf: ZDFLogo,
};

export default function Subs2LearnPlatforms() {
  const platformsData = subs2learnData.platforms;

  return (
    <Box
      as="section"
      id="platforms"
      py={{ base: 14, md: 20 }}
      borderBottomWidth="1px"
      borderColor="border"
      bg="bgAlt"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 12 }}>
          <Stack
            gap={2}
            align={{ base: "flex-start", md: "center" }}
            style={{ textAlign: "center" }}
            maxW="2xl"
            mx={{ md: "auto" }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              color="text"
            >
              {platformsData.title}
            </Heading>
            <Text color="textMuted" fontSize="sm">
              {platformsData.subtitle}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {platformsData.items.map((platform) => {
              const LogoComponent = LOGO_COMPONENTS[platform.logoType] || YouTubeLogo;
              return (
                <motion.div
                  key={platform.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Stack
                    gap={4}
                    p={{ base: 6, md: 8 }}
                    borderWidth="1px"
                    borderColor="border"
                    borderRadius="2xl"
                    bg="bg"
                    boxShadow="sm"
                    h="full"
                  >
                    <Flex align="center" justify="space-between" gap={3}>
                      <HStack gap={3}>
                        <LogoComponent />
                        <Heading as="h3" fontSize="2xl" fontWeight="bold" color="text">
                          {platform.title}
                        </Heading>
                      </HStack>
                      <Badge
                        variant="outline"
                        color="primary"
                        borderColor="primary"
                        px={2.5}
                        py={0.5}
                      >
                        {platform.badge}
                      </Badge>
                    </Flex>

                    <Text fontSize="xs" color="textMuted" lineHeight="relaxed">
                      {platform.summary}
                    </Text>

                    <Stack as="ul" gap={2} listStyleType="none" mt={2}>
                      {platform.details.map((detail) => (
                        <Flex as="li" key={detail} gap={2.5} align="flex-start">
                          <Icon
                            as={FiCheckCircle}
                            color="primary"
                            mt="3px"
                            flexShrink={0}
                            aria-hidden="true"
                          />
                          <Text fontSize="xs" color="text">
                            {detail}
                          </Text>
                        </Flex>
                      ))}
                    </Stack>
                  </Stack>
                </motion.div>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
