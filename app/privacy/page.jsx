import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { Box, Container, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ManageCookiePreferencesButton from "@/components/ManageCookiePreferencesButton";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy | Alfaz Khan",
  description:
    "Privacy Policy and data protection declaration for the personal developer portfolio of Alfaz Khan (theonlyalfaz.com), complying with GDPR and German TDDDG.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Alfaz Khan",
    description:
      "Privacy Policy and data protection declaration for the personal developer portfolio of Alfaz Khan (theonlyalfaz.com).",
    url: "https://www.theonlyalfaz.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), "PRIVACY.md");
  const markdown = fs.readFileSync(filePath, "utf-8");
  const htmlContent = marked.parse(markdown);

  return (
    <Box minH="100vh" bg="bg" color="text" display="flex" flexDirection="column">
      {/* Top Navigation Bar */}
      <Box
        as="header"
        borderBottomWidth="1px"
        borderColor="border"
        bg="bgAlt"
        py={4}
        px={{ base: 4, md: 8 }}
        position="sticky"
        top={0}
        zIndex={40}
        backdropFilter="blur(8px)"
      >
        <Flex
          maxW="5xl"
          mx="auto"
          align="center"
          justify="space-between"
          gap={4}
          wrap="wrap"
        >
          <Link
            asChild
            color="text"
            fontSize="sm"
            fontWeight="semibold"
            display="inline-flex"
            alignItems="center"
            gap={2}
            _hover={{ color: "primary", textDecoration: "none" }}
          >
            <NextLink href="/">
              <FiArrowLeft aria-hidden="true" />
              <span>Back to Portfolio</span>
            </NextLink>
          </Link>

          <ManageCookiePreferencesButton size="sm" />
        </Flex>
      </Box>

      {/* Main Content Area */}
      <Box as="main" flex={1} py={{ base: 8, md: 14 }} px={{ base: 4, md: 8 }}>
        <Container maxW="5xl">
          <Box
            bg="bgAlt"
            p={{ base: 6, sm: 8, md: 12 }}
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border"
            boxShadow="sm"
          >
            <Box
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              css={{
                "& h1": {
                  fontSize: { base: "1.875rem", md: "2.5rem" },
                  fontWeight: "800",
                  letterSpacing: "-0.025em",
                  marginBottom: "1rem",
                  color: "var(--chakra-colors-text)",
                },
                "& h2": {
                  fontSize: { base: "1.375rem", md: "1.625rem" },
                  fontWeight: "700",
                  marginTop: "2.5rem",
                  marginBottom: "0.75rem",
                  borderBottom: "1px solid var(--chakra-colors-border)",
                  paddingBottom: "0.5rem",
                  color: "var(--chakra-colors-text)",
                },
                "& h3": {
                  fontSize: { base: "1.1rem", md: "1.25rem" },
                  fontWeight: "600",
                  marginTop: "1.5rem",
                  marginBottom: "0.5rem",
                  color: "var(--chakra-colors-text)",
                },
                "& p": {
                  fontSize: "1rem",
                  lineHeight: "1.85",
                  marginBottom: "1.2rem",
                  color: "var(--chakra-colors-text)",
                },
                "& ul, & ol": {
                  marginLeft: "1.75rem",
                  marginBottom: "1.25rem",
                  color: "var(--chakra-colors-text)",
                },
                "& li": {
                  marginBottom: "0.5rem",
                  lineHeight: "1.75",
                },
                "& a": {
                  color: "var(--chakra-colors-primary)",
                  textDecoration: "underline",
                  fontWeight: "500",
                  "&:hover": {
                    opacity: "0.8",
                  },
                },
                "& hr": {
                  borderColor: "var(--chakra-colors-border)",
                  margin: "2rem 0",
                },
                "& strong": {
                  fontWeight: "700",
                  color: "var(--chakra-colors-text)",
                },
                "& code": {
                  backgroundColor: "var(--chakra-colors-muted-box, rgba(120, 120, 120, 0.15))",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.875em",
                },
              }}
            />

            {/* Bottom Actions */}
            <Box
              mt={12}
              pt={8}
              borderTopWidth="1px"
              borderColor="border"
            >
              <Flex
                direction={{ base: "column", sm: "row" }}
                align={{ base: "flex-start", sm: "center" }}
                justify="space-between"
                gap={4}
              >
                <ManageCookiePreferencesButton />
                <Link
                  asChild
                  fontSize="sm"
                  color="textMuted"
                  _hover={{ color: "primary", textDecoration: "underline" }}
                >
                  <NextLink href="/">Back to Homepage</NextLink>
                </Link>
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Global Footer */}
      <Footer />
    </Box>
  );
}
