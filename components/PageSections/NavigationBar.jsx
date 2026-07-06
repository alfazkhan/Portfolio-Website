"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import {
  FiHome,
  FiCode,
  FiBriefcase,
  FiBookOpen,
  FiMail,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", id: "home", icon: FiHome },
  { name: "Works", id: "works", icon: FiBriefcase },
  { name: "Education", id: "education", icon: FiBookOpen },
  { name: "Skills", id: "skills", icon: FiCode },
  { name: "Contact", id: "contact", icon: FiMail },
];

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isClickScrolling = useRef(false);
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleLinkClick(id) {
    setActiveSection(id);
    isClickScrolling.current = true;
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const sectionIds = navLinks.map((l) => l.id);
      let currentActive = "home";
      const scrollOffset = window.innerHeight / 3;

      // 1. Calculate active states based on physical bounding scroll lines
      for (const id of sectionIds) {
        if (id === "home") continue;
        const element = document.getElementById(id);
        if (element && window.scrollY >= element.offsetTop - scrollOffset) {
          currentActive = id;
        }
      }

      // 2. Clear boundary checks when user is explicitly at the top
      if (window.scrollY < 100) {
        currentActive = "home";
      } else {
        // 3. Industry standard safety guard added: window.scrollY > 0
        // This stops the bottom calculation from firing on fresh page mounts
        const isAtBottom =
          window.scrollY > 0 &&
          window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 50;

        if (isAtBottom) {
          currentActive = navLinks[navLinks.length - 1].id;
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Fire once immediately to establish ground truth placement
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* MOBILE NAV */}
      <Flex
        as="nav"
        display={{ base: "flex", lg: "none" }}
        position="fixed"
        top={0}
        left={0}
        w="full"
        bg="bg"
        zIndex={50}
        py={5}
        px={6}
        borderBottom="1px solid"
        borderColor="border"
        justify="space-between"
        align="center"
        transition="all 0.3s"
      >
        <Box as="button" onClick={toggleColorMode}>
          <motion.span
            animate={{
              color: colorMode === "light" ? "#000000" : "#ffffff",
              rotate: colorMode === "light" ? 0 : 180,
            }}
            style={{ fontSize: 24, display: "inline-block" }}
          >
            {colorMode === "light" ? <FiMoon /> : <FiSun />}
          </motion.span>
          )
        </Box>
        <Box as="button" onClick={toggleMenu}>
          <Icon as={IoMenuOutline} w={5} h={5} color="text" />
        </Box>
      </Flex>

      {/* MOBILE MENU OVERLAY */}
      <Flex
        display={{ base: "flex", lg: "none" }}
        position="fixed"
        inset={0}
        w="full"
        h="100vh"
        bg="bg"
        zIndex={9999}
        direction="column"
        transition="all 0.5s ease-in-out"
        filter={isOpen ? "blur(0px)" : "blur(15px)"}
        transform={isOpen ? "translateY(0)" : "translateY(-100%)"}
      >
        <Flex justify="flex-end" p={8}>
          <Box as="button" onClick={toggleMenu}>
            <Icon
              as={IoCloseOutline}
              w={10}
              h={10}
              color="text"
              _hover={{ color: "primary" }}
            />
          </Box>
        </Flex>
        <Flex
          as="ul"
          direction="column"
          align="center"
          justify="center"
          flexGrow={1}
          gap={12}
          fontSize="3xl"
          fontWeight="bold"
          color="text"
          listStyleType="none"
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <Box
                as="button"
                onClick={() => handleLinkClick(link.id)}
                _hover={{ color: "primary" }}
                transition="colors 0.2s"
              >
                {link.name}
              </Box>
            </li>
          ))}
        </Flex>
      </Flex>

      {/* DESKTOP SIDEBAR */}
      <Flex
        as="nav"
        display={{ base: "none", lg: "flex" }}
        position="fixed"
        right={0}
        top={0}
        h="100vh"
        w="80px"
        bg="bgAlt"
        direction="column"
        align="center"
        zIndex={50}
        borderLeft="1px solid"
        borderColor="border"
        boxShadow="sm"
        transition="all 0.3s"
      >
        <Box mt={8} mb="auto">
          <Flex
            as="button"
            w="12"
            h="12"
            align="center"
            justify="center"
            onClick={toggleColorMode}
            _hover={{ opacity: 0.7 }}
            title="Toggle Theme"
          >
            <motion.span
              animate={{
                color: colorMode === "light" ? "#000000" : "#ffffff",
                rotate: colorMode === "light" ? 0 : 180,
              }}
              style={{ fontSize: 24, display: "inline-block" }}
            >
              {colorMode === "light" ? <FiMoon /> : <FiSun />}
            </motion.span>
          </Flex>
        </Box>

        <Flex direction="column" gap={6} mb="auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <Box
                key={link.id}
                position="relative"
                role="group"
                display="flex"
                justifyContent="center"
              >
                <Flex
                  as="button"
                  onClick={() => handleLinkClick(link.id)}
                  w="10"
                  h="10"
                  align="center"
                  justify="center"
                >
                  <Icon
                    as={link.icon}
                    w="15px"
                    h="15px"
                    transform={isActive ? "scale(1.5)" : "scale(1)"}
                    color="text"
                  />
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      style={{
                        position: "absolute",
                        width: "130%",
                        height: "130%",
                        background: "var(--chakra-colors-primary)",
                        zIndex: -100,
                        borderRadius: "100%",
                        boxShadow: "100px",
                      }}
                    />
                  )}
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}
