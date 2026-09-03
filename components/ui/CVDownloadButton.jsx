"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flex, Text, Icon, Box, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogleDrive } from "react-icons/fa";
import websiteData from "@/data";

const MotionFlex = motion.create(Flex);
const MotionIcon = motion.create(Box);

export default function CVDownloadButton() {
  const cvLinks = websiteData.introData.cvLinks;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close container when tapping or clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const containerVariants = {
    collapsed: { height: "48px" },
    expanded: { height: "150px" },
  };

  const choiceVariants = {
    hidden: { opacity: 0, y: -10, pointerEvents: "none" },
    visible: { opacity: 1, y: 0, pointerEvents: "auto" },
  };

  return (
    <MotionFlex
      ref={containerRef}
      direction="column"
      w="full"
      bg="primary"
      borderRadius="sm"
      boxShadow="sm"
      overflow="hidden"
      p={2}
      gap={2}
      variants={containerVariants}
      animate={isOpen ? "expanded" : "collapsed"}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      // Clean mobile click toggle behavior
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {/* Main Trigger Track */}
      <Flex
        w="full"
        h="32px"
        align="center"
        justify="center"
        gap={2}
        cursor="pointer"
        color="buttonText"
      >
        <MotionIcon
          animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaGoogleDrive} boxSize="5" />
        </MotionIcon>

        <Text fontWeight="bold" fontSize="lg" alignItems="center">
          <motion.span
            key={isOpen ? "choose" : "download"}
            initial={{ opacity: 0, y: 5, rotateX: 0 }}
            animate={{ opacity: 1, y: 0, rotateX: 180 }}
            exit={{ opacity: 0, y: -5, rotateX: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            {isOpen ? "Choose Language" : "Download CV"}
          </motion.span>
        </Text>
      </Flex>

      {/* Sub-menu download tracks */}
      <AnimatePresence>
        {isOpen && (
          <Flex
            direction="column"
            gap={1.5}
            w="full"
            onClick={(e) => e.stopPropagation()}
          >
            <MotionFlex
              variants={choiceVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, delay: 0.05 }}
              as="button"
              w="full"
              py={1.5}
              px={3}
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
              color="buttonText"
              borderRadius="xs"
              align="center"
              justify="space-between"
              onClick={() => window.open(cvLinks.english)}
            >
              <Text fontSize="sm" fontWeight="semibold">
                English Version
              </Text>
              <Image
                src="/English.svg"
                alt="English Flag"
                boxSize="5"
                objectFit="contain"
              />
            </MotionFlex>

            <MotionFlex
              variants={choiceVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2, delay: 0.1 }}
              as="button"
              w="full"
              py={1.5}
              px={3}
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
              color="buttonText"
              borderRadius="xs"
              align="center"
              justify="space-between"
              onClick={() => window.open(cvLinks.deutsch)}
            >
              <Text fontSize="sm" fontWeight="semibold">
                German Version
              </Text>
              <Image
                src="/German.svg"
                alt="German Flag"
                boxSize="5"
                objectFit="contain"
              />
            </MotionFlex>
          </Flex>
        )}
      </AnimatePresence>
    </MotionFlex>
  );
}
