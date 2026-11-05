"use-client";

import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Image,
  Box,
  Group,
  Text,
  Separator,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useColorMode } from "@/components/ui/color-mode";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";

export default function ProjectInfoModal({ project, downloadLinks }) {
  const { colorMode } = useColorMode();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          bg="primary"
          size="sm"
          px={3}
          mt={5}
          borderRadius="sm"
          fontWeight="bold"
          fontSize="sm"
          boxShadow="md"
          width="full"
          _hover={{ filter: "brightness(1.1)", transform: "scale(1.02)" }}
          _active={{ transform: "scale(0.95)" }}
          transition="all 0.2s"
        >
          About Project
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content background="Background" maxWidth="full" maxHeight="full" css={{ height: "100%", overflow: "hidden" }}>
            <Flex flexDir="column" h="100%" p={4}>
              <Box w="full" justifyContent="flex-start">
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="2xl" colorPalette="red" />
                </Dialog.CloseTrigger>
              </Box>
              <Flex flexDir="column" flexShrink={1} gap={4}>
                <ProjectImage title={project.title} image={project.img} />
                <ProjectSkills skills={project.skills} />
                <ProjectMarkdownContent fileMarkdownPath={project.markdownPath} />
              </Flex>
              <Box w="full" justifyContent="center">
                <Dialog.Footer>
                  <ProjectFooter
                    repoLink={project.repoLink}
                    liveLink={project.link}
                  />
                </Dialog.Footer>
              </Box>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

const ProjectImage = ({ title, image }) => (
  <Box borderRadius="xl" overflow="hidden" px={1} mt={2} height="2xs">
    <Image
      asChild
      aspectRatio={1.91 / 1}
      alt={title}
      objectFit="fill"
      borderRadius="xl"
    >
      <NextImage src={image} priority={true} />
    </Image>
  </Box>
);

const ProjectSkills = ({ skills }) => {
  const { colorMode } = useColorMode();
  return (
    <Box mt={4}>
      <Group
        mx="auto"
        display="flex"
        justifyContent="space-around"
        flexDir="row"
        flexWrap="wrap"
      >
        {skills.map((skill, index, array) => {
          return (
            <>
              <Box
                key={skill.id}
                display="flex"
                alignItems="center"
                flexDir="column"
                height={50}
                width="auto"
              >
                {skill.class ? (
                  <i class={skill.class} style={{ fontSize: 30 }} />
                ) : (
                  skill.component
                )}
                <Text fontVariant="all-small-caps" fontWeight="semibold">
                  {skill.name}
                </Text>
              </Box>
              <Separator
                display={array.length - 1 === index ? "none" : "block"}
                orientation="vertical"
                height="6"
                variant="dotted"
              />
            </>
          );
        })}
      </Group>
    </Box>
  );
};

const ProjectFooter = ({ repoLink, liveLink, downloadLinks }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      {downloadLinks && (
        <>
          <Button
            size="md"
            colorPalette="blue"
            mr={2}
            onClick={() => window.open(downloadLinks.chrome)}
          >
            Install for Chrome
          </Button>
          <Button
            size="md"
            colorPalette="orange"
            mr={2}
            onClick={() => window.open(downloadLinks.firefox)}
          >
            Install for Firefox
          </Button>
        </>
      )}
      {repoLink && liveLink && (
        <>
          <Separator my={4} />
          <Button
            size="md"
            bgColor={colorMode === "light" ? "black" : "white"}
            color={colorMode === "light" ? "gray.100" : "gray.900"}
            onClick={() => window.open(repoLink)}
          >
            Github Repo
          </Button>
          <Button
            size="md"
            colorPalette="green"
            color="gray.100"
            onClick={() => window.open(liveLink)}
          >
            Live Preview
          </Button>
        </>
      )}
    </>
  );
};

const ProjectMarkdownContent = ({ fileMarkdownPath }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetch(fileMarkdownPath)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading markdown file:", err);
        setLoading(false);
      });
  }, [fileMarkdownPath]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      className={`markdown-body  ${colorMode === "dark" ? "markdown-body-dark" : "markdown-body-light"}`}
      p={4}
      mt={2}
      borderRadius="md"
      bgColor="transparent"
      color={colorMode === "light" ? "gray.900" : "gray.100"}
      maxWidth="65ch"
      width="100%"
      overflowX="auto"
      overflowY="scroll"
      height="50vh"
      fontFamily="system-ui"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  );
};
