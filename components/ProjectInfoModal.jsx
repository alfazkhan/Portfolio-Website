"use-client";

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Image,
  Box,
  Group,
  Badge,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useColorMode } from "@/components/ui/color-mode";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";

export default function ProjectInfoModal({ project }) {
  return (
    <Dialog.Root
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      closeOnEscape
      lazyMount
    >
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
          <Dialog.Content background="Background">
            <Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="2xl" colorPalette="red" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body justifyItems="center">
              <ProjectImage title={project.title} image={project.img} />
              <ProjectSkills skills={project.skills} />
              <ProjectMarkdownContent fileMarkdownPath={project.markdownPath} />
            </Dialog.Body>
            <Dialog.Footer>
              <ProjectFooter
                repoLink={project.repoLink}
                liveLink={project.link}
              />
            </Dialog.Footer>
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
  return (
    <Box mt={2}>
      <Group>
        {skills.map((skill) => {
          return (
            <Badge
              key={skill.id}
              variant="solid"
              bgColor={skill.color}
              size="lg"
              shadow="1px solid large"
            >
              <skill.icon />
              {skill.name}
            </Badge>
          );
        })}
      </Group>
    </Box>
  );
};

const ProjectFooter = ({ repoLink, liveLink }) => {
  const { colorMode } = useColorMode();
  return (
    <>
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
      overflowX="hidden"
      overflowY="scroll"
      height="50vh"
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
