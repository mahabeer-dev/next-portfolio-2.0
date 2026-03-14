import type { BlogPost } from "@/lib/blogs";

const post: BlogPost = {
  id: 6,
  slug: "firebase-push-notifications-nodejs-setup",
  title:
    "How to Send Push Notifications from Node.js with Firebase — Part 1: Firebase Console Setup",
  excerpt:
    "Step-by-step guide to configuring Firebase Cloud Messaging for your Node.js backend — generating the Admin SDK key, enabling Cloud Messaging, and sending your first test notification to iOS and Android devices.",
  date: "2026-03-12",
  readTime: "8 min read",
  tags: [
    "Node.js",
    "Firebase",
    "Push Notifications",
    "FCM",
    "Backend",
    "Mobile Development",
  ],
  platform: "personal",
  coverImage: "/blogs/firebase-push-notifications-nodejs-setup/cover.webp",
  content: [
    {
      type: "paragraph",
      text: "Sending push notifications from your backend is one of the most common requirements in mobile app development. Whether it's order updates, chat messages, or promotional alerts — your server needs a way to reach users on their devices. [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging) is the industry standard for this, and it works across ==both iOS and Android== with a single API.",
    },
    {
      type: "paragraph",
      text: "This is ==Part 1== of a two-part guide. In this part, we'll set up everything on the Firebase Console side — generating the Admin SDK credentials, enabling Cloud Messaging, and verifying the setup by sending a test notification. Part 2 will cover the Node.js code implementation with the ==firebase-admin== SDK.",
    },

    {
      type: "heading",
      text: "Prerequisites",
    },
    {
      type: "paragraph",
      text: "This guide follows an ==industry-standard directory structure== for a Node.js project. Before you begin, make sure you have:",
    },
    {
      type: "paragraph",
      text: "A ==Firebase project== already created in the [Firebase Console](https://console.firebase.google.com/). Your ==iOS and Android apps registered== with Firebase — if not, follow our [Android setup guide](/blogs/register-android-app-firebase-react-native) and [iOS setup guide](/blogs/register-ios-app-firebase-react-native) first.",
    },

    {
      type: "heading",
      text: "Step 1 — Generate the Firebase Admin SDK Private Key",
    },
    {
      type: "paragraph",
      text: "The Firebase Admin SDK lets your Node.js server authenticate with Firebase and send notifications on behalf of your project. To use it, you need a ==service account private key== — a JSON file that contains your project credentials.",
    },
    {
      type: "paragraph",
      text: "Open the [Firebase Console](https://console.firebase.google.com/) and select your project. From the left sidebar, click the ==gear icon== (Settings) and select ==Service accounts== from the menu.",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/1.webp",
      alt: "Firebase Console sidebar showing Settings menu with Service accounts option highlighted",
      caption: "Navigate to Settings → Service accounts",
    },

    {
      type: "heading",
      text: "Step 2 — Download the Admin SDK JSON File",
    },
    {
      type: "paragraph",
      text: "On the Service accounts page, you'll see the ==Firebase Admin SDK== section. Make sure ==Node.js== is selected as the language tab (it should be selected by default). Then click the =='Generate new private key'== button.",
    },
    {
      type: "paragraph",
      text: "A confirmation modal will appear warning you to keep the key secure. Click =='Generate key'== to confirm. A ==JSON file== will automatically download — this is your `admin-sdk.json` (or similarly named file like `serviceAccountKey.json`).",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/2.webp",
      alt: "Firebase Admin SDK section showing Node.js tab selected and the Generate new private key button",
      caption: 'Select Node.js and click "Generate new private key"',
    },
    {
      type: "paragraph",
      text: "==Security warning:== This file contains your project's private key. ==Never commit it to version control.== Add it to your `.gitignore` immediately. In production, store it as an environment variable or use a secrets manager (AWS Secrets Manager, GCP Secret Manager, etc.).",
    },
    {
      type: "code",
      language: "bash",
      text: "# Add to .gitignore\necho 'admin-sdk.json' >> .gitignore\necho 'serviceAccountKey.json' >> .gitignore",
    },
    {
      type: "paragraph",
      text: "Place the downloaded JSON file in your Node.js project. A common convention is to put it in a `config/` or root directory:",
    },
    {
      type: "code",
      language: "text",
      text: "your-nodejs-project/\n├── config/\n│   └── admin-sdk.json      ← place it here\n├── src/\n│   └── ...\n├── .gitignore               ← make sure admin-sdk.json is listed\n└── package.json",
    },

    {
      type: "heading",
      text: "Step 3 — Enable Cloud Messaging in Firebase Console",
    },
    {
      type: "paragraph",
      text: 'Now you need to enable Firebase Cloud Messaging for your project. In the Firebase Console sidebar, look for the ==Engage== section (previously called "Grow" or "DevOps & Engagement"). Click on ==Messaging==.',
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/3.webp",
      alt: "Firebase Console sidebar showing the Engage section with Messaging option highlighted",
      caption: "Navigate to Engage → Messaging in the sidebar",
    },
    {
      type: "paragraph",
      text: "If this is your first time using Cloud Messaging, you'll see a welcome screen. Click =='Create your first campaign'== to get started.",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/4.webp",
      alt: "Firebase Cloud Messaging welcome screen with Create your first campaign button",
      caption: 'Click "Create your first campaign" to enable Messaging',
    },
    {
      type: "paragraph",
      text: "You'll be prompted to choose a message type. Select =='Firebase Notification messages'== and click =='Create'==. This is the standard notification type that works with both iOS and Android devices.",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/5.webp",
      alt: "Campaign type selection showing Firebase Notification messages option selected",
      caption: 'Select "Firebase Notification messages" and click Create',
    },

    {
      type: "heading",
      text: "Step 4 — Send a Test Notification",
    },
    {
      type: "paragraph",
      text: "Now let's verify the setup by sending a test notification. The campaign creation wizard has multiple steps. In ==Step 1 (Notification)==, fill in the following:",
    },
    {
      type: "code",
      language: "text",
      text: "Notification title:  test\nNotification text:   This is a test notification",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/6.webp",
      alt: "Firebase notification composer showing title and text fields filled with test values",
      caption: "Fill in a test notification title and body text",
    },

    {
      type: "heading",
      text: "Step 5 — Select Target Audience",
    },
    {
      type: "paragraph",
      text: "In ==Step 2 (Target)==, select the =='User segment'== tab. From the app dropdown, choose ==both your iOS and Android apps== — this ensures the test notification reaches all registered devices. We assume you've already registered both platforms with Firebase (if not, see our [Android](/blogs/register-android-app-firebase-react-native) and [iOS](/blogs/register-ios-app-firebase-react-native) setup guides).",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/7.webp",
      alt: "Firebase targeting step showing User segment tab with both iOS and Android apps selected",
      caption: "Select both iOS and Android apps under User segment",
    },

    {
      type: "heading",
      text: "Step 6 — Schedule and Publish",
    },
    {
      type: "paragraph",
      text: "In ==Step 3 (Scheduling)==, select =='Now'== to send the notification immediately. You can also schedule it for a specific date/time, but for testing purposes, sending it immediately is the quickest way to verify your setup.",
    },
    {
      type: "paragraph",
      text: "Click =='Review'== to see a summary of your notification. Verify the title, body, and target apps are correct, then click =='Publish'== in the review modal to send the notification.",
    },
    {
      type: "image",
      src: "/blogs/firebase-push-notifications-nodejs-setup/8.webp",
      alt: "Firebase notification review modal showing notification details and Publish button",
      caption: 'Review the notification details and click "Publish"',
    },
    {
      type: "paragraph",
      text: "If your apps are running on devices (or emulators with Google Play Services), you should see the test notification appear within a few seconds. If you're on iOS, make sure you've configured your [APNs key](/blogs/generate-apns-key-ios-push-notifications) — otherwise iOS notifications won't be delivered.",
    },

    {
      type: "heading",
      text: "What We've Accomplished",
    },
    {
      type: "paragraph",
      text: "At this point, the Firebase side of push notifications is fully configured. Here's a checklist of what's been set up:",
    },
    {
      type: "code",
      language: "text",
      text: "✓  Firebase Admin SDK private key generated (admin-sdk.json)\n✓  Key securely stored in project, added to .gitignore\n✓  Cloud Messaging enabled in Firebase Console\n✓  Test notification sent and verified on devices\n✓  Both iOS and Android apps targeted",
    },

    {
      type: "heading",
      text: "Firebase Admin SDK Key — What's Inside?",
    },
    {
      type: "paragraph",
      text: "The JSON file you downloaded contains several important fields. Here's what each one does:",
    },
    {
      type: "code",
      language: "json",
      text: `{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}`,
    },
    {
      type: "paragraph",
      text: "The ==project_id== identifies your Firebase project. The ==private_key== is used for server-to-server authentication. The ==client_email== is the service account identity. Your Node.js server uses these credentials to authenticate with Firebase and gain permission to send notifications, access Firestore, manage users, and more.",
    },
    {
      type: "paragraph",
      text: "The Firebase Console setup is complete. In ==Part 2==, we'll implement the Node.js backend code — initializing the Firebase Admin SDK, storing FCM device tokens in your database, and building an API endpoint to send targeted push notifications to specific users or user segments. Stay tuned!",
    },
    {
      type: "paragraph",
      text: "In the meantime, if you haven't set up [Crashlytics](/blogs/enable-firebase-crashlytics-react-native) for your React Native app, it's a good time to do that — crash reports + push notifications together give you full observability over your users' experience.",
    },
  ],
};

export default post;
