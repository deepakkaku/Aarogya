export default {
    expo: {
      name: "AarogyaDesk",
      slug: "aarogyadesk",
      version: "1.0.0",
      scheme: "aarogyadesk",
      jsEngine: "hermes",
      scheme: "aarogyadesk", // Used for deep linking
      icon: "./assets/images/icon_logo.png",

      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#006e7e"
      },

      ios: {
        bundleIdentifier: "com.brandhub.aarogyadesk",
        buildNumber: "1.0.0",
        supportsTablet: true,
        useNewArchitecture: true,
        config: {
          usesNonExemptEncryption: false
        },
        infoPlist: {
          NSCameraUsageDescription: "Camera access is used to capture medical images and documents.",
          NSPhotoLibraryUsageDescription: "Photo library access is used to upload health-related files."
        }
      },

      android: {
        package: "com.brandhub.aarogyadesk",
        versionCode: 1,
        useNewArchitecture: true,
        adaptiveIcon: {
          foregroundImage: "./assets/images/icon_logo.png",
          backgroundColor: "#006e7e"
        },
        permissions: [
          "CAMERA",
          "READ_EXTERNAL_STORAGE",
          "WRITE_EXTERNAL_STORAGE"
        ]
      },
    
      web: {
        favicon: "./assets/images/avatar.png"
      },

      extra: {
        SUPABASE_URL: "https://tsllgadcktpzmrgklheo.supabase.co",
        SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbGxnYWRja3Rwem1yZ2tsaGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTc0MDksImV4cCI6MjA2MDI3MzQwOX0.EUTCICqaIhOWj-q6fv7ahTWwrlziPEfnKvCbKwuz2wU"
      }
    }
  };
  