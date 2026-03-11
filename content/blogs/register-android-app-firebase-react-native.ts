import type { BlogPost } from "@/lib/blogs";

const post: BlogPost = {
  id: 3,
  slug: "register-android-app-firebase-react-native",
  title:
    "How to Register an Android App with Firebase in React Native (2026 Guide)",
  excerpt:
    "A complete step-by-step guide to adding Firebase to your React Native Android app — from creating the app in the Firebase Console to configuring Gradle files and verifying the setup.",
  date: "2026-03-11",
  readTime: "7 min read",
  tags: [
    "React Native",
    "Firebase",
    "Android",
    "Mobile Development",
    "Push Notifications",
  ],
  platform: "personal",
  coverImage: "/blogs/register-android-app-firebase-react-native/cover.webp",
  content: [
    {
      type: "paragraph",
      text: "Firebase is the go-to backend-as-a-service for mobile developers, offering everything from authentication and real-time databases to push notifications and analytics. If you're building a React Native app and want to use any Firebase service on Android, the first step is registering your Android app with your Firebase project. This guide walks you through every step with screenshots — from the Firebase Console to your Gradle configuration.",
    },
    {
      type: "paragraph",
      text: "This guide follows the React Native ecosystem specifically. While the Firebase Console steps are the same for any Android app, the file paths and Gradle configuration are tailored for a standard React Native project structure.",
    },
    {
      type: "heading",
      text: "Prerequisites",
    },
    {
      type: "paragraph",
      text: "Before you begin, make sure you have a Firebase project already created. If you don't have one yet, head over to the Firebase Console and create a new project — it takes about 60 seconds. You'll also need a React Native project set up and running on Android (either on an emulator or a physical device).",
    },

    {
      type: "heading",
      text: "Step 1 — Open Your Firebase Project",
    },
    {
      type: "paragraph",
      text: "Navigate to the [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account. From the dashboard, select the project you want to add your Android app to. If you have multiple projects, make sure you're selecting the correct one.",
    },
    {
      type: "image",
      src: "/blogs/register-android-app-firebase-react-native/1.webp",
      alt: "Firebase Console dashboard showing list of projects",
      caption: "Firebase Console — select your project from the dashboard",
    },

    {
      type: "heading",
      text: "Step 2 — Add an Android App to Your Project",
    },
    {
      type: "paragraph",
      text: 'Once inside your project, open the ==Project Overview== tab from the left sidebar. Click the =="Add app"== button (or the Android icon if this is your first app). This will launch the setup wizard for registering a new Android app with Firebase.',
    },
    {
      type: "image",
      src: "/blogs/register-android-app-firebase-react-native/2.webp",
      alt: "Firebase Project Overview page with the Add App button and platform selection showing Android icon",
      caption: 'Click "Add app" and choose the Android platform',
    },

    {
      type: "heading",
      text: "Step 3 — Enter Your Android Package Name",
    },
    {
      type: "paragraph",
      text: "The first screen of the wizard asks for your Android package name. This is the unique identifier for your app. In a React Native project, you can find it in the MainApplication.kt or MainActvity.kt file located at:",
    },
    {
      type: "code",
      language: "text",
      text: "android/app/src/main/java/com/yourapp/MainApplication.kt",
    },
    {
      type: "paragraph",
      text: "Look for the package declaration at the very top of the file — it will look something like:",
    },
    {
      type: "code",
      language: "kotlin",
      text: "package com.yourapp",
    },
    {
      type: "paragraph",
      text: "Enter this package name (e.g., com.yourapp) in the Firebase Console. You can also provide an optional App Nickname — this is especially helpful if you're registering multiple Android apps (like staging and production) under the same Firebase project. The nickname is only visible in the Firebase Console and won't affect your app.",
    },
    {
      type: "image",
      src: "/blogs/register-android-app-firebase-react-native/3.webp",
      alt: "Firebase Add Android App form showing package name field and optional nickname field",
      caption: "Enter your Android package name from MainApplication.kt",
    },
    {
      type: "paragraph",
      text: 'Click =="Register app"== to proceed to the next step.',
    },

    {
      type: "heading",
      text: "Step 4 — Download google-services.json",
    },
    {
      type: "paragraph",
      text: 'After registering, Firebase will generate a ==google-services.json== configuration file for your app. Click the =="Download google-services.json"== button and place the downloaded file in the following location in your React Native project:',
    },
    {
      type: "code",
      language: "text",
      text: "your-project/\n└── android/\n    └── app/\n        └── google-services.json   ← place it here",
    },
    {
      type: "paragraph",
      text: "This file contains your Firebase project's configuration — API keys, project ID, app ID, and other identifiers. It's essential for the Firebase SDK to know which Firebase project your app belongs to. ==Do NOT commit this file to a public repository== as it contains your API keys.",
    },
    {
      type: "image",
      src: "/blogs/register-android-app-firebase-react-native/4.webp",
      alt: "Firebase Console showing the download button for google-services.json file",
      caption: "Download google-services.json and place it in android/app/",
    },

    {
      type: "heading",
      text: "Step 5 — Add the Google Services Plugin to Project-Level Gradle",
    },
    {
      type: "paragraph",
      text: "Now you need to configure your Android build system to use the Google Services plugin. Open the project-level build.gradle (or build.gradle.kts) file located at:",
    },
    {
      type: "code",
      language: "text",
      text: "your-project/\n└── android/\n    └── build.gradle   ← this file",
    },
    {
      type: "paragraph",
      text: "Inside the dependencies block under buildscript, add the Google Services classpath:",
    },
    {
      type: "code",
      language: "groovy",
      text: `buildscript {
    dependencies {
        // ... existing dependencies
        classpath("com.google.gms:google-services:4.4.2")
    }
}`,
    },
    {
      type: "image",
      src: "/blogs/register-android-app-firebase-react-native/5.webp",
      alt: "Project-level build.gradle file open in an editor showing the dependencies block with google-services classpath added",
      caption:
        "Add the Google Services classpath to your project-level build.gradle",
    },

    {
      type: "heading",
      text: "Step 6 — Apply the Plugin in App-Level Gradle",
    },
    {
      type: "paragraph",
      text: "Next, open the app-level build.gradle file at:",
    },
    {
      type: "code",
      language: "text",
      text: "your-project/\n└── android/\n    └── app/\n        └── build.gradle   ← this file",
    },
    {
      type: "paragraph",
      text: "At the very top of this file, add the following line to apply the Google Services plugin:",
    },
    {
      type: "code",
      language: "groovy",
      text: 'apply plugin: "com.google.gms.google-services"',
    },
    {
      type: "paragraph",
      text: "Then, in the same file, locate the dependencies block and add the Firebase BoM (Bill of Materials). The BoM ensures all Firebase libraries in your project use compatible versions — you only need to specify the BoM version, and it handles the rest:",
    },
    {
      type: "code",
      language: "groovy",
      text: `dependencies {
    // ... existing dependencies

    // Firebase BoM — manages versions for all Firebase libraries
    implementation platform('com.google.firebase:firebase-bom:34.7.0')
}`,
    },

    {
      type: "paragraph",
      text: "The BoM version 34.7.0 is the latest at the time of writing. Always check the Firebase Android Release Notes for the latest BoM version before adding it to your project.",
    },

    {
      type: "heading",
      text: "Step 7 — Complete the Firebase Setup Wizard",
    },
    {
      type: "paragraph",
      text: 'Back in the Firebase Console, click "Next" through any remaining steps and finally click "Continue to console" to complete the setup wizard. Firebase may show a verification step — don\'t worry if it says "Checking if the app has communicated with our servers". This will resolve automatically once you run the app.',
    },

    {
      type: "heading",
      text: "Step 8 — Rebuild and Verify",
    },
    {
      type: "paragraph",
      text: "Now it's time to verify everything works. Clean and rebuild your React Native Android app:",
    },
    {
      type: "code",
      language: "bash",
      text: "cd android && ./gradlew clean && cd ..\nnpx react-native run-android",
    },
    {
      type: "paragraph",
      text: "If the app compiles and launches without any build errors, congratulations — Firebase is successfully integrated with your Android app. You're now ready to use any Firebase service like Authentication, Cloud Firestore, Cloud Messaging (push notifications), Analytics, Crashlytics, and more.",
    },
    {
      type: "paragraph",
      text: "If you encounter build errors, the most common issues are: incorrect package name in Firebase Console, google-services.json placed in the wrong directory, or mismatched Gradle plugin versions. Double-check each step above to resolve them.",
    },

    {
      type: "heading",
      text: "Complete File Reference",
    },
    {
      type: "paragraph",
      text: "Here's a quick summary of all the files you modified and where they live in a standard React Native project:",
    },
    {
      type: "code",
      language: "text",
      text: `your-react-native-project/
├── android/
│   ├── build.gradle                    ← Added google-services classpath
│   └── app/
│       ├── build.gradle                ← Applied plugin + Firebase BoM
│       └── google-services.json        ← Downloaded from Firebase Console
└── ...`,
    },

    {
      type: "heading",
      text: "Important Version Note",
    },
    {
      type: "paragraph",
      text: "The versions used in this guide (Google Services plugin ==4.4.2==, Firebase BoM ==34.7.0==) are the latest available at the time of publishing. Firebase regularly releases updates with new features, bug fixes, and security patches. Before adding these to your project, always verify the latest versions from the [official Firebase documentation](https://firebase.google.com/docs/android/setup) to ensure compatibility.",
    },

    {
      type: "heading",
      text: "What's Next?",
    },
    {
      type: "paragraph",
      text: "Now that Firebase is connected to your Android app, here are common next steps depending on what you're building: set up ==Firebase Cloud Messaging== for push notifications (you'll need an [APNs key](/blogs/generate-apns-key-ios-push-notifications) if you're also targeting iOS), integrate ==Firebase Authentication== for login flows, add ==Crashlytics== for real-time crash reporting, or enable ==Analytics== to track user engagement. Each Firebase service has its own React Native library — check out [@react-native-firebase](https://rnfirebase.io/) for well-maintained, community-driven packages.",
    },
  ],
};

export default post;
