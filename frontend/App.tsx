import React from "react";
import { Platform, useWindowDimensions, ActivityIndicator, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { useFonts } from "expo-font";
import { fonts } from "./ui/fonts";
import { colors } from "./ui/colors";

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

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Apply fontFamily globally via a custom theme and defaultTextStyle
  return (
    <NavigationContainer theme={navTheme}>
      {isDesktop ? <DrawerNavigator /> : <TabNavigator />}
    </NavigationContainer>
  );
}