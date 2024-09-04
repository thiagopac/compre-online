import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartProvider } from "@/context/CartContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { authenticate } from "@/api/clientApi";
import Loading from "@/components/Loading";

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

  const [isAuthReady, setIsAuthReady] = useState(false);

  const initializeAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        const authResponse = await authenticate();
        if (authResponse) {
          console.log("Token armazenado:", authResponse.token);
        } else {
          console.error("Erro ao autenticar.");
        }
      }
      setIsAuthReady(true);
    } catch (error) {
      console.error("Erro ao inicializar autenticação:", error);
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    initializeAuth();
  }, []);

  if (!loaded || !isAuthReady) {
    return <Loading />;
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
          name="CategoryProducts"
          options={{
            title: "Produtos por categoria",
            headerBackTitle: "Voltar",
          }}
        />
        <Stack.Screen
          name="SearchResults"
          options={{ title: "Resultados da busca", headerBackTitle: "Voltar" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
