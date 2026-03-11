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

export const blogs: BlogPost[] = [registerAndroidFirebase, generateApnsKey];

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
