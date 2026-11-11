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
import { FaChrome, FaFirefox, FaEye, FaGithub } from "react-icons/fa6";

export default function ProjectInfoModal({ project, downloadLinks }) {
  const { colorMode } = useColorMode();

  return (
    <Dialog.Root size="full">
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
          <Dialog.Content
            background="Background"
            maxWidth={{ base: "100vw", md: "80vw" }}
            maxHeight="95dvh"
            mt={1}
            // borderWidth={2}
            // borderColor="primary"
            css={{ overflowY: "scroll", overflowX: "hidden" }}
          >
            <Box w="full" justifyContent="flex-start">
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  variant="solid"
                  size="xl"
                  colorPalette="red"
                  border="2px solid"
                  borderColor="darkred"
                  shadow="2px 2px 5px red"
                />
              </Dialog.CloseTrigger>
            </Box>
            <Dialog.Body>
              <Flex flexDir="column" flexShrink={1} gap={1}>
                <ProjectImage title={project.title} image={project.img} />
                <ProjectSkills skills={project.skills} />
                <ProjectMarkdownContent
                  fileMarkdownPath={project.markdownPath}
                />
                {/* <Text>{project.text}</Text> */}
              </Flex>
            </Dialog.Body>
            <Box w="full" justifyContent="center">
              <Dialog.Footer>
                <ProjectFooter
                  repoLink={project.repoLink}
                  liveLink={project.link}
                  downloadLinks={project.downloadLinks}
                />
              </Dialog.Footer>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

const ProjectImage = ({ title, image }) => (
  <Box
    borderRadius="xl"
    overflow="hidden"
    px={1}
    mt={2}
    maxH={{ base: "auto", md: "50vh" }}
  >
    <NextImage
      src={image}
      priority={true}
      alt={title}
      borderRadius="xl"
      loading="eager"
    />
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
        gap={1}
      >
        {skills.map((skill, index, array) => {
          return (
            <>
              <Box
                key={skill.id}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                flexDir="column"
                maxHeight={{ base: "10", md: "50" }}
                // height={50}
                width="auto"
              >
                {skill.class ? (
                  <i className={skill.class} style={{ fontSize: 20 }} />
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

export const ProjectFooter = ({ repoLink, liveLink, downloadLinks }) => {
  const { colorMode } = useColorMode();

  const allowedPlatforms = ["MacIntel", "Win32", "Linux x86_64"];
  return (
    <>
      {downloadLinks && (
        <Flex gap={2} flexWrap="wrap" justifyContent="center">
          <Button
            size="md"
            bgColor={colorMode === "light" ? "black" : "white"}
            color={colorMode === "light" ? "gray.100" : "gray.900"}
            onClick={() => window.open(repoLink)}
            width="full"
          >
            <FaGithub />
            Github Repo
          </Button>
          <Flex gap={2} w="full">
            <Button
              display={!allowedPlatforms.includes(navigator.platform) && "none"}
              size="sm"
              colorPalette="blue"
              flex={1}
              onClick={() => window.open(downloadLinks.chrome)}
            >
              <FaChrome />
              Chrome Store
            </Button>
            <Button
              display={!allowedPlatforms.includes(navigator.platform) && "none"}
              size="sm" // Changed from sm to md for uniform sizing
              colorPalette="orange"
              flex={1}
              onClick={() => window.open(downloadLinks.firefox)}
            >
              <FaFirefox />
              Firefox Store
            </Button>
          </Flex>
        </Flex>
      )}
      {repoLink && liveLink && !downloadLinks && (
        <Flex gap={2} flexWrap="wrap" justifyContent="center" w="full">
          <Button
            size="md"
            bgColor={colorMode === "light" ? "black" : "white"}
            color={colorMode === "light" ? "gray.100" : "gray.900"}
            onClick={() => window.open(repoLink)}
            width="full"
          >
            <FaGithub />
            Github Repo
          </Button>
          <Button
            size="md"
            colorPalette="green"
            color="gray.100"
            width="full"
            onClick={() => window.open(liveLink)}
          >
            <FaEye />
            Live Preview
          </Button>
        </Flex>
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
      maxWidth="100%"
      width="100%"
      overflowX="auto"
      overflowY="scroll"
      fontFamily="system-ui"
      // css={{
      //   "&::-webkit-scrollbar": {
      //     display: "none",
      //   },
      //   scrollbarWidth: "none",
      //   msOverflowStyle: "none",
      // }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  );
};
