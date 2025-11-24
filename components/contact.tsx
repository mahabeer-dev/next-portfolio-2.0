"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SendIcon,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  Circle,
  // InstagramIcon,
} from "lucide-react";
import { FadeIn } from "./animations";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function Contact() {
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = useCallback(() => {
    setEmail("");
    setName("");
    setSubject("");
    setMessage("");
  }, []);

  const onAddQuery = useCallback(async () => {
    try {
      setIsloading(true);
      const resp = await fetch("/api/contact", {
        method: "post",
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (resp.status === 200) {
        alert("Your query has been submitted successfully");
        resetForm();
      }
    } catch (error) {}
    setIsloading(false);
  }, [name, email, subject, message, resetForm]);

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <FadeIn direction="up">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                Get In Touch
              </h2>
              <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg lg:text-base xl:text-lg">
                Have a project in mind or want to chat? Feel free to reach out.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="mx-auto mt-8 sm:mt-12 grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-2">
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="rounded-full bg-primary/10 p-2 sm:p-3 text-primary">
                  <MailIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium">Email</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    mahabeer.fcs.gna@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="rounded-full bg-primary/10 p-2 sm:p-3 text-primary">
                  <PhoneIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium">Phone</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    +91 99156 68595
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="rounded-full bg-primary/10 p-2 sm:p-3 text-primary">
                  <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium">Location</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Mohali, Pb
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 rounded-lg bg-muted p-4 sm:p-6">
                <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium">
                  Let's Connect
                </h3>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                  I'm currently available for freelance work and full-time
                  positions. If you have a project that needs some creative
                  direction, I'd love to hear about it.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Link
                      href="https://github.com/mahabeer-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Link
                      href="https://x.com/mahabeer_dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Link
                      href="https://www.linkedin.com/in/mahabeer-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.4}>
            <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
              <form onSubmit={onAddQuery} className="space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="john"
                      className="text-xs sm:text-sm h-8 sm:h-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      placeholder="john@example.com"
                      className="text-xs sm:text-sm h-8 sm:h-10"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    placeholder="Project Inquiry"
                    className="text-xs sm:text-sm h-8 sm:h-10"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <Textarea
                    value={message}
                    id="message"
                    placeholder="Tell me about your project..."
                    className="min-h-[100px] sm:min-h-[150px] text-xs sm:text-sm"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full text-xs sm:text-sm h-8 sm:h-10 cursor-pointer disabled:cursor-not-allowed"
                  disabled={
                    isLoading || !name || !email || !subject || !message
                  }
                >
                  {!isLoading && (
                    <>
                      <SendIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      Send Message
                    </>
                  )}
                  {isLoading && (
                    <>
                      <Circle className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      Please wait...
                    </>
                  )}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
