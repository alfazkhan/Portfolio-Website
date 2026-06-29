"use client";

import React from "react";
import { Box, Flex, Heading, Text, Image, Button } from "@chakra-ui/react";
import { Prose } from "./ui/prose";
import websiteData from "../data";
import ProjectInfoModal from "./ProjectInfoModal";

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

      <Flex direction="column">
        {projects.map((project) => {
          return (
            <Box
              key={project.id}
              mb={10}
              borderWidth={1}
              p={5}
              borderRadius="sm"
            >
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={8}
                mb={2}
                _last={{ borderBottom: "none", pb: 0 }}
              >
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
                    <Text
                      bg="primary"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontWeight="bold"
                    >
                      {project.year}
                    </Text>
                    <Text color="textMuted" fontSize="lg">
                      {project.category}
                    </Text>
                  </Flex>

                  <Box color="text" lineHeight="relaxed" fontSize="lg">
                    {/* <Prose>{project.desc}</Prose> */}
                    <Text
                      color="text"
                      lineHeight="relaxed"
                      fontSize="sm"
                      opacity={0.8}
                      dangerouslySetInnerHTML={{ __html: project.desc }}
                      css={{
                        "& em": {
                          color: "primary",
                          fontWeight: "bold",
                          fontStyle: "oblique",
                        }, // Option: Pop emphasis elements with theme colors
                      }}
                      _dark={{
                        color: "white",
                      }}
                    />
                  </Box>
                </Box>
              </Flex>
              <ProjectInfoModal />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
}
