"use client";

import React from "react";
import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import { Prose } from "./ui/prose";
import websiteData from "../data";

// Best Practice: Static data extracted outside the component
const projects = websiteData.projects;

export default function WorkSection() {
  return (
    <Box
      as="section"
      id="works"
      position="relative"
      w="full"
      maxW="4xl"
      mx="auto"
      py={10}
      px={{ base: 10, sm: 20 }}
      transition="all 0.3s"
    >
      <Heading
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        mb={12}
        color="text"
        textAlign={{ base: "center", md: "left" }}
      >
        Works and Projects
      </Heading>

      <Flex direction="column" gap={16}>
        {projects.map(function (project) {
          return (
            <Flex
              key={project.id}
              direction={{ base: "column", md: "row" }}
              gap={8}
              pb={12}
              borderBottom="1px solid"
              borderColor="border"
              _last={{ borderBottom: "none", pb: 0 }} // Cleanly targets the last item
            >
              {/* Image Container */}
              <Box
                w={{ base: "full", md: "246px" }}
                h="180px"
                flexShrink={0}
                overflow="hidden"
                borderRadius="lg"
                boxShadow="sm"
              >
                <Image
                  src={project.img}
                  w="full"
                  h="full"
                  objectFit="fill"
                  alt={project.title}
                  loading="lazy"
                />
              </Box>

              {/* Text Container */}
              <Box flex={1}>
                <Heading
                  as="h3"
                  fontSize="3xl"
                  fontWeight="bold"
                  color="text"
                  mb={4}
                >
                  {project.title}
                </Heading>

                <Flex align="center" gap={4} mb={4} fontSize="sm">
                  <Box
                    bg="primary"
                    color="gray.900"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontWeight="bold"
                  >
                    {project.year}
                  </Box>
                  <Text color="textMuted" fontSize="lg">
                    {project.category}
                  </Text>
                </Flex>

                <Text
                  color="text"
                  lineHeight="relaxed"
                  fontSize="lg"
                  opacity={0.9}
                >
                  <Prose>{project.desc}</Prose>
                </Text>
                {project.link && (
                  <Button
                    bg="primary"
                    size="2xs"
                    color="gray.900"
                    px={3}
                    h="14" // Matches the visual height of your old Tailwind button
                    borderRadius="sm"
                    fontWeight="bold"
                    fontSize="sm"
                    boxShadow="md"
                    _hover={{ filter: "brightness(1.1)" }}
                    _active={{ transform: "scale(0.95)" }}
                    transition="all 0.2s"
                    onClick={() =>
                      window.open(project.link, "_blank").focus()
                    }
                  >
                    Live Project
                  </Button>
                )}
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
