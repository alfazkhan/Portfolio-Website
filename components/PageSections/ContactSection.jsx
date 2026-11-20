"use client";

import { useState } from "react";
import { Box, Flex, Heading, Text, Icon, Link } from "@chakra-ui/react";
import { FiMail, FiPhone, FiCopy } from "react-icons/fi";
import GrayFlexWrapper from "../GrayFlexWrapper";
import websiteData from "@/data";

export default function ContactSection() {
  const [copiedText, setCopiedText] = useState("");
  const { email, phone, phoneHref } = websiteData.contactData;

  const handleCopy = async (text) => {
    // Primary method: Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(""), 2000);
        return;
      } catch (err) {
        console.error("Clipboard API failed", err);
      }
    }

    // Fallback method: For non-secure contexts (HTTP)
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Ensure the textarea is not visible or disruptive
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setCopiedText(text);
        setTimeout(() => setCopiedText(""), 2000);
      }
    } catch (err) {
      console.error("Fallback copy failed", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <GrayFlexWrapper
      as="section"
      id="contact"
      py={{ base: 20, md: 24 }}
      direction="column"
      align="center"
      justify="center"
      px={6}
      borderTop="1px solid"
      borderColor="border"
    >
      <Heading as="h2" fontSize="2xl" fontWeight="bold" color="text" mb={4}>
        Contact
      </Heading>
      <Text
        color="textMuted"
        fontSize={{ base: "md", md: "xl" }}
        textAlign="center"
        maxW="2xl"
        lineHeight="relaxed"
        mb={16}
      >
        What&apos;s next? Feel free to reach out to me if you&apos;re looking for a developer, have a query, or simply want to connect.
      </Text>

      {/* Email Row */}
      <Flex align="center" gap={{ base: 3, md: 5 }} mb={4}>
        <Icon
          as={FiMail}
          boxSize={{ base: 5, md: 7 }}
          color="textMuted"
          flexShrink={0}
          aria-hidden="true"
        />
        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="extrabold"
          color="text"
          letterSpacing="tight"
        >
          <Link
            href={`mailto:${email}`}
            color="inherit"
            _hover={{ color: "primary", textDecoration: "none" }}
          >
            {email}
          </Link>
        </Heading>
        <Box
          as="button"
          type="button"
          aria-label="Copy email address"
          onClick={() => handleCopy(email)}
          position="relative"
          p={2}
          color="textMuted"
          _hover={{ color: "primary" }}
          transition="all 0.2s"
        >
          {copiedText === email && (
            <Text
              role="status"
              aria-live="polite"
              position="absolute"
              top="-20px"
              left="50%"
              transform="translateX(-50%)"
              fontSize="xs"
              fontWeight="bold"
              color="primary"
            >
              Copied!
            </Text>
          )}
          <Icon as={FiCopy} boxSize={{ base: 4, md: 5 }} aria-hidden="true" />
        </Box>
      </Flex>

      {/* Phone Row */}
      <Flex align="center" gap={{ base: 3, md: 5 }}>
        <Icon
          as={FiPhone}
          boxSize={{ base: 5, md: 7 }}
          color="textMuted"
          flexShrink={0}
          aria-hidden="true"
        />
        <Heading
          as="h3"
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="extrabold"
          color="text"
          letterSpacing="tight"
        >
          <Link
            href={phoneHref}
            color="inherit"
            _hover={{ color: "primary", textDecoration: "none" }}
          >
            {phone}
          </Link>
        </Heading>
        <Box
          as="button"
          type="button"
          aria-label="Copy phone number"
          onClick={() => handleCopy(phone)}
          position="relative"
          p={2}
          color="textMuted"
          _hover={{ color: "primary" }}
          transition="all 0.2s"
        >
          {copiedText === phone && (
            <Text
              role="status"
              aria-live="polite"
              position="absolute"
              top="-20px"
              left="50%"
              transform="translateX(-50%)"
              fontSize="xs"
              fontWeight="bold"
              color="primary"
            >
              Copied!
            </Text>
          )}
          <Icon as={FiCopy} boxSize={{ base: 4, md: 5 }} aria-hidden="true" />
        </Box>
      </Flex>
    </GrayFlexWrapper>
  );
}
