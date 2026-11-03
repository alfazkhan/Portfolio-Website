"use client";
import websiteData from "@/data";
import { Box, Marquee, Heading, Text } from "@chakra-ui/react";

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
          <Box gap={8}>
            <Box mb={12}>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="semibold"
                color="text"
                textAlign="center"
                mb={6}
              >
                Core Skills
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
                    {skillsData.core.map((item, i) => (
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

            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="semibold"
              color="text"
              textAlign="center"
              mb={6}
            >
              Secondary Skills
            </Heading>

            <Marquee.Root
              pauseOnInteraction
              speed={70}
              height={100}
              width="auto"
              reverse
            >
              <Marquee.Edge side="end" />
              <Marquee.Viewport>
                <Marquee.Content>
                  {skillsData.secondary.map((item, i) => (
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
              <Marquee.Edge side="start" />
            </Marquee.Root>
          </Box>
        </Box>
      </Box>
    </>
  );
}