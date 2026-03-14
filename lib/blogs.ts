export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "code"; language: string; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
    };

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  platform: "medium" | "devto" | "hashnode" | "personal";
  coverImage?: string;
  url?: string;
  content?: ContentBlock[];
};

import generateApnsKey from "@/content/blogs/generate-apns-key-ios-push-notifications";
import registerAndroidFirebase from "@/content/blogs/register-android-app-firebase-react-native";
import registerIosFirebase from "@/content/blogs/register-ios-app-firebase-react-native";
import firebaseCrashlytics from "@/content/blogs/enable-firebase-crashlytics-react-native";
import fcmNodejsSetup from "@/content/blogs/firebase-push-notifications-nodejs-setup";

export const blogs: BlogPost[] = [
  fcmNodejsSetup,
  firebaseCrashlytics,
  registerIosFirebase,
  registerAndroidFirebase,
  generateApnsKey,
];

export const BLOGS_PER_PAGE = 4;

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getBlogUrl(blog: BlogPost): string {
  if (blog.platform !== "personal" && blog.url) return blog.url;
  return `/blogs/${blog.slug}`;
}

export function isExternalBlog(blog: BlogPost): boolean {
  return blog.platform !== "personal" && !!blog.url;
}

export function getRelatedBlogs(current: BlogPost, limit = 2): BlogPost[] {
  return blogs
    .filter((b) => b.slug !== current.slug)
    .map((b) => ({
      blog: b,
      score: b.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.blog);
}
