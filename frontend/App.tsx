import React, { useEffect, useState } from "react";
import { Platform, useWindowDimensions, ActivityIndicator, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import DrawerNavigator from "./navigation/DrawerNavigator";
import LoginScreen from "./app/screens/LoginScreen";
import { useFonts } from "expo-font";
import { fonts } from "./ui/fonts";
import { colors } from "./ui/colors";
import { supabase } from "./lib/supabase";

// Custom navigation theme to apply the font and background color globally
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    text: colors.text,
    primary: colors.primary,
    card: colors.white,
    border: colors.muted,
  },
};

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" || width > 768;

  // Load Source Sans Pro fonts
  const [loaded] = useFonts({
    "SourceSans3-Regular": require("./assets/fonts/SourceSans3-Regular.ttf"),
    "SourceSans3-SemiBold": require("./assets/fonts/SourceSans3-SemiBold.ttf"),
    "SourceSans3-Bold": require("./assets/fonts/SourceSans3-Bold.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Step 2: Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!loaded || isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Apply fontFamily globally via a custom theme and defaultTextStyle
  return (
    <NavigationContainer theme={navTheme}>
      {isAuthenticated ? (
        isDesktop ? (
          <DrawerNavigator />
        ) : (
          <TabNavigator />
        )
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}