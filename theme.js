import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const PRIMARY_BASE = "#F58B51";
const PRIMARY_DARK = "#F26419";

const customConfig = defineConfig({
  globalCss: {
    "html , body": {
      bg: "bg",
      color: "text",
      // transitionProperty: "background-color, border-color, color, fill, stroke",
      // transitionDuration: "1000ms",
      // transitionTimingFunction: "ease-in",
    },
    // "*, *::before, *::after": {
    //   transitionProperty: "background-color, border-color, color, fill, stroke",
    //   transitionDuration: "1000ms",
    //   transitionTimingFunction: "ease-in",
    // },
    "::selection": {
      // Pulls dynamically from your semantic primary token
      bg: "primary",
      color: "{colors.gray.50}",
    },
  },
  theme: {
    semanticTokens: {
      colors: {
        bg: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.900}" } },
        bgAlt: {
          value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
        },
        text: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" } },
        buttonText: { value: "{colors.gray.50}" },
        textMuted: {
          value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
        },
        border: {
          value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
        },
        mutedBox: {
          value: { base: "{colors.gray.300}", _dark: "{colors.gray.600}" },
        },
        skillIcons: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" } },

        // Dynamic Primary Token
        primary: {
          DEFAULT: {
            value: {
              base: PRIMARY_BASE, // Light theme color
              _dark: PRIMARY_DARK, // Dark theme color
            },
          },
          solid: {
            value: {
              base: PRIMARY_BASE,
              _dark: PRIMARY_DARK,
            },
          },
          contrast: { value: "white" },
          fg: {
            value: {
              base: PRIMARY_BASE,
              _dark: PRIMARY_DARK,
            },
          },
          muted: { value: "{colors.orange.100}" },
          subtle: { value: "{colors.orange.50}" },
          focusRing: {
            value: {
              base: PRIMARY_BASE,
              _dark: PRIMARY_DARK,
            },
          },
        },
      },
    },
    recipes: {
      button: {
        variants: {
          variant: {
            solid: {
              bg: "colorPalette.solid",
              color: "colorPalette.contrast",
              _hover: {
                // Dynamically brightens/adjusts via theme modifier syntax
                bg: "colorPalette.muted",
              },
            },
          },
        },
        defaultVariants: {
          colorPalette: "primary",
          variant: "solid",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
