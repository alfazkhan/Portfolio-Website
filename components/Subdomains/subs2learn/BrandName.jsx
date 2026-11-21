"use client";

import React from "react";
import { Text } from "@chakra-ui/react";
import subs2learnData from "./data-2s2l";

export default function BrandName({ fontSize = "xl", color = "primary", ...props }) {
  return (
    <Text
      as="span"
      fontWeight="extrabold"
      fontSize={fontSize}
      color={color}
      letterSpacing="tight"
      style={{
        fontFamily: subs2learnData.general.fontFamily,
      }}
      {...props}
    >
      {subs2learnData.general.brandName}
    </Text>
  );
}
