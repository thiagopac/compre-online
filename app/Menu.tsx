import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  View,
  ScrollView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAppearanceData } from "@/api/appearanceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "@/api/types";
import Loading from "@/components/Loading";

export default function Menu() {
  const [appearance, setAppearance] = useState<Appearance | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const handleNavigation = (path: string) => {
    navigation.navigate(path as never);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", onPress: () => console.log("Cancel Pressed") },
      { text: "Sair", onPress: logout },
    ]);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("clientToken");
      console.log("Tokens removidos com sucesso.");
      navigation.navigate("Login" as never);
    } catch (error) {
      console.error("Erro ao remover tokens:", error);
    }
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appearance.colors.menu.backgroundColor },
      ]}
    >
      <ScrollView style={{ width: "100%" }}>
        <MenuItem
          icon="store"
          title="Loja"
          onPress={() => handleNavigation("index")}
          iconTintColor={appearance.colors.menu.iconTintColor}
          textColor={appearance.colors.menu.textColor}
          borderBottomColor={appearance.colors.menu.borderColor}
        />
        <MenuItem
          icon="repeat"
          title="Recompra"
          onPress={() => handleNavigation("rebuy")}
          iconTintColor={appearance.colors.menu.iconTintColor}
          textColor={appearance.colors.menu.textColor}
          borderBottomColor={appearance.colors.menu.borderColor}
        />
        <MenuItem
          icon="bag-shopping"
          title="Sacola"
          onPress={() => handleNavigation("cart")}
          iconTintColor={appearance.colors.menu.iconTintColor}
          textColor={appearance.colors.menu.textColor}
          borderBottomColor={appearance.colors.menu.borderColor}
        />
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: appearance.colors.menu.logoutButtonColor },
            ]}
            onPress={handleLogout}
          >
            <Text
              style={[
                styles.buttonText,
                { color: appearance.colors.menu.buttonTextColor },
              ]}
            >
              Sair
            </Text>
            <FontAwesome
              name="sign-out"
              size={25}
              style={{
                color: appearance.colors.menu.buttonTextColor,
                marginLeft: "auto",
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const MenuItem = ({
  icon,
  title,
  onPress,
  iconTintColor,
  textColor,
  borderBottomColor,
}: any) => (
  <TouchableOpacity
    style={[styles.menuItem, { borderBottomColor }]}
    onPress={onPress}
  >
    <FontAwesome6
      name={icon}
      size={24}
      style={[styles.icon, { color: iconTintColor }]}
    />
    <Text style={[styles.menuText, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    width: "100%",
  },
  icon: {
    marginRight: 20,
  },
  menuText: {
    fontSize: 18,
  },
  logoutContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    marginStart: 150,
    fontSize: 16,
  },
});
