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
import { motion } from "motion/react";
import subs2learnData from "./data-2s2l";

export default function Subs2LearnFeatures() {
  const featuresData = subs2learnData.features;

  return (
    <Box
      as="section"
      id="features"
      py={{ base: 14, md: 20 }}
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }} align="center">
          <Stack gap={2} align="center" style={{ textAlign: "center" }} maxW="2xl">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              color="text"
            >
              {featuresData.title}
            </Heading>
            <Text color="textMuted" fontSize="sm">
              {featuresData.subtitle}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
            {featuresData.items.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
              >
                <Stack gap={4} align="center" style={{ textAlign: "center" }} p={4}>
                  {/* Main orange background with white icon */}
                  <Flex
                    w={13}
                    h={13}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg="primary"
                    color="white"
                    boxShadow="md"
                  >
                    <Icon as={feature.icon} boxSize={6} aria-hidden="true" />
                  </Flex>

                  <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                    {feature.title}
                  </Heading>

                  <Text
                    fontSize="xs"
                    color="textMuted"
                    lineHeight="relaxed"
                    maxW="sm"
                  >
                    {feature.description}
                  </Text>
                </Stack>
              </motion.div>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
