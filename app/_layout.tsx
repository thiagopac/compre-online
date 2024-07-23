import { CartProvider } from "@/context/CartContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "Login",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CartProvider>
      <RootLayoutNav />
    </CartProvider>
  );
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Menu" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="ProductDetails"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="CategoryProductsScreen"
          options={{ title: "Resultados", headerBackTitle: "Voltar" }}
        />
        <Stack.Screen
          name="SearchResults"
          options={{ title: "Resultados da Busca", headerBackTitle: "Voltar" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
