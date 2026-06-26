"use client";

import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Separator,
  VStack,
  HStack,
  Button,
  Badge,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import websiteData from "../data";
import { FaStar } from "react-icons/fa";

const sidebarData = websiteData.sidebarData;

export default function LeftSidebar() {
  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Flex
      as="aside"
      display={{ base: "none", lg: "flex" }}
      position="fixed"
      left={0}
      top={0}
      w="300px"
      h="full"
      bg="bgAlt"
      direction="column"
      zIndex={40}
      borderRight="1px solid"
      borderColor="border"
      boxShadow="sm"
      transition="all 0.3s"
    >
      <Box
        flex="1"
        overflowY="auto"
        pb={4}
        css={{
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#D1D5DB",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#9CA3AF" },
        }}
      >
        {/* Profile Section */}
        <Flex
          direction="column"
          align="center"
          p={8}
          borderBottom="1px solid"
          borderColor="border"
        >
          <Box position="relative" w={32} h={32} mb={4}>
            <Image
              src={sidebarData.profileImg}
              alt="Alfaz Profile"
              boxSize="full"
              objectFit="cover"
              borderRadius="full"
              boxShadow="md"
            />
            <Box
              position="absolute"
              bottom={2}
              right={2}
              w={4}
              h={4}
              bg="green.500"
              border="2px solid"
              borderColor="bgAlt"
              borderRadius="full"
            />
          </Box>
          <Text fontSize="xl" fontWeight="bold" color="text">
            {sidebarData.name}
          </Text>
          <Text
            fontSize="sm"
            color="textMuted"
            fontWeight="medium"
            textAlign="center"
            mt={1}
            whiteSpace="pre-line"
          >
            {sidebarData.title}
          </Text>

          {/* Social Icons */}
          <HStack gap={3} mt={6}>
            {sidebarData.socials.map((social) => (
              <Flex
                key={social.id}
                as="a"
                href={social.link}
                w={8}
                h={8}
                borderRadius="full"
                bg="primary"
                color="gray.900"
                align="center"
                justify="center"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <social.icon />
              </Flex>
            ))}
          </HStack>
        </Flex>

        {/* Info Rows, Languages, Core Focus */}
        <Box p={8} pb={0}>
          <VStack gap={3} mb={4} align="stretch">
            {sidebarData.info.map((item, idx) => (
              <InfoRow
                key={idx}
                label={item.label}
                value={item.value}
                highlight={item.highlight}
                textColor={textColor}
              />
            ))}
          </VStack>

          <Separator borderColor="border" mb={6} />

          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" color="text" mb={4}>
              Languages
            </Text>
            {sidebarData.languages.map((item, idx) => (
              <LanguageProficiency
                key={idx}
                label={item.label}
                proficiency={item.proficiency}
                level={item.level}
              />
            ))}
          </Box>

          <Separator borderColor="border" mb={6} />

          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" color="text" mb={4}>
              Core Skills
            </Text>

            <VStack align="stretch" gap={0.5}>
              {sidebarData.coreSkills.map((skill, idx) => (
                <ExtraSkill key={idx} text={skill} />
              ))}
            </VStack>
          </Box>

          <Separator borderColor="border" mb={6} />

          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" color="text" mb={4}>
              Extra Skills
            </Text>
            <Wrap>
              {sidebarData.extraSkills.map((item, idx) => (
                <WrapItem key={idx}>
                  <Badge textTransform="full-size-kana" colorPalette="gray">
                    {item}
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        p={8}
        pt={6}
        borderTop="1px solid"
        borderColor="border"
        bg="bgAlt"
        flexShrink={0}
      >
        <Button
          w="full"
          py={6}
          bg="primary"
          color="gray.900"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="wider"
          textTransform="uppercase"
          boxShadow="sm"
          _hover={{ filter: "brightness(1.1)" }}
          onClick={() =>
            window.open(websiteData.introData.cvLink, "_blank").focus()
          }
          rounded="sm"
          rightIcon={
            <svg
              width="16px"
              height="16px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          }
        >
          Download CV
        </Button>
      </Box>
    </Flex>
  );
}

function InfoRow({ label, value, highlight, textColor }) {
  return (
    <Flex justify="space-between" align="center">
      <Box
        // bg="secondary"
        color={textColor}
        fontSize="11px"
        fontWeight="extrabold"
        px={2}
        py={0.5}
        borderRadius="sm"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        {label}
      </Box>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={highlight ? "green.500" : "text"}
      >
        {value}
      </Text>
    </Flex>
  );
}

function LanguageProficiency({ label, proficiency, level }) {
  const languageLevel = Array.from({ length: level });

  return (
    <Box mb={4}>
      <Flex justify="space-between" mb={1.5}>
        <Text fontSize="sm" color="textMuted" fontWeight="bolder">
          {label}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {proficiency}
        </Text>
      </Flex>
      <HStack gap={1} w="full">
        {languageLevel.map((_, idx) => (
          <Box key={idx} w="35px" h="10px" bg="primary" overflow="hidden" />
        ))}
      </HStack>
    </Box>
  );
}

function ExtraSkill({ text }) {
  return (
    <HStack
      align="flex-start"
      gap={3}
      color="textMuted"
      fontSize="sm"
      fontWeight="medium"
    >
      <Box color="primary" mt="2px" flexShrink={0}>
        <FaStar />
      </Box>
      <Text fontWeight="extrabold">{text}</Text>
    </HStack>
  );
}
