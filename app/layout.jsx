import { Inter } from "next/font/google";

import "./globals.css";
import AuthProvider from "../components/auth/AuthProvider";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "Apotek Kairo";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  applicationName: APP_NAME,
  title: "Apotek Kairo",
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <html lang="en">
          {/* <head>
            <title>Apotek Kairo</title>
            <meta name="description" content="@2024 Gajah Belor" />
          </head> */}

          <head>
            <link rel="manifest" href="/manifest.json" />
          </head>
          <body className={inter.className}>{children}</body>
        </html>
      </AuthProvider>
    </>
  );
}
