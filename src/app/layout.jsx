import { Inter } from "next/font/google";
import { Providers } from "./lib/redux/provider";
import { Header } from "./lectures/layout/Header";
import { Footer } from "./lectures/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Student Progress Tracker",
  description:
    "Track student submissions, attendance, and generate progress reports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
