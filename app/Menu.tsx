import React from "react";
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
import Colors from "@/constants/Colors";

export default function Menu() {
  const navigation = useNavigation();

  const handleNavigation = (path: string) => {
    navigation.navigate(path as never);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", onPress: () => console.log("Cancel Pressed") },
      { text: "Sair", onPress: () => navigation.navigate("Login" as never) },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <MenuItem
          icon="store"
          title="Loja"
          onPress={() => handleNavigation("index")}
        />
        <MenuItem
          icon="repeat"
          title="Recompra"
          onPress={() => handleNavigation("rebuy")}
        />
        <MenuItem
          icon="bag-shopping"
          title="Sacola"
          onPress={() => handleNavigation("cart")}
        />
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sair</Text>
            <FontAwesome
              name="sign-out"
              size={25}
              style={{ color: "white", marginLeft: "auto" }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const MenuItem = ({ icon, title, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <FontAwesome6 name={icon} size={24} style={styles.icon} />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    width: "100%",
  },
  icon: {
    marginRight: 20,
    color: Colors.menu.iconTintColor,
  },
  menuText: {
    fontSize: 18,
    color: "#000",
  },
  logoutContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.menu.logoutButtonColor,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    marginStart: 150,
    color: "white",
    fontSize: 16,
  },
});
