import type { BlogPost } from "@/lib/blogs";

const post: BlogPost = {
  id: 4,
  slug: "register-ios-app-firebase-react-native",
  title:
    "How to Register an iOS App with Firebase in React Native (2026 Guide)",
  excerpt:
    "A complete step-by-step guide to adding Firebase to your React Native iOS app — from finding your Bundle ID in Xcode to configuring AppDelegate and verifying the setup.",
  date: "2026-03-11",
  readTime: "7 min read",
  tags: ["React Native", "Firebase", "iOS", "Xcode", "Mobile Development"],
  platform: "personal",
  coverImage: "/blogs/register-ios-app-firebase-react-native/cover.webp",
  content: [
    {
      type: "paragraph",
      text: "If you're building a React Native app and want to use Firebase services on iOS — push notifications, authentication, analytics, crashlytics — you first need to register your iOS app with your Firebase project. This guide walks you through the entire process, from the [Firebase Console](https://console.firebase.google.com/) to your Xcode project configuration.",
    },
    {
      type: "paragraph",
      text: "This is the iOS counterpart to our [Android Firebase setup guide](/blogs/register-android-app-firebase-react-native). If you've already done the Android side, the Firebase Console steps will feel familiar — but the project configuration is completely different since iOS uses Xcode, ==GoogleService-Info.plist==, and ==AppDelegate== instead of Gradle files.",
    },

    {
      type: "heading",
      text: "Prerequisites",
    },
    {
      type: "paragraph",
      text: 'Before you start, make sure you have: a Firebase project already created in the [Firebase Console](https://console.firebase.google.com/), a React Native project with iOS set up, ==Xcode== installed on your Mac, and CocoaPods or Swift Package Manager for dependency management. If you haven\'t created a Firebase project yet, it takes less than a minute — just head to the console and click "Add project".',
    },

    {
      type: "heading",
      text: "Step 1 — Open Your Firebase Project and Add an iOS App",
    },
    {
      type: "paragraph",
      text: "Navigate to the [Firebase Console](https://console.firebase.google.com/) and select your project. Open the ==Project Overview== tab from the left sidebar and click =='Add app'==. From the platform options, click the ==iOS icon== to start the iOS app registration wizard.",
    },
    {
      type: "image",
      src: "/blogs/register-ios-app-firebase-react-native/1.webp",
      alt: "Firebase Console showing the Add App button with iOS platform icon highlighted",
      caption: "Click the iOS icon to register a new iOS app",
    },

    {
      type: "heading",
      text: "Step 2 — Find Your Apple Bundle ID",
    },
    {
      type: "paragraph",
      text: "The first field Firebase asks for is your ==Apple Bundle ID==. This is the unique identifier for your iOS app, and you need to get it from Xcode. Here's how:",
    },
    {
      type: "paragraph",
      text: "Open your React Native project in ==Xcode== by opening the `.xcworkspace` file (not `.xcodeproj`) located in the `ios/` folder:",
    },
    {
      type: "code",
      language: "bash",
      text: "open ios/YourApp.xcworkspace",
    },
    {
      type: "paragraph",
      text: "In Xcode, select your ==app folder from the left sidebar== (the top-level project entry). Under the ==Targets== section, select your main app target — ==do not select the .Tests target==. Then click on the =='Signing & Capabilities'== tab from the tab bar at the top.",
    },
    {
      type: "paragraph",
      text: "Under the ==Signing== section, expand ==iOS== and you'll see the ==Bundle Identifier== for your app. It typically looks like `com.yourcompany.yourapp`. Copy this value.",
    },
    {
      type: "image",
      src: "/blogs/register-ios-app-firebase-react-native/2.webp",
      alt: "Xcode Signing and Capabilities tab showing the Bundle Identifier field under the iOS Signing section",
      caption: "Find your Bundle Identifier in Xcode → Signing & Capabilities",
    },

    {
      type: "heading",
      text: "Step 3 — Register the iOS App in Firebase",
    },
    {
      type: "paragraph",
      text: "Back in the Firebase Console, paste your ==Bundle ID== into the =='Apple bundle ID'== field. Optionally, add an ==App nickname== — this is helpful if you're registering multiple iOS apps (like staging and production) under the same Firebase project. You can also add your ==App Store ID== if your app is already published.",
    },
    {
      type: "paragraph",
      text: "Click =='Register app'== to proceed.",
    },
    {
      type: "image",
      src: "/blogs/register-ios-app-firebase-react-native/3.webp",
      alt: "Firebase Register iOS App form showing Bundle ID, App nickname, and App Store ID fields",
      caption: "Enter your Bundle ID and click Register app",
    },

    {
      type: "heading",
      text: "Step 4 — Download GoogleService-Info.plist",
    },
    {
      type: "paragraph",
      text: "After registration, Firebase generates a ==GoogleService-Info.plist== configuration file for your iOS app. Click the =='Download GoogleService-Info.plist'== button and save it to your machine. Then click =='Next'==.",
    },
    {
      type: "paragraph",
      text: "Now you need to add this file to your Xcode project. Open your project in Xcode, then in the ==left sidebar==, right-click on your main project folder and select =='Add Files to \"YourProjectName\"'== from the context menu.",
    },
    {
      type: "paragraph",
      text: "Select the downloaded ==GoogleService-Info.plist== file, make sure =='Copy items if needed'== is checked, and click =='Finish'==. The file should now appear in your project navigator.",
    },
    {
      type: "image",
      src: "/blogs/register-ios-app-firebase-react-native/4.webp",
      alt: "Xcode project navigator showing GoogleService-Info.plist added to the main app folder",
      caption:
        "Add GoogleService-Info.plist to your Xcode project via right-click → Add Files",
    },
    {
      type: "paragraph",
      text: "==Important:== The file must be named exactly `GoogleService-Info.plist` and placed in the root of your app target. If you rename it or place it in a subfolder, Firebase won't be able to find it at runtime.",
    },

    {
      type: "heading",
      text: "Step 5 — Configure AppDelegate for Firebase",
    },
    {
      type: "paragraph",
      text: "Now you need to initialize Firebase when your app launches. Open the ==AppDelegate== file in your React Native project. For Swift-based projects, it's located at:",
    },
    {
      type: "code",
      language: "text",
      text: "your-project/\n└── ios/\n    └── YourApp/\n        └── AppDelegate.swift",
    },
    {
      type: "paragraph",
      text: "Add the ==FirebaseCore== import at the top of the file and call ==FirebaseApp.configure()== inside the `application(_:didFinishLaunchingWithOptions:)` method:",
    },
    {
      type: "code",
      language: "swift",
      text: `import UIKit
import FirebaseCore

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions:
      [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    FirebaseApp.configure()

    return true
  }
}`,
    },
    {
      type: "paragraph",
      text: "The key line is ==FirebaseApp.configure()== — this reads the `GoogleService-Info.plist` file and initializes all Firebase services. It must be called as early as possible in your app lifecycle, ideally as the first line in `didFinishLaunchingWithOptions`.",
    },
    {
      type: "paragraph",
      text: "For React Native projects using the newer architecture with a bridging header or Objective-C AppDelegate, the equivalent Objective-C code would be:",
    },
    {
      type: "code",
      language: "objectivec",
      text: `#import <Firebase.h>

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [FIRApp configure];
  // ... rest of your setup
  return YES;
}`,
    },

    {
      type: "heading",
      text: "Step 6 — Install Firebase iOS SDK via CocoaPods",
    },
    {
      type: "paragraph",
      text: "If you're using [@react-native-firebase](https://rnfirebase.io/), the Firebase iOS SDK is managed automatically via CocoaPods. Make sure your `Podfile` includes the Firebase dependency, then run:",
    },
    {
      type: "code",
      language: "bash",
      text: "cd ios && pod install && cd ..",
    },
    {
      type: "paragraph",
      text: "If you're managing Firebase manually without @react-native-firebase, add the Firebase pod to your `ios/Podfile`:",
    },
    {
      type: "code",
      language: "ruby",
      text: `# ios/Podfile
pod 'Firebase/Core'
# Add specific Firebase modules as needed:
# pod 'Firebase/Messaging'
# pod 'Firebase/Auth'
# pod 'Firebase/Analytics'`,
    },
    {
      type: "paragraph",
      text: "Then run `pod install` again. Always open the ==.xcworkspace== file after running pod install — not the `.xcodeproj` file.",
    },

    {
      type: "heading",
      text: "Step 7 — Complete Setup and Verify",
    },
    {
      type: "paragraph",
      text: "Back in the Firebase Console, click =='Continue to console'== to complete the setup wizard. Firebase may attempt to verify communication with your app — this will succeed once you build and run.",
    },
    {
      type: "paragraph",
      text: "Build and run your app on an iOS simulator or physical device:",
    },
    {
      type: "code",
      language: "bash",
      text: "npx react-native run-ios",
    },
    {
      type: "paragraph",
      text: "If the app compiles and launches without errors, ==Firebase is successfully integrated with your iOS app==. You're now ready to use Firebase services like Authentication, Cloud Firestore, Cloud Messaging, Analytics, Crashlytics, and more.",
    },

    {
      type: "heading",
      text: "Complete File Reference",
    },
    {
      type: "paragraph",
      text: "Here's a summary of all the files involved in the iOS Firebase setup:",
    },
    {
      type: "code",
      language: "text",
      text: `your-react-native-project/
├── ios/
│   ├── YourApp.xcworkspace          ← Always open this (not .xcodeproj)
│   ├── Podfile                      ← Firebase pod dependencies
│   └── YourApp/
│       ├── AppDelegate.swift        ← Added FirebaseApp.configure()
│       └── GoogleService-Info.plist ← Downloaded from Firebase Console
└── ...`,
    },

    {
      type: "heading",
      text: "Common Mistakes to Avoid",
    },
    {
      type: "paragraph",
      text: "==Wrong Bundle ID== — The Bundle ID in Firebase must exactly match the one in Xcode. Even a single character difference will cause Firebase to silently fail. Double-check by comparing Xcode → Signing & Capabilities with what you entered in the Firebase Console.",
    },
    {
      type: "paragraph",
      text: "==Missing GoogleService-Info.plist== — If you forgot to add the plist file to Xcode or placed it in the wrong target, your app will crash on launch with a Firebase configuration error. Make sure the file appears in the project navigator under your main app target.",
    },
    {
      type: "paragraph",
      text: "==Opening .xcodeproj instead of .xcworkspace== — After running `pod install`, you must open the `.xcworkspace` file. Opening `.xcodeproj` will result in missing framework errors because CocoaPods dependencies are linked through the workspace.",
    },
    {
      type: "paragraph",
      text: "==FirebaseApp.configure() not called== — If you forget to add this line to AppDelegate, Firebase SDKs will throw runtime errors when you try to use any service. Always call it before any other Firebase API.",
    },

    {
      type: "heading",
      text: "What's Next?",
    },
    {
      type: "paragraph",
      text: "With Firebase connected to your iOS app, you can now: set up [push notifications](/blogs/generate-apns-key-ios-push-notifications) (you'll need an ==APNs key== from the Apple Developer Portal), add ==Firebase Authentication== for sign-in flows, enable ==Crashlytics== for real-time crash reporting, and activate ==Analytics== for user engagement tracking. Check out [@react-native-firebase](https://rnfirebase.io/) for production-ready React Native bindings for all Firebase services.",
    },
  ],
};

export default post;
