"use client";
import websiteData from "@/data";
import { Box, Marquee, Heading, Text } from "@chakra-ui/react";
import {
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoVimeo,
} from "react-icons/io5";

export default function SkillsSection() {
  const skillsData = websiteData.getSkillsData("skillsIcon");

  return (
    <>
      <Box
        as="section"
        id="skills"
        position="relative"
        w="full"
        py={{ base: 16, lg: 24 }}
        bg="bg"
        borderBottom="1px solid"
        borderColor="border"
      >
        <Box maxW="7xl" mx="auto" px={{ base: 6, md: 10 }}>
          <Heading
            as="h2"
            fontSize="3xl"
            fontWeight="bold"
            color="text"
            mb={12}
            textAlign={{ base: "center", lg: "center" }}
          >
            Software & Tools
          </Heading>
          <Marquee.Root
            pauseOnInteraction
            speed={70}
            height={100}
            width="auto"
          >
            <Marquee.Edge side="start" />
            <Marquee.Viewport>
              <Marquee.Content>
                {skillsData.map((item, i) => (
                  <Marquee.Item
                    key={i}
                    px="2rem"
                    display="flex"
                    justifyItems="baseline"
                    alignItems="center"
                    flexDir="column"
                    justifyContent="flex-end"
                  >
                    {item.icon && (
                      <item.icon
                        size="4rem"
                        aria-label={item.label}
                        color={item.color}
                      />
                    )}
                    <Text
                      fontVariant="all-small-caps"
                      fontWeight="semibold"
                      textAlign="center"
                      mt={2}
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
      </Box>
    </>
  );
}

const items = [
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
];
