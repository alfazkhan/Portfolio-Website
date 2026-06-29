"use-client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export default function ProjectInfoModal() {
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
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
