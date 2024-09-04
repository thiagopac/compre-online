import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getAppearanceData } from "@/api/appearanceApi";
import { Appearance } from "@/api/types";
import Loading from "@/components/Loading";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appearance, setAppearance] = useState<Appearance | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const handleLogin = () => {
    router.push("(tabs)");
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appearance.colors.login.backgroundColor },
      ]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: appearance.images.logo.white }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: appearance.colors.login.inputBorderColor },
          ]}
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: appearance.colors.login.buttonBackground },
          ]}
          onPress={handleLogin}
        >
          <Text
            style={[
              styles.loginButtonText,
              { color: appearance.colors.login.textColor },
            ]}
          >
            Enviar código para e-mail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 60,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 16,
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  guestButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  guestButtonText: {
    fontSize: 16,
  },
  createAccount: {
    textAlign: "center",
  },
});
