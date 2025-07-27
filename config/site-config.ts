import { Metadata } from "next";

const TITLE = "Horizon - Streamline your workflow, amplify your impact.";
const DESCRIPTION =
  "Introducing the system for modern software development. Organize issues, projects, and product roadmaps.";

const PREVIEW_IMAGE_URL = "https://Horizon.vercel.app/opengraph-image.png";
const ALT_TITLE = "Horizon - Streamline your workflow, amplify your impact.";
const BASE_URL = "https://Horizon.vercel.app";

export const siteConfig: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Horizon",
  creator: "KartikeyStack",
  twitter: {
    creator: "@KartikeyStack",
    title: TITLE,
    description: DESCRIPTION,
    card: "summary_large_image",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ALT_TITLE,
      },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Horizon",
    url: BASE_URL,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: PREVIEW_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: ALT_TITLE,
      },
    ],
  },
  category: "Technology",
  alternates: {
    canonical: BASE_URL,
  },
  keywords: [
    "project management",
    "software development",
    "task tracking",
    "issue tracking",
    "agile workflows",
    "roadmap planning",
    "team collaboration",
    "developer tools",
    "modern workflows",
    "productivity tools",
    "sprint planning",
    "scrum management",
    "project dashboards",
    "workflow automation",
    "team communication",
    "kanban boards",
    "software lifecycle management",
    "bug tracking software",
    "resource allocation",
    "timeline management",
  ],
  metadataBase: new URL(BASE_URL),
};
