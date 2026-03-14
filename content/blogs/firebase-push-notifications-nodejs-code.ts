import type { BlogPost } from "@/lib/blogs";

const post: BlogPost = {
  id: 7,
  slug: "firebase-push-notifications-nodejs-code",
  title:
    "How to Send Push Notifications from Node.js with Firebase — Part 2: Code Implementation",
  excerpt:
    "Implement the Node.js backend for Firebase Cloud Messaging — initialize firebase-admin, store FCM tokens per user, expose a save-token API, and send push notifications from your server using a reusable notification service.",
  date: "2026-03-12",
  readTime: "10 min read",
  tags: [
    "Node.js",
    "Firebase",
    "Push Notifications",
    "FCM",
    "Backend",
    "Express",
    "MongoDB",
  ],
  platform: "personal",
  coverImage: "/blogs/firebase-push-notifications-nodejs-code/cover.webp",
  content: [
    {
      type: "paragraph",
      text: "In [Part 1](/blogs/firebase-push-notifications-nodejs-setup), we set up the Firebase Console — generated the Admin SDK key, enabled Cloud Messaging, and sent a test notification. In this part, we implement the ==Node.js backend== so your server can send push notifications to specific users on demand.",
    },
    {
      type: "paragraph",
      text: "We'll follow an ==industry-standard directory structure==: place the service account JSON securely, add an ==fcm_token== field to your users table, expose an API for the mobile app to register tokens, initialize ==firebase-admin==, and build a reusable notification service that sends messages to one or many devices.",
    },

    {
      type: "heading",
      text: "Prerequisites",
    },
    {
      type: "paragraph",
      text: "You must have completed [Part 1](/blogs/firebase-push-notifications-nodejs-setup) — the ==firebase-service-account.json== (or equivalent) file downloaded and your Firebase project ready. You also need a Node.js project with a ==users table or collection== (we'll add an FCM token field to it) and an existing auth flow so you can identify the requesting user when saving the token.",
    },

    {
      type: "heading",
      text: "Step 1 — Place the Service Account JSON and Secure It",
    },
    {
      type: "paragraph",
      text: "In your Node.js project root, place the JSON file you downloaded from Firebase (Settings → Service accounts → Generate new private key). Rename it to something clear, e.g. ==firebase-service-account.json==.",
    },
    {
      type: "code",
      language: "text",
      text: "your-nodejs-project/\n├── firebase-service-account.json   ← place here (root)\n├── src/\n├── .gitignore\n└── package.json",
    },
    {
      type: "paragraph",
      text: "This file is ==sensitive== — it contains your project's private key. ==Never commit it to a remote repository.== Add it to ==.gitignore== immediately:",
    },
    {
      type: "code",
      language: "gitignore",
      text: "# Firebase Admin SDK key (sensitive)\nfirebase-service-account.json\n*-service-account*.json",
    },
    {
      type: "paragraph",
      text: "In production, prefer environment variables or a secrets manager (e.g. [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), [GCP Secret Manager](https://cloud.google.com/secret-manager)) and load the JSON from there instead of a file on disk.",
    },

    {
      type: "heading",
      text: "Step 2 — Add FCM Token to Your Users Model",
    },
    {
      type: "paragraph",
      text: "Each user needs a place to store their FCM device token. The mobile app obtains this token from the Firebase SDK and sends it to your backend; you persist it and use it later when sending notifications.",
    },
    {
      type: "paragraph",
      text: "Edit your ==users table/document== and add a new column or field: ==fcm_token== (or ==fcmToken== if you use camelCase). If you use MongoDB with Mongoose, add the field to your User schema:",
    },
    {
      type: "code",
      language: "typescript",
      text: `// Example: User schema (Mongoose)
const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  // ... other fields
  fcmToken: { type: String, default: null },  // FCM device token for push notifications
});`,
    },
    {
      type: "paragraph",
      text: "If you use SQL (e.g. PostgreSQL, MySQL), add a nullable column and run a migration:",
    },
    {
      type: "code",
      language: "sql",
      text: "-- Example: SQL migration\nALTER TABLE users ADD COLUMN fcm_token VARCHAR(255) NULL;",
    },
    {
      type: "paragraph",
      text: "A user may have ==multiple devices== (phone + tablet). To support that, you can store an array of tokens (e.g. ==fcm_tokens==) and update the save/load logic accordingly. For this guide we keep a single ==fcmToken== per user for simplicity.",
    },

    {
      type: "heading",
      text: "Step 3 — API Endpoint to Save the FCM Token",
    },
    {
      type: "paragraph",
      text: "The mobile app must send the FCM token to your backend after the user logs in (and whenever the token is refreshed). Expose a protected endpoint that associates the token with the authenticated user.",
    },
    {
      type: "paragraph",
      text: "Example with ==Express== and a user attached via auth middleware (e.g. JWT):",
    },
    {
      type: "code",
      language: "typescript",
      text: `export const saveFCMToken = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { token } = req.body;

    const user = await models.User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fcmToken = token;
    await user.save();

    return res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};`,
    },
    {
      type: "paragraph",
      text: "Register the route (e.g. ==POST /api/users/fcm-token==) and protect it with your auth middleware so only logged-in users can update their token. Validate that ==req.body.token== is a non-empty string before saving.",
    },
    {
      type: "paragraph",
      text: "On the client (React Native), call this API after [getting the FCM token](https://rnfirebase.io/messaging/usage#device-token) from ==@react-native-firebase/messaging== and after login or token refresh.",
    },

    {
      type: "heading",
      text: "Step 4 — Install firebase-admin",
    },
    {
      type: "code",
      language: "bash",
      text: "npm install firebase-admin\n# or\nyarn add firebase-admin",
    },
    {
      type: "paragraph",
      text: "Use the official [firebase-admin](https://www.npmjs.com/package/firebase-admin) SDK — it is the only supported way to send messages from a Node.js server.",
    },

    {
      type: "heading",
      text: "Step 5 — Initialize Firebase Admin (Config)",
    },
    {
      type: "paragraph",
      text: "Create a config module that initializes the Firebase Admin SDK once and exports the ==messaging== instance. This way you don't re-initialize on every request.",
    },
    {
      type: "paragraph",
      text: "Create ==src/config/firebase.ts== (or ==src/config/firebase.js==):",
    },
    {
      type: "code",
      language: "typescript",
      text: `import admin from "firebase-admin";
import serviceAccount from "../../firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const messaging = admin.messaging();`,
    },
    {
      type: "paragraph",
      text: "If you load credentials from an environment variable (e.g. in production), use:",
    },
    {
      type: "code",
      language: "typescript",
      text: `const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require("../../firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});`,
    },
    {
      type: "paragraph",
      text: "Ensure the JSON path in ==require()== or import matches where you placed the file. If your config lives elsewhere (e.g. ==src/config/==), adjust the relative path (e.g. ==../../firebase-service-account.json== from ==src/config/==).",
    },

    {
      type: "heading",
      text: "Step 6 — Notification Service (Send to One or Many Tokens)",
    },
    {
      type: "paragraph",
      text: "Create a reusable service that sends a notification to a list of FCM tokens. Firebase's ==sendEachForMulticast== sends to multiple tokens and returns per-token success/failure, so you can remove invalid tokens from your database.",
    },
    {
      type: "paragraph",
      text: "Create ==src/services/notification.service.ts==:",
    },
    {
      type: "code",
      language: "typescript",
      text: `import { messaging } from "../config/firebase";

interface SendParams {
  tokens: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}

export async function sendNotification({
  tokens,
  title,
  body,
  data = {},
}: SendParams) {
  if (!tokens.length) return;

  const response = await messaging.sendEachForMulticast({
    tokens,
    notification: {
      title,
      body,
    },
    data: {
      ...data,
      title,
      body,
    },
    android: {
      priority: "high" as const,
    },
    apns: {
      payload: {
        aps: { sound: "default" },
      },
      fcmOptions: {
        imageUrl: data.imageUrl,
      },
    },
  });

  console.log("FCM response", response.successCount, "/", response.responses.length);
  return response;
}`,
    },
    {
      type: "paragraph",
      text: "Important: ==notification== is used for the visible title/body. ==data== is for custom key-value pairs (all values must be strings) that your app can read when the notification is opened. We include title/body in ==data== as well so the app can use them in background/data-only scenarios.",
    },
    {
      type: "paragraph",
      text: "Handle failed tokens: loop over ==response.responses== and where ==success === false==, remove that token from your user record (e.g. invalid or uninstalled app).",
    },

    {
      type: "heading",
      text: "Step 7 — Sending a Notification from Your Code",
    },
    {
      type: "paragraph",
      text: "Wherever you need to send a push (e.g. after an order is placed, or a new message is created), load the user's ==fcmToken== and call the service:",
    },
    {
      type: "code",
      language: "typescript",
      text: `import { sendNotification } from "./services/notification.service";

// Example: after creating an order
const user = await User.findById(order.userId);
if (user?.fcmToken) {
  await sendNotification({
    tokens: [user.fcmToken],
    title: "Order confirmed",
    body: \`Your order #\${order.id} has been placed.\`,
    data: { orderId: order.id, screen: "OrderDetail" },
  });
}`,
    },
    {
      type: "paragraph",
      text: "For multiple users, collect all non-null ==fcmToken== values and pass them as ==tokens==. Always check for null/empty tokens before calling ==sendNotification==.",
    },

    {
      type: "heading",
      text: "File Structure Summary",
    },
    {
      type: "code",
      language: "text",
      text: `your-nodejs-project/
├── firebase-service-account.json     # Do not commit
├── src/
│   ├── config/
│   │   └── firebase.ts               # Initialize admin, export messaging
│   ├── services/
│   │   └── notification.service.ts  # sendNotification()
│   ├── controllers/
│   │   └── user.controller.ts        # saveFCMToken
│   └── routes/
│       └── user.routes.ts            # POST /users/fcm-token
├── .gitignore                        # Include firebase-service-account.json
└── package.json`,
    },

    {
      type: "heading",
      text: "Handling Invalid or Expired Tokens",
    },
    {
      type: "paragraph",
      text: "FCM tokens can become invalid (user uninstalled the app, token rotated, etc.). Use the ==sendEachForMulticast== response to clean up:",
    },
    {
      type: "code",
      language: "typescript",
      text: `const response = await messaging.sendEachForMulticast({ tokens, notification, data });

response.responses.forEach((resp, idx) => {
  if (!resp.success && resp.error?.code === "messaging/invalid-registration-token") {
    const badToken = tokens[idx];
    // Remove badToken from user document(s) in DB
    await User.updateMany({ fcmToken: badToken }, { $set: { fcmToken: null } });
  }
});`,
    },

    {
      type: "heading",
      text: "Testing End-to-End",
    },
    {
      type: "paragraph",
      text: "1) Run your Node.js server with ==firebase-service-account.json== in place. 2) From your React Native app, get the FCM token and call ==POST /api/users/fcm-token== with it. 3) Trigger a send (e.g. from a test route or after a real action) and confirm the notification appears on the device. 4) For iOS, ensure your [APNs key is uploaded](/blogs/generate-apns-key-ios-push-notifications) in Firebase; for Android, ensure [google-services.json](/blogs/register-android-app-firebase-react-native) is configured.",
    },

    {
      type: "heading",
      text: "Recap",
    },
    {
      type: "paragraph",
      text: "You've set up: secure storage of the Firebase service account key, an ==fcm_token== field on users and an API to save the token from the app, Firebase Admin initialization in ==src/config/firebase.ts==, and a ==sendNotification== service that sends to one or many tokens with ==sendEachForMulticast==. Together with [Part 1](/blogs/firebase-push-notifications-nodejs-setup), your Node.js backend can now send push notifications to iOS and Android devices on demand.",
    },
  ],
};

export default post;
