import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, Tabs } from "expo-router";
import { Pressable, Image } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

const NavBarTitle = () => (
  <Image
    source={require("@/assets/images/logo-color.png")}
    style={{ width: 100, height: 40 }}
    resizeMode="contain"
  />
);

const MenuButton = () => (
  <Link href="/modal" asChild>
    <Pressable>
      {({ pressed }) => (
        <FontAwesome
          name="bars"
          size={25}
          // color={Colors[colorScheme ?? "light"].text}
          color={Colors["light"].text}
          style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  </Link>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: Colors["light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitle: () => <NavBarTitle />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Loja",
          tabBarIcon: ({ color }) => <TabBarIcon name="store" color={color} />,
          headerLeft: MenuButton,
        }}
      />
      <Tabs.Screen
        name="rebuy"
        options={{
          title: "Recompra",
          tabBarIcon: ({ color }) => <TabBarIcon name="repeat" color={color} />,
          headerLeft: MenuButton,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Sacola",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bag-shopping" color={color} />
          ),
          headerLeft: MenuButton,
        }}
      />
    </Tabs>
  );
}
