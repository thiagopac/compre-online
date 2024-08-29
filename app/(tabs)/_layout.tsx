import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, Tabs } from "expo-router";
import { Pressable, Image, Platform } from "react-native";
import { getAppearanceData } from "@/api/appearanceApi";
import { Appearance } from "@/api/types";
import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";
import Images from "@/constants/Images";
import Loading from "@/components/Loading";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

const NavBarTitle = () => (
  <Image
    source={Images.logo.colored}
    style={{ width: 100, height: 40 }}
    resizeMode="contain"
  />
);

const MenuButton = ({ color }: { color: string }) => (
  <Link href="/Menu" asChild>
    <Pressable>
      {({ pressed }) => (
        <FontAwesome
          name="bars"
          size={25}
          color={color}
          style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  </Link>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  if (!appearance) {
    return <Loading />;
  }

  return (
    <>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: appearance.colors.tab.activeTintColor,
          headerShown: true,
          headerTitle: () => <NavBarTitle />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Loja",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="store" color={color} />
            ),
            headerLeft: () => (
              <MenuButton color={appearance.colors.text.primary} />
            ),
          }}
        />
        <Tabs.Screen
          name="rebuy"
          options={{
            title: "Recompra",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="repeat" color={color} />
            ),
            headerLeft: () => (
              <MenuButton color={appearance.colors.text.primary} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Sacola",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="bag-shopping" color={color} />
            ),
            headerLeft: () => (
              <MenuButton color={appearance.colors.text.primary} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
