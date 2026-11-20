"use client";

import React from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { openCookieSettings } from "@/lib/analytics";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      borderTopWidth="1px"
      borderColor="border"
      bg="bg"
      py={6}
      px={{ base: 4, md: 8 }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align="center"
        justify="space-between"
        gap={4}
        maxW="6xl"
        mx="auto"
      >
        <Text fontSize="xs" color="textMuted">
          (c) {currentYear} Alfaz Khan. All rights reserved.
        </Text>

        <Flex gap={5} wrap="wrap" justify="center">
          <Link
            asChild
            fontSize="xs"
            color="textMuted"
            _hover={{ color: "primary", textDecoration: "underline" }}
          >
            <NextLink href="/privacy">Privacy Policy</NextLink>
          </Link>

          <Box
            as="button"
            type="button"
            onClick={openCookieSettings}
            fontSize="xs"
            color="textMuted"
            _hover={{ color: "primary", textDecoration: "underline" }}
            cursor="pointer"
            background="none"
            border="none"
            padding={0}
            font="inherit"
            aria-label="Open cookie preferences dialog"
          >
            Cookie Settings
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
