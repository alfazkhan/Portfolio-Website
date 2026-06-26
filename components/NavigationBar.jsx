"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
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
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      const sectionIds = navLinks.map((l) => l.id);
      let currentActive = "home";
      const scrollOffset = window.innerHeight / 3;

      for (const id of sectionIds) {
        if (id === "home") continue;
        const element = document.getElementById(id);
        if (element && window.scrollY >= element.offsetTop - scrollOffset) {
          currentActive = id;
        }
      }
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        currentActive = navLinks[navLinks.length - 1].id;
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
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
          {mounted ? (
            <Icon
              as={colorMode === "light" ? FiMoon : FiSun}
              w={6}
              h={6}
              color="text"
            />
          ) : (
            <Box w={6} h={6} />
          )}
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
        h="full"
        bg="bg"
        zIndex={9999}
        direction="column"
        transition="all 0.3s ease-in-out"
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
        h="full"
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
            transition="opacity 0.2s"
            title="Toggle Theme"
          >
            <Icon
              as={colorMode === "light" ? FiMoon : FiSun}
              w={6}
              h={6}
              color="text"
            />
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
                  borderRadius="full"
                  align="center"
                  justify="center"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  bg={isActive ? "primary" : "transparent"}
                  color={isActive ? "gray.900" : "textMuted"}
                  boxShadow={isActive ? "lg" : "none"}
                  transform={isActive ? "scale(1.15)" : "scale(1)"}
                  _hover={
                    !isActive
                      ? {
                          bg:
                            colorMode === "light"
                              ? "gray.100"
                              : "whiteAlpha.100",
                          color: "text",
                        }
                      : {}
                  }
                >
                  <Icon as={link.icon} w="15px" h="15px" />
                </Flex>

                {/* Custom Tooltip */}
                <Box
                  position="absolute"
                  top="-45px"
                  bg="text"
                  color="bg"
                  fontSize="xs"
                  fontWeight="bold"
                  px={3}
                  py={1.5}
                  borderRadius="md"
                  opacity={0}
                  visibility="hidden"
                  _groupHover={{
                    opacity: 1,
                    visibility: "visible",
                    top: "-50px",
                  }}
                  transition="all 0.2s"
                  pointerEvents="none"
                  whiteSpace="nowrap"
                  boxShadow="xl"
                >
                  {link.name}
                  <Box
                    position="absolute"
                    top="100%"
                    left="50%"
                    transform="translateX(-50%)"
                    borderWidth="5px"
                    borderColor="transparent"
                    borderTopColor="text"
                  />
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}
