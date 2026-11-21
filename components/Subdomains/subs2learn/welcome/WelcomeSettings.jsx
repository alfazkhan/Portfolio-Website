"use client";

import React, { useState } from "react";
import { Box, Container, Flex, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Reveal, SectionHeading, CARD_BG } from "../shared";
import { MockPlayer, SubtitleOverlayMock } from "../MockPlayer";
import subs2learnData from "../data-2s2l";

// Colors taken from the real extension popup.
const POPUP_BG = "#12141c";
const POPUP_ACCENT = "#f5a864";
const POPUP_ACCENT_HOVER = "#EE964B";

function CounterButton({ label, children, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 28,
        height: 28,
        borderRadius: "9999px",
        background: POPUP_ACCENT,
        color: "#000",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background 0.15s",
        border: "none",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = POPUP_ACCENT_HOVER;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = POPUP_ACCENT;
      }}
    >
      {children}
    </button>
  );
}

function SelectMock({ value }) {
  return (
    <Box
      w="180px"
      px={3}
      py={2}
      borderRadius="lg"
      fontSize="sm"
      color="white"
      style={{ background: "#17171f", border: `1px solid ${POPUP_ACCENT}` }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {value}
      <span aria-hidden="true" style={{ fontSize: 10, opacity: 0.7 }}>
        ▼
      </span>
    </Box>
  );
}

/** Interactive replica of the extension's popup. */
function PopupMock({ popup, controls, values, onChange, paused, onTogglePaused }) {
  return (
    <Box
      w="full"
      maxW="380px"
      mx="auto"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="0 30px 60px -20px rgba(0,0,0,0.5)"
      borderWidth="1px"
      borderColor="border"
      color="white"
      style={{ background: POPUP_BG }}
    >
      <HStack justify="space-between" px={5} py={4} borderBottomWidth="1px" borderColor="whiteAlpha.200">
        <HStack gap="2px" fontSize="xl" fontWeight="bold" letterSpacing="tight">
          <span>2Subs</span>
          <span style={{ color: POPUP_ACCENT }}>2Learn</span>
        </HStack>
        <HStack gap={2}>
          <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="gray.400">
            {paused ? popup.pausedLabel : popup.enabledLabel}
          </Text>
          <button
            type="button"
            role="switch"
            aria-checked={!paused}
            aria-label={popup.toggleAriaLabel}
            onClick={onTogglePaused}
            style={{
              position: "relative",
              width: 44,
              height: 24,
              borderRadius: 9999,
              border: `1px solid ${paused ? "#4b5563" : "#f97316"}`,
              background: paused ? "#6b7280" : "#fb923c",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 2,
                left: paused ? 2 : 22,
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: paused ? "#e5e7eb" : "#9a3412",
                transition: "left 0.2s",
              }}
            />
          </button>
        </HStack>
      </HStack>

      <Stack gap={4} px={5} py={5}>
        <Heading as="h3" fontSize="lg" fontWeight="semibold" color="gray.200">
          {popup.heading}
        </Heading>

        <Flex justify="space-between" align="center" gap={3}>
          <Text fontSize="sm" fontWeight="medium" color="gray.200">
            {popup.translateFromLabel}
          </Text>
          <SelectMock value={popup.translateFromValue} />
        </Flex>
        <Flex justify="space-between" align="center" gap={3}>
          <Text fontSize="sm" fontWeight="medium" color="gray.200">
            {popup.translateToLabel}
          </Text>
          <SelectMock value={popup.translateToValue} />
        </Flex>

        {controls.map((control) => {
          const value = values[control.key];
          return (
            <Flex key={control.key} justify="space-between" align="center" gap={3}>
              <Text fontSize="sm" fontWeight="medium" color="gray.200">
                {control.label}
              </Text>
              <HStack gap={1}>
                <CounterButton
                  label={`${popup.decreaseLabel} ${control.label}`}
                  onClick={() => onChange(control, -1)}
                  disabled={value <= control.min}
                >
                  -
                </CounterButton>
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="semibold"
                  w={12}
                  textAlign="center"
                  aria-live="polite"
                >
                  {value}
                  {control.unit}
                </Text>
                <CounterButton
                  label={`${popup.increaseLabel} ${control.label}`}
                  onClick={() => onChange(control, 1)}
                  disabled={value >= control.max}
                >
                  +
                </CounterButton>
              </HStack>
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
}

export default function WelcomeSettings() {
  const settings = subs2learnData.welcome.settings;
  const [values, setValues] = useState(() =>
    Object.fromEntries(settings.controls.map((c) => [c.key, c.initial])),
  );
  const [paused, setPaused] = useState(false);

  const handleChange = (control, delta) => {
    setValues((prev) => ({
      ...prev,
      [control.key]: Math.min(Math.max(prev[control.key] + delta, control.min), control.max),
    }));
  };

  return (
    <Box as="section" id="settings" py={{ base: 14, md: 24 }} borderBottomWidth="1px" borderColor="border" bg="bgAlt">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Stack gap={{ base: 10, md: 14 }}>
          <SectionHeading eyebrow={settings.eyebrow} title={settings.title} subtitle={settings.subtitle} />

          <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: 10, lg: 12 }} alignItems="center">
            <Box gridColumn={{ lg: "span 5" }}>
              <Reveal style={{ height: "auto" }}>
                <PopupMock
                  popup={settings.popup}
                  controls={settings.controls}
                  values={values}
                  onChange={handleChange}
                  paused={paused}
                  onTogglePaused={() => setPaused((p) => !p)}
                />
              </Reveal>
            </Box>

            <Stack gap={6} gridColumn={{ lg: "span 7" }}>
              <Reveal delay={0.1} style={{ height: "auto" }}>
                <MockPlayer label={settings.previewLabel}>
                  {paused ? (
                    <Flex position="absolute" inset={0} align="center" justify="center">
                      <Text fontSize="sm" color="whiteAlpha.700" fontStyle="italic">
                        {settings.pausedPreviewText}
                      </Text>
                    </Flex>
                  ) : (
                    <SubtitleOverlayMock
                      original={settings.previewPair.original}
                      translation={settings.previewPair.translation}
                      sourceSize={values.sourceFontSize}
                      targetSize={values.targetFontSize}
                      widthPct={values.windowWidth}
                      bottomPct={values.verticalPosition}
                    />
                  )}
                </MockPlayer>
              </Reveal>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
                {settings.tips.map((tip, idx) => (
                  <Reveal key={tip.title} delay={0.15 + idx * 0.08}>
                    <Stack
                      gap={1.5}
                      p={4}
                      h="full"
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor="border"
                      bg={CARD_BG}
                    >
                      <Text fontSize="sm" fontWeight="bold" color="text">
                        {tip.title}
                      </Text>
                      <Text fontSize="xs" color="textMuted" lineHeight="relaxed">
                        {tip.description}
                      </Text>
                    </Stack>
                  </Reveal>
                ))}
              </SimpleGrid>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
