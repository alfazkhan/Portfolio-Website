"use client";

import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorMode } from "@/components/ui/color-mode";
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiFastapi } from "react-icons/si";
import websiteData from "@/data";

const ORBITS = [
  {
    angle: 0,
    duration: 20,
    items: [],
  },
  {
    angle: 45,
    duration: 25,
    items: [],
  },
  {
    angle: -45,
    duration: 30,
    items: [],
  },
];

export default function AtomicOrbit({
  radiusX = 220,
  radiusY = 95,
  layer = "front",
}) {
  const { colorMode } = useColorMode();
  const nextColor = colorMode === "light" ? "#61DAFB" : "#FFFFFF";

  // Get core skills from data.js and map them to orbit items
  const { core } = websiteData.getSkillsData(nextColor);

  // Select 3 different icons per orbit (9 total different icons) using round-robin
  const selectedOrbitIcons = ORBITS.map((_, idx) => 
    Array.from({ length: 3 }, (_, i) => (idx * 3) + i + 1)
  );

  const orbits = ORBITS.map((track, orbitIdx) => ({
    ...track,
    items: core.filter((skill) => selectedOrbitIcons[orbitIdx].includes(skill.id)).map((skill) => ({
      icon: skill.icon,
      color: skill.name === "Next.js" ? nextColor : skill.color,
      name: skill.name,
      offset: (skill.id - 1) * 60, // Distribute evenly around the orbit
    })),
  }));

  const strokeColor =
    colorMode === "light"
      ? "rgba(0, 0, 0, 0.22)"
      : "rgba(255, 255, 255, 0.25)";

  const maxBound = Math.ceil(Math.max(radiusX, radiusY) * 1.35);

  // SVG Elliptical Arc:
  // Front half: phi in [0, pi] (positive Y in screen coordinates, loops forward)
  // Back half:  phi in [pi, 2pi] (negative Y in screen coordinates, loops behind)
  const arcPath =
    layer === "front"
      ? `M ${radiusX} 0 A ${radiusX} ${radiusY} 0 0 1 -${radiusX} 0`
      : `M -${radiusX} 0 A ${radiusX} ${radiusY} 0 0 1 ${radiusX} 0`;

  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={layer === "back" ? 1 : 20}
    >
      {/* SVG Arc lines: Front half rendered on front layer, back half on back layer */}
      <svg
        style={{
          position: "absolute",
          width: `${maxBound * 2}px`,
          height: `${maxBound * 2}px`,
          overflow: "visible",
          pointerEvents: "none",
        }}
        viewBox={`-${maxBound} -${maxBound} ${maxBound * 2} ${maxBound * 2}`}
      >
        {orbits.map((track, idx) => (
          <path
            key={idx}
            d={arcPath}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray="6 6"
            transform={`rotate(${track.angle})`}
          />
        ))}
      </svg>

      {/* Orbiting particles */}
      {orbits.flatMap((track) =>
        track.items.map((item) => (
          <OrbitParticle
            key={`${layer}-${item.name}`}
            item={item}
            radiusX={radiusX}
            radiusY={radiusY}
            orbitAngle={track.angle}
            duration={track.duration}
            startOffset={item.offset}
            layer={layer}
            colorMode={colorMode}
          />
        ))
      )}
    </Box>
  );
}

function OrbitParticle({
  item,
  radiusX,
  radiusY,
  orbitAngle,
  duration,
  startOffset,
  layer,
  colorMode,
}) {
  const { xKeyframes, yKeyframes, scaleKeyframes, opacityKeyframes } = useMemo(() => {
    const steps = 72;
    const radTheta = (orbitAngle * Math.PI) / 180;
    const cosTheta = Math.cos(radTheta);
    const sinTheta = Math.sin(radTheta);

    const x = [];
    const y = [];
    const sc = [];
    const op = [];

    for (let i = 0; i <= steps; i++) {
      const phi = ((startOffset + (i / steps) * 360) * Math.PI) / 180;
      const u = radiusX * Math.cos(phi);
      const v = radiusY * Math.sin(phi);

      x.push(u * cosTheta - v * sinTheta);
      y.push(u * sinTheta + v * cosTheta);

      const depthNormal = (Math.sin(phi) + 1) / 2;
      const currentScale = 0.75 + depthNormal * 0.5;
      sc.push(Number(currentScale.toFixed(3)));

      const isFront = Math.sin(phi) > 0;
      if (layer === "front") {
        op.push(isFront ? 1 : 0);
      } else {
        op.push(isFront ? 0 : 1);
      }
    }

    return {
      xKeyframes: x,
      yKeyframes: y,
      scaleKeyframes: sc,
      opacityKeyframes: op,
    };
  }, [radiusX, radiusY, orbitAngle, startOffset, layer]);

  const boxSize = radiusX < 160 ? 36 : 44;
  const iconSize = radiusX < 160 ? 18 : 22;

  return (
    <motion.div
      animate={{
        x: xKeyframes,
        y: yKeyframes,
        scale: scaleKeyframes,
        opacity: opacityKeyframes,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        position: "absolute",
        width: boxSize,
        height: boxSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform, opacity",
      }}
    >
      <Box
        w="full"
        h="full"
        borderRadius="full"
        bg={colorMode === "light" ? "rgba(240, 240, 245, 0.95)" : "rgba(18, 18, 22, 0.95)"}
        border="1px solid"
        borderColor={colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.400"}
        boxShadow={
          colorMode === "light"
            ? "0 4px 14px rgba(0, 0, 0, 0.12)"
            : "0 6px 18px rgba(0, 0, 0, 0.7)"
        }
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <item.icon
          color={colorMode === "light" && item.color === "#FFFFFF" ? "#000000" : item.color}
          size={iconSize}
        />
      </Box>
    </motion.div>
  );
}