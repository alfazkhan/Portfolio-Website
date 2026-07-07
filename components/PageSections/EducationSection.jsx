"use client";

import React, { useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Circle,
  Badge,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import websiteData from "../../data";
import GrayFlexWrapper from "../GrayFlexWrapper";

const educationData = websiteData.educationData;

const ScrollIndicatorCircle = motion.create(Circle);

export default function EducationSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

      <Box position="relative" ref={containerRef}>
        <Box
          position="absolute"
          left="7px"
          top="6px"
          bottom="6px"
          w="2px"
          bg="border"
          zIndex={0}
        />

        <ScrollIndicatorCircle
          position="absolute"
          left="0px"
          top="6px"
          size="16px"
          zIndex={2}
          bg="primary"
          border="4px solid"
          borderColor="bg"
          boxShadow="md"
          style={{ y: yTranslate }} 
        />

        <VStack gap={12} align="stretch" position="relative">
          {educationData.map((item) => (
            <Flex key={item.id} position="relative" gap={8}>
              <Circle
                size="16px"
                zIndex={1}
                mt="6px"
                flexShrink={0}
                bg="mutedBox"
                border="2px solid"
                borderColor="bg"
              />

              <Box flex={1}>
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

                <Heading as="h3" fontSize="xl" color="text" mb={1}>
                  {item.title}{" "}
                  <Badge
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
                <GrayFlexWrapper
                  bg="bgAlt"
                  p={5}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="border"
                >
                  <Text color="text" lineHeight="relaxed">
                    {item.desc}
                  </Text>
                </GrayFlexWrapper>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
