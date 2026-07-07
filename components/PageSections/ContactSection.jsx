"use client"

import React, { useState } from "react";
import { Box, Flex, Heading, Text, Icon, HStack } from "@chakra-ui/react";
import { FiMail, FiPhone, FiCopy, FiGithub, FiTwitter, FiFigma } from "react-icons/fi";
import GrayFlexWrapper from "../GrayFlexWrapper";

const socialLinks = [
  { url: "https://github.com", icon: FiGithub },
  { url: "https://twitter.com", icon: FiTwitter },
  { url: "https://figma.com", icon: FiFigma }
];

export default function ContactSection() {
  const [copiedText, setCopiedText] = useState("");
  const email = "khanalfaaz14@gmail.com";
  const phone = "+49 15510 311484";
  

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
      const successful = document.execCommand('copy');
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
      <Text 
        color="textMuted" 
        fontSize={{ base: "md", md: "xl" }} 
        textAlign="center" 
        maxW="2xl" 
        lineHeight="relaxed" 
        mb={16}
      >
        What's next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect.
      </Text>

      {/* Email Row */}
      <Flex align="center" gap={{ base: 3, md: 5 }} mb={4} role="group">
        <Icon 
          as={FiMail} 
          boxSize={{ base: 5, md: 7 }} 
          color="textMuted"
          flexShrink={0} 
        />
        <Heading 
          as="h3" 
          fontSize={{ base: "xl", md: "3xl" }} 
          fontWeight="extrabold" 
          color="text" 
          letterSpacing="tight"
        >
          {email}
        </Heading>
        <Box 
          as="button" 
          onClick={() => handleCopy(email)} 
          position="relative" 
          p={2} 
          color="textMuted"
          _hover={{ color: "primary" }} 
          transition="all 0.2s" 
        >
          {copiedText === email && (
            <Text 
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
          <Icon as={FiCopy} boxSize={{ base: 4, md: 5 }} />
        </Box>
      </Flex>

      {/* Phone Row */}
      <Flex align="center" gap={{ base: 3, md: 5 }} role="group">
        <Icon 
          as={FiPhone} 
          boxSize={{ base: 5, md: 7 }} 
          color="textMuted"
          flexShrink={0} 
        />
        <Heading 
          as="h3" 
          fontSize={{ base: "xl", md: "3xl" }} 
          fontWeight="extrabold" 
          color="text" 
          letterSpacing="tight"
        >
          {phone}
        </Heading>
        <Box 
          as="button" 
          onClick={() => handleCopy(phone)} 
          position="relative" 
          p={2} 
          color="textMuted"
          _hover={{ color: "primary" }} 
          transition="all 0.2s" 
        >
          {copiedText === phone && (
            <Text 
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
          <Icon as={FiCopy} boxSize={{ base: 4, md: 5 }} />
        </Box>
      </Flex>

      {/* Social Footer */}
      <Flex mt={24} direction="column" align="center">
        <Text color="textMuted" fontSize={{ base: "sm", md: "base" }} mb={6}>
          You may also find me on these platforms!
        </Text>
        <HStack spacing={8}>
          {socialLinks.map((item, idx) => (
            <Box 
              as="a" 
              key={idx} 
              href={item.url} 
              target="_blank" 
              rel="noreferrer" 
              color="textMuted"
              _hover={{ color: "text" }} 
              transition="all 0.2s"
            >
              <Icon as={item.icon} boxSize={5} />
            </Box>
          ))}
        </HStack>
      </Flex>
    </GrayFlexWrapper>
  );
}