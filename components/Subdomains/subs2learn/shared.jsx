"use client";

import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { motion } from "motion/react";
import BrandName from "./BrandName";
import subs2learnData from "./data-2s2l";

/** Replaces every occurrence of the brand name in a string with the styled <BrandName />. */
export function withBrand(text) {
  if (typeof text !== "string") return text;
  const brand = subs2learnData.general.brandName;
  if (!text.includes(brand)) return text;
  return text.split(brand).flatMap((part, i) =>
    i === 0
      ? [part]
      : [<BrandName key={i} fontSize="1.08em" fontWeight="inherit" letterSpacing="normal" textTransform="none" />, part],
  );
}

// Card surface that stands out from the page background in both color modes.
export const CARD_BG = { base: "white", _dark: "gray.800" };

// Soft orange glow built from the theme's primary token.
// `closest-side` makes the gradient reach transparent before the box edge, so it is never clipped.
export const primaryGlow = (strength = 22) =>
  `radial-gradient(ellipse closest-side at center, color-mix(in srgb, var(--chakra-colors-primary) ${strength}%, transparent) 0%, transparent 100%)`;

// Interactive card styles shared by feature, platform and engineering cards.
export const cardHoverProps = {
  borderWidth: "1px",
  borderColor: "border",
  borderRadius: "2xl",
  bg: CARD_BG,
  boxShadow: "sm",
  h: "full",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  _hover: {
    borderColor: "primary",
    boxShadow: "0 18px 40px -20px color-mix(in srgb, var(--chakra-colors-primary) 55%, transparent)",
  },
};

/** Fades and lifts its children into view once, the first time they scroll on screen. */
export function Reveal({ as = "div", children, delay = 0, y = 20, style, ...props }) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ height: "100%", ...style }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Small uppercase label shown above section headings. */
export function Eyebrow({ children }) {
  if (!children) return null;
  return (
    <Text
      as="span"
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="primary"
    >
      {withBrand(children)}
    </Text>
  );
}

/** Centered eyebrow + title + subtitle block used at the top of every section. */
export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal style={{ height: "auto" }}>
      <Stack gap={3} align="center" textAlign="center" maxW="2xl" mx="auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="1.15"
          color="text"
        >
          {withBrand(title)}
        </Heading>
        {subtitle && (
          <Text color="textMuted" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
            {withBrand(subtitle)}
          </Text>
        )}
        <Box w={12} h="3px" borderRadius="full" bg="primary" mt={1} aria-hidden="true" />
      </Stack>
    </Reveal>
  );
}
