"use client"

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Highlight,
} from '@chakra-ui/react';
import { useColorModeValue } from "./ui/color-mode";
import websiteData from "../data";

const introData = websiteData.introData;

export default function Intro() {
  const profileBorderColor = useColorModeValue("#fef3ee", "#2A2B30");

  return (
    <Box
      as="section"
      id="home"
      position="relative"
      w="full"
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 10 }}
      maxW="6xl"
      mx="auto"
      borderBottom="1px solid"
      borderColor="border"
      transition="all 0.3s"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={12}
      >
        {/* Text Container */}
        <Box
          w={{ base: "full", md: "60%" }}
          order={{ base: 2, md: 1 }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            color="text"
            lineHeight="moderate"
            mb={6}
          >
            <Highlight
              query={["Frontend Developer", "Data Scientist"]}
              styles={{ px: "1", bg: "primary", color: "white" }}
            >
              {introData.headline}
            </Highlight>
          </Heading>

          <Text
            fontSize="lg"
            color="text"
            mb={4}
            lineHeight="relaxed"
            opacity={0.9}
          >
            {introData.para}
          </Text>

          <Button
            bg="primary"
            color="gray.900"
            px={8}
            h="14" // Matches the visual height of your old Tailwind button
            borderRadius="sm"
            fontWeight="bold"
            fontSize="xl"
            boxShadow="md"
            _hover={{ filter: "brightness(1.1)" }}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.2s"
            onClick={()=>window.open(introData.cvLink, '_blank').focus()}
          >
            {introData.buttonText}
          </Button>
        </Box>

        {/* Image Container */}
        <Flex
          w={{ base: "full", md: "40%" }}
          justify="center"
          order={{ base: 1, md: 2 }}
        >
          <Box
            w={{ base: 64, md: 80 }}
            h={{ base: 64, md: 80 }}
            borderRadius="full"
            border="8px solid"
            borderColor={profileBorderColor}
            boxShadow="xl"
            overflow="hidden"
          >
            <Image
              src={introData.imageSrc}
              w="full"
              h="full"
              objectFit="cover"
              alt="Alfaz Profile"
              loading="lazy" 
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
