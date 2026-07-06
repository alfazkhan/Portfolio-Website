"use-client";

import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Text,
  Image,
  Box
} from "@chakra-ui/react";
import NextImage from "next/image";

export default function ProjectInfoModal({ project }) {
  return (
    <Dialog.Root
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
      closeOnEscape
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
                <CloseButton size="2xl" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body justifyItems="center">
              <Box
                borderRadius="xl" 
                overflow="hidden" 
                px={10}
                mt={5} 
              >
                <Image
                  asChild
                  aspectRatio={1.91 / 1}
                  alt={project.title}
                  objectFit="cover"
                  borderRadius="xl" // Clear, consistent rounded boundaries
                >
                  <NextImage
                    src={project.img}
                    //   width={480} // Explicit width dimension to downscale the card safely
                    //   height={251} // Derived from: 480 / 1.91 = ~251
                    priority={true} // Performance optimization for modal entry
                  />
                </Image>
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
