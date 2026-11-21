"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { MotionConfig } from "motion/react";
import Subs2LearnHeader from "./subs2learn/Subs2LearnHeader";
import Subs2LearnFooter from "./subs2learn/Subs2LearnFooter";
import WelcomeHero from "./subs2learn/welcome/WelcomeHero";
import WelcomePin from "./subs2learn/welcome/WelcomePin";
import WelcomeHowToUse from "./subs2learn/welcome/WelcomeHowToUse";
import WelcomeSettings from "./subs2learn/welcome/WelcomeSettings";
import WelcomeHelp from "./subs2learn/welcome/WelcomeHelp";
import useDetectedBrowser from "./subs2learn/welcome/useDetectedBrowser";
import subs2learnData from "./subs2learn/data-2s2l";

// Polyfill IntersectionObserver in jsdom/test environments for motion features
if (typeof globalThis !== "undefined" && !globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

/**
 * Post-install onboarding page, opened by the extension after installation
 * (2subs2learn.<host>/welcome).
 */
export default function Subs2LearnWelcome({ project = {} }) {
  const [browser, setBrowser] = useDetectedBrowser();
  const repoLink = project.repoLink || subs2learnData.general.repoUrl;

  return (
    <MotionConfig reducedMotion="user">
      <Box minH="100vh" display="flex" flexDirection="column">
        <Subs2LearnHeader repoLink={repoLink} navItems={subs2learnData.welcome.navItems} />
        <Box as="main" id="main-content" flex={1}>
          <WelcomeHero />
          <WelcomePin browser={browser} onBrowserChange={setBrowser} />
          <WelcomeHowToUse />
          <WelcomeSettings />
          <WelcomeHelp browser={browser} />
        </Box>
        <Subs2LearnFooter project={project} />
      </Box>
    </MotionConfig>
  );
}
