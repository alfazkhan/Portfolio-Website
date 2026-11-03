// components/OrbitingSkills.jsx
"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiFastapi,
  SiChakraui,
  SiPostgresql,
} from "react-icons/si";

const ORBIT_ITEMS = [
  { icon: SiReact, color: "#61DAFB", name: "React", speed: 20 },
  { icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js", speed: 35 },
  { icon: SiPython, color: "#FFD43B", name: "Python", speed: 18 },
  { icon: SiFastapi, color: "#05998B", name: "FastAPI", speed: 25 },
  { icon: SiChakraui, color: "#319795", name: "Chakra UI", speed: 40 },
  { icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL", speed: 15 },
];

export default function OrbitingSkills({ radius = 190, duration = 18 }) {
  const step = 360 / ORBIT_ITEMS.length;

  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Tilted Ring */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          repeat: Infinity,
          duration,
          ease: "linear",
        }}
        style={{
          position: "relative",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: "rotateX(68deg)", // Gives the 3D depth tilt
        }}
      >
        {ORBIT_ITEMS.map((item, index) => {
          // Calculate base angle with offset from top position (45 degrees counter-clockwise)
          const step = 360 / ORBIT_ITEMS.length;
          const initialAngle = index * step + 45;
          
          // Add additional rotation offset for visual variety (-15 to +15 degrees)
          const extraOffset = (index % 2 === 0 ? -15 : 15);
          
          return (
            <div
              key={item.name}
              style={{
                position: "absolute",
                transformStyle: "preserve-3d",
                transform: `rotateY(${initialAngle + extraOffset}deg) translateZ(${radius}px)`,
              }}
            >
              {/* Counter-rotation to keep icon facing the viewer */}
              <motion.div
                animate={{ rotateY: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: item.speed,
                  ease: "linear",
                }}
                style={{
                  transform: "rotateX(-68deg)", // Counteracts ring tilt
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(20, 20, 20, 0.75)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <item.icon color={item.color} size={22} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </Box>
  );
}