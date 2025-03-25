"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  // InstagramIcon,
  ArrowUpIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t bg-background py-6 sm:py-8">
      <div className="container flex flex-col items-center justify-between gap-3 sm:gap-4 px-4 md:flex-row md:px-6">
        <p className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Mahabeer. All rights reserved.
        </p>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Link
              href="https://github.com/mahabeer-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Link
              href="https://x.com/mahabeer_dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <Link
              href="https://www.linkedin.com/in/mahabeer-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </div>
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-md bg-background/80 backdrop-blur-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Back to top</span>
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}
