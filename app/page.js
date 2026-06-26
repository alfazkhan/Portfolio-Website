import React from "react";
import { Box } from "@chakra-ui/react";

// Components
import NavigationBar from "@/components/NavigationBar";
import LeftSidebar from "@/components/LeftSidebar";
import Intro from "@/components/Intro";
import WorkSection from "@/components/WorkSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <Box minH="100vh" overflowX="hidden" bg="bg">
      <NavigationBar />
      <LeftSidebar />
      <Box
        as="main"
        pt={{ base: 24, lg: 12 }} // Changed md to lg
        ml={{ base: 0, lg: "300px" }} // Changed md to lg
        mr={{ base: 0, lg: "80px" }} // Changed md to lg
      >
        <Intro />
        <WorkSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </Box>
    </Box>
  );
}
