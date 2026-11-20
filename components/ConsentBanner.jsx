"use client";

import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  initAnalyticsIfConsented,
  CONSENT_CHOICE,
} from "@/lib/analytics";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existingConsent = getAnalyticsConsent();

    if (existingConsent === null) {
      setIsVisible(true);
    } else if (existingConsent === CONSENT_CHOICE.ACCEPTED) {
      initAnalyticsIfConsented();
    }

    const handleOpenBanner = () => {
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-banner", handleOpenBanner);
    return () => {
      window.removeEventListener("open-cookie-banner", handleOpenBanner);
    };
  }, []);

  const handleAccept = async () => {
    setIsVisible(false);
    await setAnalyticsConsent(CONSENT_CHOICE.ACCEPTED);
  };

  const handleReject = async () => {
    setIsVisible(false);
    await setAnalyticsConsent(CONSENT_CHOICE.REJECTED);
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom={{ base: 3, md: 5 }}
      left={{ base: 3, md: 6 }}
      right={{ base: 3, md: 6 }}
      maxW="3xl"
      mx="auto"
      zIndex={1000}
      p={{ base: 4, md: 5 }}
      bg="bgAlt"
      color="text"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border"
      boxShadow="2xl"
      role="dialog"
      aria-labelledby="cookie-consent-heading"
      aria-describedby="cookie-consent-desc"
    >
      <Text
        id="cookie-consent-heading"
        fontSize="md"
        fontWeight="bold"
        color="text"
        mb={1.5}
      >
        Cookie & Privacy Preferences
      </Text>
      <Text
        id="cookie-consent-desc"
        fontSize="sm"
        color="textMuted"
        lineHeight="relaxed"
        mb={4}
      >
        We use strictly necessary local storage to remember your privacy choices. With your explicit consent, we also use Google Firebase Analytics to process pseudonymous technical metrics (such as visited pages, device types, and approximate geographic region) to understand visitor traffic. Firebase Analytics is disabled by default and will only activate if you accept. You can change your preferences at any time. For more information, please read our{" "}
        <Link
          asChild
          color="primary"
          textDecoration="underline"
          fontWeight="medium"
          _hover={{ opacity: 0.8 }}
        >
          <NextLink href="/privacy">Privacy Policy</NextLink>
        </Link>
        .
      </Text>
      <Flex
        gap={3}
        direction={{ base: "column-reverse", sm: "row" }}
        justify={{ base: "stretch", sm: "flex-end" }}
      >
        <Button
          type="button"
          size="sm"
          variant="outline"
          borderColor="border"
          color="text"
          _hover={{ bg: "mutedBox" }}
          flex={{ base: 1, sm: "initial" }}
          onClick={handleReject}
          aria-label="Reject analytics cookies"
        >
          Reject
        </Button>
        <Button
          type="button"
          size="sm"
          colorPalette="primary"
          bg="primary"
          color="buttonText"
          _hover={{ opacity: 0.9 }}
          flex={{ base: 1, sm: "initial" }}
          onClick={handleAccept}
          aria-label="Accept analytics cookies"
        >
          Accept Analytics
        </Button>
      </Flex>
    </Box>
  );
}
