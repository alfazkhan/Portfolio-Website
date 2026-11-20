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
import { FiCheckCircle } from "react-icons/fi";
import subs2learnData from "./data-2s2l";

export default function Subs2LearnEngineering({ features = [], challengesSolved = [] }) {
  const engineeringData = subs2learnData.engineering;
  const highlightCards = engineeringData.highlights;

  return (
    <Box
      as="section"
      id="highlights"
      py={{ base: 14, md: 20 }}
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={10}>
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
              {engineeringData.title}
            </Heading>
            <Text color="textMuted" fontSize="sm">
              {engineeringData.subtitle}
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            {highlightCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -3 }}
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
                  <Flex align="center" gap={3}>
                    <Flex
                      w={10}
                      h={10}
                      align="center"
                      justify="center"
                      borderRadius="xl"
                      bg="primary"
                      color="white"
                      boxShadow="sm"
                    >
                      <Icon as={card.icon} boxSize={5} aria-hidden="true" />
                    </Flex>
                    <Heading as="h3" fontSize="lg" fontWeight="bold" color="text">
                      {card.title}
                    </Heading>
                  </Flex>

                  <Text fontSize="xs" color="textMuted" lineHeight="relaxed">
                    {card.description}
                  </Text>

                  <Stack as="ul" gap={2} listStyleType="none" mt={1}>
                    {card.bullets.map((bullet) => (
                      <Flex as="li" key={bullet} gap={2} align="flex-start">
                        <Icon
                          as={FiCheckCircle}
                          color="primary"
                          mt="3px"
                          flexShrink={0}
                          aria-hidden="true"
                        />
                        <Text fontSize="xs" color="text">
                          {bullet}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
