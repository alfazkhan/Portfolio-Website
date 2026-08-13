"use client";

import React from "react";
import { Box, Flex, Heading, Text, Image, Grid } from "@chakra-ui/react";
import websiteData from "../../data";
import ProjectInfoModal from "../ProjectInfoModal";
import NextImage from "next/image";
import { motion, stagger } from "framer-motion";

const projects = websiteData.projects;

const MotionGrid = motion.create(Grid);
const MotionFlex = motion.create(Flex);

export default function WorkSection() {
  
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.15, { startDelay: 0.1 }),
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: -20, 
      filter: "blur(20px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 18,
      },
    },
  };

  return (
    <Box
      as="section"
      id="works"
      position="relative"
      w="full"
      maxW="6xl"
      mx="auto"
      py={10}
      px={{ base: 5, xl: 20 }}
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

      {/* 4. Parent element handles scroll boundaries and triggers cascade */}
      <MotionGrid
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }} // Fires smoothly when cards enter viewport
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={{ base: 6, xl: 8 }}
      >
        {projects.map((project) => {
          return (
            <MotionFlex
              key={project.id}
              variants={cardVariants} // Inherits variant hooks automatically
              direction="column"
              borderWidth={1}
              borderColor="border"
              p={5}
              borderRadius="sm"
              bg="bg"
              height="full"
              mb={0}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Flex direction="column" gap={3} mb={4} flex={1}>
                <Box
                  w="full"
                  overflow="hidden"
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Image asChild alt={project.title} objectFit="contain">
                    <NextImage
                      src={project.img}
                      width={400}
                      height={400}
                      alt={project.title}
                    />
                  </Image>
                </Box>

                <Box>
                  <Heading
                    as="h3"
                    fontSize="xl"
                    fontWeight="bold"
                    color="text"
                    mb={3}
                  >
                    {project.title}
                  </Heading>

                  <Flex align="center" gap={3} mb={3} fontSize="sm">
                    <Text
                      bg="primary"
                      color="white"
                      px={3}
                      py={0.5}
                      borderRadius="full"
                      fontWeight="bold"
                      fontSize="xs"
                    >
                      {project.year}
                    </Text>
                    <Text color="textMuted" fontWeight="medium">
                      {project.category}
                    </Text>
                  </Flex>
                </Box>

                <Box color="text" lineHeight="relaxed" fontSize="sm">
                  <Text
                    color="text"
                    opacity={0.8}
                    dangerouslySetInnerHTML={{ __html: project.desc }}
                    css={{
                      "& em": {
                        color: "primary",
                        fontWeight: "bold",
                        fontStyle: "oblique",
                      },
                    }}
                    _dark={{
                      color: "white",
                    }}
                  />
                </Box>
              </Flex>

              <ProjectInfoModal project={project} />
            </MotionFlex>
          );
        })}
      </MotionGrid>
    </Box>
  );
}