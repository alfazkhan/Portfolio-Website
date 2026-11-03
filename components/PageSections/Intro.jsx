"use client";

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Highlight,
  useBreakpointValue, // 👈 1. Import the responsive breakpoint hook
} from "@chakra-ui/react";
import websiteData from "../../data";
import { motion } from "framer-motion";
import CVDownloadButton from "@/components/ui/CVDownloadButton";
import AtomicOrbit from "../ui/AtomicOrbit";

const introData = websiteData.introData;

export default function Intro() {
  // 👈 2. Define phone vs desktop orbital dimensions here:
  const orbitRadii = useBreakpointValue({
    base: { radiusX: 145, radiusY: 65 }, // Mobile phones
    md: { radiusX: 180, radiusY: 80 }, // Tablets
    lg: { radiusX: 220, radiusY: 95 }, // Desktop
  }) || { radiusX: 220, radiusY: 95 }; // Fallback for initial SSR mount

  return (
    <Box
      as="section"
      id="home"
      position="relative"
      w="full"
      py={{ base: 20, xlDown: 6 }}
      px={{ base: 10, xlDown: 6 }}
      maxW="6xl"
      mx="auto"
      borderBottom="1px solid"
      borderColor="border"
    >
      <Flex
        direction={{ base: "row", xlDown: "column" }}
        align="center"
        justify="space-between"
        gap={12}
      >
        <Box
          w={{ base: "60%", xlDown: "full" }}
          order={2}
          textAlign={{ base: "left", xlDown: "center" }}
        >
          <Heading
            fontSize={{ base: "5xl", xlDown: "4xl" }}
            fontWeight="bold"
            lineHeight="moderate"
            mb={6}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ display: "block" }}
              viewport={{ once: true }}
            >
              <Highlight
                query={["Frontend Engineer", "React & Typescript"]}
                styles={{
                  px: "2",
                  py: "0.5",
                  color: "white",
                  bg: "primary",
                  borderRadius: "sm",
                }}
              >
                {introData.headline}
              </Highlight>
            </motion.span>
          </Heading>

          <Box
            fontSize="lg"
            color="text"
            mb={6}
            lineHeight="relaxed"
            opacity={0.9}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              {introData.para}
            </motion.p>
          </Box>
          <CVDownloadButton />
        </Box>

        <Flex
          w={{ base: "40%", xlDown: "full" }}
          justify="center"
          align="center"
          position="relative"
          order={{ base: 2, xlDown: 1 }}
          py={{ base: 14, xlDown: 8 }}
        >
          {/* 👈 3. Pass responsive dimensions to the BACK LAYER */}
          <AtomicOrbit
            radiusX={orbitRadii.radiusX}
            radiusY={orbitRadii.radiusY}
            layer="back"
          />

          {/* Nucleus: Profile Image */}
          <motion.div
            initial={{ borderColor: "#D73101" }}
            animate={{ borderColor: "#F58B51" }}
            transition={{
              duration: 3,
              repeatType: "reverse",
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              border: "6px solid",
              borderRadius: "100%",
              position: "relative",
              zIndex: 10,
              backgroundColor: "#18181b",
            }}
          >
            <Box
              w={{ base: 72, xlDown: 56 }}
              h={{ base: 72, xlDown: 56 }}
              borderRadius="full"
              overflow="hidden"
              position="relative"
            >
              <Image
                src={introData.imageSrc}
                w="full"
                h="full"
                objectFit="cover"
                alt="Alfaz Profile"
                loading="lazy"
              />
            </Box>
          </motion.div>

          {/* 👈 4. Pass responsive dimensions to the FRONT LAYER */}
          <AtomicOrbit
            radiusX={orbitRadii.radiusX}
            radiusY={orbitRadii.radiusY}
            layer="front"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
