"use client";

import React from "react";
import { Button } from "@chakra-ui/react";
import { openCookieSettings } from "@/lib/analytics";

export default function ManageCookiePreferencesButton({
  children = "Manage Cookie Preferences",
  ...props
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      borderColor="border"
      color="text"
      _hover={{ bg: "mutedBox", borderColor: "primary" }}
      onClick={openCookieSettings}
      aria-label="Manage cookie and privacy preferences"
      {...props}
    >
      {children}
    </Button>
  );
}
