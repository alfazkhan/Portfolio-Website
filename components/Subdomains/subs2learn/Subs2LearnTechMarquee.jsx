"use client";

import React from "react";
import * as Chakra from "@chakra-ui/react";
import { SectionHeading } from "./shared";
import subs2learnData from "./data-2s2l";

const { Box, Container, Text } = Chakra;

let Marquee;
try {
  Marquee = Chakra.Marquee;
} catch {
  Marquee = null;
}

if (!Marquee) {
  Marquee = {
    Root: ({ children }) => <Box>{children}</Box>,
    Viewport: ({ children }) => <Box>{children}</Box>,
    Content: ({ children }) => <Box display="flex">{children}</Box>,
    Item: ({ children, ...props }) => <Box {...props}>{children}</Box>,
    Edge: () => null,
  };
}

export default function Subs2LearnTechMarquee() {
  const techData = subs2learnData.techStack;

  return (
    <Box
      as="section"
      id="tech-stack"
      py={{ base: 14, md: 24 }}
      borderBottomWidth="1px"
      borderColor="border"
      bg="bgAlt"
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Box mb={{ base: 8, md: 10 }}>
          <SectionHeading
            eyebrow={techData.eyebrow}
            title={techData.title}
            subtitle={techData.subtitle}
          />
        </Box>

        <Box py={4}>
          <Marquee.Root
            pauseOnInteraction
            speed={techData.speed || 60}
            height={techData.height || 110}
            width="auto"
          >
            <Marquee.Edge side="start" />
            <Marquee.Viewport>
              <Marquee.Content>
                {techData.items.map((item, i) => (
                  <Marquee.Item
                    key={i}
                    px="2.5rem"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="flex-end"
                  >
                    {item.icon && (
                      <Box
                        as="span"
                        display="inline-flex"
                        transition="transform 0.25s ease"
                        _hover={{ transform: "translateY(-4px) scale(1.08)" }}
                      >
                        <item.icon
                          size="3.5rem"
                          width="3.5rem"
                          height="3.5rem"
                          aria-hidden="true"
                          color={item.color}
                        />
                      </Box>
                    )}
                    <Text
                      fontVariant="all-small-caps"
                      fontWeight="semibold"
                      textAlign="center"
                      mt={2}
                      fontSize="sm"
                      color="text"
                    >
                      {item.name}
                    </Text>
                  </Marquee.Item>
                ))}
              </Marquee.Content>
            </Marquee.Viewport>
            <Marquee.Edge side="end" />
          </Marquee.Root>
        </Box>
      </Container>
    </Box>
  );
}
