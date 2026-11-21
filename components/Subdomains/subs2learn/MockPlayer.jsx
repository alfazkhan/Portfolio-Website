"use client";

import React, { useEffect, useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { primaryGlow } from "./shared";

/*
 * Visual replicas of the real extension's SubtitleOverlay component.
 * Pixel values from the extension are scaled with container query units so the
 * overlay keeps its proportions inside a mock player of any width.
 */

const OVERLAY_REF_WIDTH = 900;
const OVERLAY_FONT = '"YouTube Noto", Roboto, Arial, sans-serif';
const OVERLAY_TEXT_SHADOW = "1px 1px 2px rgba(0,0,0,0.9)";

/** Converts a pixel value on a reference-sized player to container-relative units. */
const cq = (px) => `${((px / OVERLAY_REF_WIDTH) * 100).toFixed(3)}cqw`;

/** Dark 16:9 "video" frame. Children are positioned relative to it. */
export function MockPlayer({ label, ariaLabel, children }) {
  return (
    <Box
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      position="relative"
      w="full"
      borderRadius="2xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border"
      boxShadow="0 30px 60px -25px rgba(0,0,0,0.45)"
      bg="gray.900"
      style={{ aspectRatio: "16 / 9", containerType: "inline-size" }}
    >
      <Box
        position="absolute"
        inset={0}
        aria-hidden="true"
        style={{
          background: "linear-gradient(160deg, #2d3748 0%, #1a202c 55%, #0f141c 100%)",
        }}
      />
      <Box
        position="absolute"
        top="-30%"
        right="-20%"
        w="80%"
        h="120%"
        aria-hidden="true"
        style={{ background: primaryGlow(30) }}
      />
      <Box aria-hidden={ariaLabel ? "true" : undefined}>
        {label && (
          <HStack position="absolute" top={4} left={4} gap={2}>
            <Box w={2} h={2} borderRadius="full" bg="red.500" />
            <Text fontSize="xs" fontWeight="semibold" color="whiteAlpha.800">
              {label}
            </Text>
          </HStack>
        )}
        {children}
      </Box>
    </Box>
  );
}

/** The dual-subtitle box, styled exactly like the extension's overlay. */
export function SubtitleOverlayMock({
  original,
  translation,
  contentKey,
  sourceSize = 22,
  targetSize = 16,
  widthPct = 80,
  bottomPct = 8,
  placeholder,
}) {
  const body = placeholder ? (
    <div style={{ color: "#A0A0A0", fontSize: cq(15), fontStyle: "italic" }}>{placeholder}</div>
  ) : (
    <>
      <div
        data-subtitle-track="source"
        style={{
          color: "#F39C12",
          fontSize: cq(sourceSize),
          fontWeight: 600,
          lineHeight: 1.3,
          textShadow: OVERLAY_TEXT_SHADOW,
          marginBottom: cq(4),
        }}
      >
        {original}
      </div>
      <div
        data-subtitle-track="target"
        style={{
          color: "#F0F0F0",
          fontSize: cq(targetSize),
          fontWeight: 400,
          lineHeight: 1.3,
          textShadow: OVERLAY_TEXT_SHADOW,
        }}
      >
        {translation}
      </div>
    </>
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: `${bottomPct}%`,
        left: "50%",
        transform: "translateX(-50%)",
        width: `${widthPct}%`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "rgba(12, 12, 12, 0.85)",
        padding: `${cq(12)} ${cq(24)}`,
        borderRadius: cq(8),
        minHeight: cq(80),
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        fontFamily: OVERLAY_FONT,
        transition: "width 0.2s ease, bottom 0.2s ease",
      }}
    >
      {contentKey === undefined ? (
        body
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={contentKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {body}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/** The extension's one-time "Downloading AI Model" overlay, with a looping progress bar. */
export function DownloadOverlayMock({ title, note }) {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 3)));
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        backgroundColor: "rgba(18, 20, 28, 0.95)",
        padding: `${cq(16)} ${cq(20)}`,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        gap: cq(8),
        fontFamily: OVERLAY_FONT,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: cq(8) }}>
        <span style={{ color: "#F39C12", fontSize: cq(15), fontWeight: 600 }}>{title}</span>
        <span
          style={{
            color: "#FFFFFF",
            backgroundColor: "#fb923c",
            padding: `${cq(2)} ${cq(8)}`,
            borderRadius: "9999px",
            fontSize: cq(12),
            fontWeight: 600,
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: cq(8),
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#F39C12",
            borderRadius: "9999px",
            transition: progress === 0 ? "none" : "width 0.25s ease-out",
          }}
        />
      </div>
      <span style={{ fontSize: cq(12), color: "#A0A0A0" }}>{note}</span>
    </div>
  );
}
