"use client";

import { useEffect, useState } from "react";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";

// Components
import NavigationBar from "@/components/PageSections/NavigationBar";
import LeftSidebar from "@/components/PageSections/LeftSidebar";
import Intro from "@/components/PageSections/Intro";
import WorkSection from "@/components/PageSections/WorkSection";
import EducationSection from "@/components/PageSections/EducationSection";
import SkillsSection from "@/components/PageSections/SkillsSection";
import ContactSection from "@/components/PageSections/ContactSection";
import { AnimatePresence, easeIn, motion, stagger } from "motion/react";

export default function Page() {

  return (
    <Box minH="100vh" overflowX="hidden">
      <NavigationBar />
      <LeftSidebar />
      <motion.div
        key={"page"}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ type: "tween", duration: 0.3, ease: easeIn }}
      >
        <Box
          as="main"
          pt={{ base: 24, lg: 12 }}
          ml={{ base: 0, lg: "300px" }}
          mr={{ base: 0, lg: "80px" }}
        >
          <Intro />
          <WorkSection />
          <EducationSection />
          <SkillsSection />
          <ContactSection />
        </Box>
      </motion.div>
    </Box>
  );
}
