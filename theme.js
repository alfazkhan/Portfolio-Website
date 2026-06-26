import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const PRIMARY_HEX = "#F6AD55";
export const PRIMARY_HOVER_HEX = "#FFBE5E";

const customConfig = defineConfig({
  globalCss: {
    body: {
      bg: "bg",
      color: "text",
      transitionProperty: "background-color, border-color, color, fill, stroke",
      transitionDuration: "300ms",
      transitionTimingFunction: "linear",
    },
    "*, *::before, *::after": {
      transitionProperty: "background-color, border-color, color, fill, stroke",
      transitionDuration: "300ms",
      transitionTimingFunction: "linear",
    },
    "::selection": {
      bg: PRIMARY_HEX,
      color: "white",
    },
  },
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          value: { base: "white", _dark: "{colors.gray.900}" },
        },
        bgAlt: {
          value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
        },
        text: {
          value: { base: "{colors.gray.800}", _dark: "white" },
        },
        textMuted: {
          value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
        },
        border: {
          value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
        },
        primary: {
          DEFAULT: { value: PRIMARY_HEX },
          solid: { value: PRIMARY_HEX },
          contrast: { value: "white" },
          fg: { value: PRIMARY_HEX },
          muted: { value: "{colors.orange.100}" },
          subtle: { value: "{colors.orange.50}" },
          focusRing: { value: PRIMARY_HEX },
        },
        secondary: {
          DEFAULT: { value: "{colors.orange.200}" },
          solid: { value: "{colors.orange.200}" },
          contrast: { value: "{colors.gray.900}" },
          fg: { value: "{colors.orange.200}" },
          muted: { value: "{colors.orange.100}" },
          subtle: { value: "{colors.orange.50}" },
          focusRing: { value: "{colors.orange.200}" },
        },
      },
    },
    recipes: {
      button: {
        compoundVariants: [
          { variant: "solid", colorPalette: "primary", css: { _hover: { bg: PRIMARY_HOVER_HEX }, _expanded: { bg: PRIMARY_HOVER_HEX } } },
        ],
        defaultVariants: {
          colorPalette: "primary",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
