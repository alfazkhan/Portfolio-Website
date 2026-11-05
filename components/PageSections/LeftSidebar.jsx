"use client";

import {
  Box,
  Flex,
  Text,
  Separator,
  VStack,
  HStack,
  Badge,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import websiteData from "../../data";
import { FaStar } from "react-icons/fa";
import CVDownloadButton from "../ui/CVDownloadButton";
import { motion, stagger } from "framer-motion";
import GrayFlexWrapper from "../GrayFlexWrapper";
import NextImage from "next/image";

const sidebarData = websiteData.sidebarData;

export default function LeftSidebar() {
  return (
    <GrayFlexWrapper
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
            <NextImage
              src={sidebarData.profileImg}
              alt="Alfaz Profile"
              unoptimized
              width={300}
              height={315}
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ borderRadius: "100%", boxShadow: "5px" }}
              loading="eager"
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
                bg={social.color}
                color="buttonText"
                align="center"
                justify="center"
                _hover={{ opacity: 0.8 }}
                // transition="opacity 0.3s"
              >
                <social.icon />
              </Flex>
            ))}
          </HStack>
        </Flex>

        <Box p={8} pb={0}>
          <VStack gap={3} mb={4} align="stretch">
            {sidebarData.info.map((item, idx) => (
              <InfoRow
                key={idx}
                label={item.label}
                value={item.value}
                highlight={item.highlight}
              />
            ))}

            <Separator borderColor="border" mb={2} />
          </VStack>

          {/* <Separator borderColor="border" mb={6} zIndex={1} /> */}

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
                index={idx}
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
                <ExtraSkill key={idx} text={skill.name} />
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
                    {item.name}
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
        <CVDownloadButton />
      </Box>
    </GrayFlexWrapper>
  );
}

// FIX: Removed 'export default' from helper component
function InfoRow({ label, value, highlight }) {
  return (
    <Flex justify="space-between" align="center">
      <Box
        color="text"
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

// FIX: Removed 'export default' from helper component
function LanguageProficiency({
  label,
  proficiency,
  level,
  totalLength = 6,
  index,
}) {
  const boxes = Array.from({ length: totalLength }, (_, idx) => ({
    isFilled: idx < level,
    id: idx,
  }));

  const rowStartDelay = index * 0.3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.05, { startDelay: rowStartDelay }),
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <Box mb={4}>
      <Flex justify="space-between" mb={1.5}>
        <Text fontSize="sm" color="text" fontWeight="bolder">
          {label}
        </Text>
        <Text fontSize="sm" color="textMuted">
          {proficiency}
        </Text>
      </Flex>

      <motion.ul
        style={{
          display: "flex",
          gap: "4px",
          width: "100%",
          padding: 0,
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
          margin: "-20px",
        }}
      >
        {boxes.map((box) => (
          <motion.li
            key={box.id}
            variants={itemVariants} 
            style={{
              width: "35px",
              height: "10px",
              background: box.isFilled
                ? "var(--chakra-colors-primary)"
                : "var(--chakra-colors-mutedBox)",
              borderRadius: "2px",
            }}
          />
        ))}
      </motion.ul>
    </Box>
  );
}

function ExtraSkill({ text }) {
  return (
    <HStack
      align="flex-start"
      gap={3}
      color="text"
      fontSize="sm"
    >
      <Box color="primary" mt="2px" flexShrink={0}>
        <FaStar />
      </Box>
      <Text fontWeight="bold">{text}</Text>
    </HStack>
  );
}