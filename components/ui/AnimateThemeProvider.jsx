"use client";

import React from "react";
import { motion } from "framer-motion";
import { useColorMode } from "./color-mode";

export default function AnimateThemeProvider({ children }) {
  const { colorMode } = useColorMode();

  const isLight = colorMode === "light";
  
  const targetBg = isLight ? "#ffffff" : "#111217";
  const targetText = isLight ? "#111217" : "#ffffff";

  return (
    <motion.div
      // REMOVED the key prop completely to prevent structural DOM unmounting
      animate={{
        backgroundColor: targetBg,
        color: targetText,
      }}
      transition={{
        duration: 0.5,
        type: "tween",
        ease: "easeInOut",
      }}
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {children}
    </motion.div>
  );
}