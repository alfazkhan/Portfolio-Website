import { motion } from "framer-motion";
import { Flex } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

const MotionFlex = motion.create(Flex);

export default function GrayFlexWrapper({ children, ...props }) {
  const { colorMode } = useColorMode();

  const isLight = colorMode === "light";
  const targetBg = isLight ? "#FAFAFA" : "#27272A";
  const targetText = isLight ? "#111217" : "#ffffff";

  return (
    <MotionFlex
      animate={{
        backgroundColor: targetBg,
        color: targetText,
      }}
      transition={{
        duration: 0.5,
        type: "tween",
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </MotionFlex>
  );
}
