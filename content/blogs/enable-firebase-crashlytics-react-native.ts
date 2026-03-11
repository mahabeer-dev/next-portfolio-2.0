import type { BlogPost } from "@/lib/blogs";

const post: BlogPost = {
  id: 5,
  slug: "enable-firebase-crashlytics-react-native",
  title:
    "End-to-End Guide: Enable Firebase Crashlytics in React Native (Android + iOS)",
  excerpt:
    "A complete guide to setting up Firebase Crashlytics in your React Native app — from Gradle configuration and CocoaPods to a reusable Crashlytics service, React Error Boundary integration, and verifying crash reports in the Firebase Console.",
  date: "2026-03-11",
  readTime: "12 min read",
  tags: [
    "React Native",
    "Firebase",
    "Crashlytics",
    "Android",
    "iOS",
    "Error Handling",
  ],
  platform: "personal",
  coverImage: "/blogs/enable-firebase-crashlytics-react-native/cover.webp",
  content: [
    {
      type: "paragraph",
      text: "Crash reporting is non-negotiable for production mobile apps. [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) gives you real-time crash reports with stack traces, device info, and user context — for free. This guide walks you through enabling Crashlytics in a React Native app on ==both Android and iOS==, including optional but recommended patterns like a centralized service wrapper and a React Error Boundary.",
    },
    {
      type: "paragraph",
      text: "This guide assumes ==Firebase is already added== to your project — meaning you have `google-services.json` (Android), `GoogleService-Info.plist` (iOS), and [@react-native-firebase/app](https://rnfirebase.io/) installed and working. If not, follow our [Android setup guide](/blogs/register-android-app-firebase-react-native) and [iOS setup guide](/blogs/register-ios-app-firebase-react-native) first.",
    },

    {
      type: "heading",
      text: "Step 1 — Install the Crashlytics Package",
    },
    {
      type: "paragraph",
      text: "Install the [@react-native-firebase/crashlytics](https://rnfirebase.io/crashlytics/usage) package:",
    },
    {
      type: "code",
      language: "bash",
      text: "yarn add @react-native-firebase/crashlytics\n# or\nnpm install @react-native-firebase/crashlytics",
    },

    {
      type: "heading",
      text: "Step 2 — Android Configuration",
    },
    {
      type: "paragraph",
      text: "Android requires a few Gradle changes to enable the Crashlytics build plugin. This plugin handles ==symbol upload== and ==mapping file generation== so your crash stack traces are readable in the Firebase Console.",
    },

    {
      type: "heading",
      text: "2.1 — Root build.gradle (Classpath)",
    },
    {
      type: "paragraph",
      text: "Open ==android/build.gradle== and add the Crashlytics Gradle plugin classpath inside `buildscript.dependencies`:",
    },
    {
      type: "code",
      language: "groovy",
      text: `buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        // ... your existing classpaths
        classpath("com.google.firebase:firebase-crashlytics-gradle:3.0.2")
        classpath("com.google.gms:google-services:4.4.2")
    }
}`,
    },

    {
      type: "heading",
      text: "2.2 — App-level build.gradle (Plugin + Dependencies)",
    },
    {
      type: "paragraph",
      text: "Open ==android/app/build.gradle== and make three changes:",
    },
    {
      type: "paragraph",
      text: "==A) Apply the Crashlytics plugin== — add it near the top, after other `apply plugin` lines:",
    },
    {
      type: "code",
      language: "groovy",
      text: `apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"
apply plugin: "com.google.firebase.crashlytics"
apply plugin: "com.google.gms.google-services"`,
    },
    {
      type: "paragraph",
      text: "==B) Enable mapping upload for release builds== — inside the `android { buildTypes { release { } } }` block. This uploads ProGuard/R8 mapping files so Crashlytics can deobfuscate your stack traces:",
    },
    {
      type: "code",
      language: "groovy",
      text: `buildTypes {
    release {
        // ... signingConfig, minifyEnabled, proguardFiles, etc.
        firebaseCrashlytics {
            mappingFileUploadEnabled true
        }
    }
}`,
    },
    {
      type: "paragraph",
      text: "==C) Add the Crashlytics dependency== — inside the `dependencies { }` block:",
    },
    {
      type: "code",
      language: "groovy",
      text: `dependencies {
    // Firebase BoM (if not already present)
    implementation platform('com.google.firebase:firebase-bom:34.7.0')

    // Firebase Crashlytics
    implementation 'com.google.firebase:firebase-crashlytics'
}`,
    },
    {
      type: "paragraph",
      text: "Then clean the build:",
    },
    {
      type: "code",
      language: "bash",
      text: "cd android && ./gradlew clean && cd ..",
    },

    {
      type: "heading",
      text: "Step 3 — iOS Configuration",
    },
    {
      type: "paragraph",
      text: "iOS setup is much simpler. Crashlytics is pulled in automatically by React Native Firebase via CocoaPods. Just install pods:",
    },
    {
      type: "code",
      language: "bash",
      text: "cd ios && pod install && cd ..",
    },
    {
      type: "paragraph",
      text: "The ==[CP-User] [RNFB] Crashlytics Configuration== build phase (which handles dSYM upload) is added automatically by the RNFB pod. ==No extra Xcode steps required== if Firebase is already set up in your iOS project.",
    },

    {
      type: "heading",
      text: "Step 4 — Enable Crashlytics in Your App Entry",
    },
    {
      type: "paragraph",
      text: "Open your ==App.tsx== (or root component) and enable Crashlytics collection. It's best practice to only collect crash data in production builds — disable it in development to avoid noise in your dashboard:",
    },
    {
      type: "code",
      language: "tsx",
      text: `import {
  getCrashlytics,
  setCrashlyticsCollectionEnabled,
  log,
} from '@react-native-firebase/crashlytics';

const crashlytics = getCrashlytics();

const App = () => {
  useEffect(() => {
    setCrashlyticsCollectionEnabled(crashlytics, !__DEV__);
    log(crashlytics, 'App started');
  }, []);

  return (
    // ... your app
  );
};`,
    },
    {
      type: "paragraph",
      text: "The ==!__DEV__== flag ensures Crashlytics only collects data in release builds. The `log()` call adds a breadcrumb that will appear in crash reports, helping you understand the user's journey leading up to a crash.",
    },

    {
      type: "heading",
      text: "Step 5 — Create a Crashlytics Service (Recommended)",
    },
    {
      type: "paragraph",
      text: "Rather than importing Crashlytics directly in every file, create a centralized service wrapper. This gives you a clean API and makes it easy to swap implementations or add middleware later.",
    },
    {
      type: "paragraph",
      text: "Create ==src/services/crashlytics/crashlyticsService.ts==:",
    },
    {
      type: "code",
      language: "typescript",
      text: `import crashlytics from '@react-native-firebase/crashlytics';

export default {
  log: (msg: string) => crashlytics().log(msg),
  recordError: (err: Error) => crashlytics().recordError(err),
  setUserId: (id: string) => crashlytics().setUserId(id),
  clearUser: () => crashlytics().setUserId(''),
  setAttributes: (attrs: Record<string, string>) =>
    crashlytics().setAttributes(attrs),
  setAttribute: (key: string, value: string) =>
    crashlytics().setAttribute(key, value),
};`,
    },
    {
      type: "paragraph",
      text: "Create the barrel export at ==src/services/crashlytics/index.ts==:",
    },
    {
      type: "code",
      language: "typescript",
      text: `export * from './crashlyticsService';
export { default } from './crashlyticsService';`,
    },
    {
      type: "paragraph",
      text: "And export from your services index at ==src/services/index.ts==:",
    },
    {
      type: "code",
      language: "typescript",
      text: `export * from './crashlytics';
// ... other service exports`,
    },

    {
      type: "heading",
      text: "Step 6 — React Error Boundary with Crashlytics",
    },
    {
      type: "paragraph",
      text: "React Error Boundaries catch JavaScript errors in the component tree. By default, these errors crash the app silently without reaching Crashlytics. By wiring an Error Boundary to your Crashlytics service, ==every React render error gets reported to the Firebase Console== with full component stack traces.",
    },
    {
      type: "paragraph",
      text: "Create ==src/components/ErrorBoundary.tsx==:",
    },
    {
      type: "code",
      language: "tsx",
      text: `import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import crashlyticsService from '../services/crashlytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (!__DEV__) {
      crashlyticsService.log(\`React ErrorBoundary: \${error.message}\`);
      crashlyticsService.setAttribute(
        'componentStack',
        (errorInfo.componentStack || '').slice(0, 1000),
      );
      crashlyticsService.recordError(error);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  message: { marginTop: 12, fontSize: 14, color: '#666', textAlign: 'center' },
  button: { marginTop: 24, paddingHorizontal: 32, paddingVertical: 12, backgroundColor: '#FF5722', borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default ErrorBoundary;`,
    },
    {
      type: "paragraph",
      text: "Wrap your entire app (or a large subtree) in ==App.tsx==:",
    },
    {
      type: "code",
      language: "tsx",
      text: `import ErrorBoundary from './src/components/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    {/* rest of your app */}
  </ErrorBoundary>
);`,
    },

    {
      type: "heading",
      text: "Step 7 — Set User ID After Login",
    },
    {
      type: "paragraph",
      text: "Associating a ==user ID== with crash reports helps you identify which specific user was affected. This is invaluable for support tickets — when a user reports a crash, you can search for their ID in the Firebase Console and see exactly what happened.",
    },
    {
      type: "code",
      language: "typescript",
      text: `import crashlyticsService from './src/services/crashlytics';

// After successful login
crashlyticsService.setUserId(user.id);

// On logout
crashlyticsService.clearUser();`,
    },

    {
      type: "heading",
      text: "Step 8 — Manual Logging and Error Recording",
    },
    {
      type: "paragraph",
      text: "Use the Crashlytics service anywhere in your app to add ==breadcrumb logs==, ==custom keys==, and ==non-fatal error reports==. These appear in the Firebase Console alongside crash data:",
    },
    {
      type: "code",
      language: "typescript",
      text: `import crashlyticsService from './src/services/crashlytics';

// Breadcrumb log (shows in crash report timeline)
crashlyticsService.log('User opened TaskDetail screen');

// Custom key for debugging context
crashlyticsService.setAttribute('lastScreen', 'TaskDetail');

// Record a non-fatal error
try {
  // risky operation
} catch (e) {
  crashlyticsService.recordError(
    e instanceof Error ? e : new Error(String(e))
  );
}`,
    },

    {
      type: "heading",
      text: "File Locations Summary",
    },
    {
      type: "code",
      language: "text",
      text: `Purpose                      | File path
-----------------------------|------------------------------------------
Root Gradle (classpath)      | android/build.gradle
App Gradle (plugin + deps)   | android/app/build.gradle
iOS pods                     | ios/Podfile (no change needed)
App entry (enable + log)     | App.tsx
Crashlytics service          | src/services/crashlytics/crashlyticsService.ts
Service barrel export        | src/services/crashlytics/index.ts
Error Boundary               | src/components/ErrorBoundary.tsx`,
    },

    {
      type: "heading",
      text: "Step 9 — Verify Crashlytics is Working",
    },
    {
      type: "paragraph",
      text: "To verify the setup, trigger a test crash in your app. Add a temporary button that calls ==crashlytics().crash()==:",
    },
    {
      type: "code",
      language: "typescript",
      text: `import crashlytics from '@react-native-firebase/crashlytics';

// Call this from a button press handler to force a test crash
crashlytics().crash();`,
    },
    {
      type: "paragraph",
      text: "==Important:== Test crashes only work in ==release builds==. If you're using `setCrashlyticsCollectionEnabled(crashlytics, !__DEV__)`, debug builds won't send data. Build a release version, trigger the crash, relaunch the app, and check ==Firebase Console → Crashlytics==. Events can take a few minutes to appear.",
    },
    {
      type: "paragraph",
      text: "For ==Android==, build a release APK or run in release mode. For ==iOS==, build through Xcode with a Release configuration. After the crash, open the app again so the crash report gets uploaded on the next launch.",
    },
    {
      type: "paragraph",
      text: "==Remove the test crash code== (or guard it with `__DEV__`) before publishing to production.",
    },

    {
      type: "heading",
      text: "Best Practices",
    },
    {
      type: "paragraph",
      text: "==Disable in development== — Use `!__DEV__` to avoid polluting your Crashlytics dashboard with debug crashes. Only collect data from release builds.",
    },
    {
      type: "paragraph",
      text: "==Always set user ID== — This makes it trivial to find a specific user's crash history in the Firebase Console when they report issues.",
    },
    {
      type: "paragraph",
      text: "==Use breadcrumb logs liberally== — Add `log()` calls at key navigation points and user actions. When a crash happens, the breadcrumb trail shows you exactly what the user was doing.",
    },
    {
      type: "paragraph",
      text: "==Record non-fatal errors== — Not all errors crash the app. API failures, parsing errors, and edge cases should be recorded with `recordError()` so you can track their frequency and fix them proactively.",
    },
    {
      type: "paragraph",
      text: "==Wrap with Error Boundary== — React errors in the render tree don't trigger native crash handlers. Without an Error Boundary wired to Crashlytics, you'll miss entire categories of bugs.",
    },
  ],
};

export default post;
