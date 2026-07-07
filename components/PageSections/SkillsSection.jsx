"use client";

import React from "react";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import websiteData from "../../data";


const softMarquee = keyframes`
  0% { 
    transform: translate3d(0, 0, 0); 
    opacity: 0; 
  }
  2% { 
    opacity: 1; 
  }
  98% { 
    opacity: 1; 
  }
  100% { 
    transform: translate3d(-33.3333%, 0, 0); 
    opacity: 0; 
  }
`;

export default function SkillsSection() {
  const skillsData = websiteData.getSkillsData("skillsIcon");

  // Tripling the data ensures the browser always has "buffer" content
  const tripleData = [...skillsData, ...skillsData, ...skillsData];

  return (
    <Box
      as="section"
      id="skills"
      position="relative"
      w="full"
      py={{ base: 16, lg: 24 }}
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
      transition="all 0.3s"
    >
      {/* Container width matched exactly to Intro and MaxW 6xl */}
      <Box maxW="6xl" mx="auto" px={{ base: 6, md: 10 }}>
        <Heading
          as="h2"
          fontSize="3xl"
          fontWeight="bold"
          color="text"
          mb={12}
          textAlign={{ base: "center", lg: "left" }}
        >
          Software & Tools
        </Heading>

        <Box
          position="relative"
          w="full"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            zIndex: 2,
            top: 0,
            left: 0,
            bottom: 0,
            w: "15%",
            bgGradient: "linear(to-r, bg, transparent)",
            pointerEvents: "none",
          }}
          _after={{
            content: '""',
            position: "absolute",
            zIndex: 2,
            top: 0,
            right: 0,
            bottom: 0,
            w: "15%",
            bgGradient: "linear(to-l, bg, transparent)",
            pointerEvents: "none",
          }}
        >
          <Flex
            w="max-content"
            display="inline-flex"
            animation={`${softMarquee} 25s linear infinite`}
            _hover={{ animationPlayState: "paused" }}
            style={{
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {tripleData.map((skill, index) => (
              <Flex
                key={`${skill.id}-${index}`}
                direction="column"
                align="center"
                justify="center"
                px={{ base: 8, md: 12 }}
                gap={4}
              >
                {skill.isCustomSvg ? (
                  <Box
                    boxSize={{ base: "40px", md: "50px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      transform: "scale(var(--icon-scale))",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={`${skill.name} Logo`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
                  <Icon
                    as={skill.icon}
                    boxSize={{ base: "40px", md: "50px" }}
                    color={skill.color}
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.1)" }}
                  />
                )}
                <Text
                  color="textMuted"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  userSelect="none"
                >
                  {skill.name}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
