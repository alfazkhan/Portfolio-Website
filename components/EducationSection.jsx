"use client"

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Circle,
  Badge,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import websiteData from "../data";

const educationData = websiteData.educationData;

export default function EducationSection() {
  const lineBg = useColorModeValue("gray.200", "#2A2B30");

  return (
    <Box
      as="section"
      id="education"
      py={{ base: 16, lg: 24 }}
      px={{ base: 6, lg: 10 }}
      maxW="4xl"
      mx="auto"
      transition="all 0.3s"
    >
      <Heading
        as="h2"
        fontSize="3xl"
        fontWeight="bold"
        color="text"
        mb={12}
        textAlign={{ base: "center", lg: "left" }}
      >
        Education & Experience
      </Heading>

      <Box position="relative">
        {/* The Vertical Timeline Line */}
        <Box
          position="absolute"
          left="7px"
          top="0"
          bottom="0"
          w="2px"
          bg={lineBg}
          zIndex={0}
        />

        <VStack gap={12} align="stretch" position="relative">
          {educationData.map((item) => (
            <Flex key={item.id} position="relative" gap={8}>
              {/* The Timeline Node */}
              <Circle
                size="16px" 
                bg="primary"
                border="4px solid"
                borderColor="bg"
                zIndex={1}
                mt="6px"
                flexShrink={0}
                boxShadow="sm"
              />

              <Box flex={1}>
                {/* Period / Year */}
                <Text
                  fontSize="sm"
                  fontWeight="extrabold"
                  color="primary"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  mb={1}
                >
                  {item.period}
                </Text>
                
                {/* Title and Location */}
                <Heading as="h3" fontSize="xl" color="text" mb={1}>
                  {item.title} <Badge
                  variant="solid"
                  textTransform="full-size-kana" 
                  colorScheme={item.type === "Education" ? "primary" : "blue"}
                  px={2}
                  py={1}
                  mx={2}
                >
                  {item.type}
                </Badge>
                </Heading>
                <Text fontSize="sm" fontWeight="bold" color="textMuted" mb={4}>
                  {item.location}
                </Text>

                {/* Description Card */}
                <Box
                  bg="bgAlt"
                  p={5}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="border"
                  _hover={{ transform: "translateX(5px)" }}
                  transition="all 0.2s ease-in-out"
                >
                  <Text color="text" lineHeight="relaxed">
                    {item.desc}
                  </Text>
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
